require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');

const app = express();

// ─── Security Middlewares ─────────────────────────────────
app.use(helmet()); // Sets HTTP security headers
app.use(cors({
    origin: process.env.FRONTEND_URL || '*', // Restrict this in production
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '1mb' })); // Limit body size

const DB_FILE = path.join(__dirname, 'db.json');
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

// Rate limiters for auth routes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Limit each IP to 20 requests per windowMs
    message: { error: 'Too many requests from this IP, please try again later.' }
});

// Helper to read DB
const readDB = () => {
    if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify({ users: [], bookings: [] }));
    }
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
};

// Helper to write DB
const writeDB = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// Middleware to check validation errors
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg, details: errors.array() });
    }
    next();
};

// Auth Middleware (Verify JWT)
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid or expired token.' });
        req.user = user; // Set decoded payload (e.g. { id, email })
        next();
    });
};

// ─── Auth: Register ─────────────────────────────────────
app.post('/api/register', authLimiter, [
    body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters').escape(),
    body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], validateRequest, async (req, res) => {
    const { username, email, password } = req.body;
    const db = readDB();

    if (db.users.find(u => u.email === email)) {
        return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = { id: Date.now(), username, email, password: hashedPassword, phone: '' };
    db.users.push(newUser);
    writeDB(db);

    // Generate JWT
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '24h' });

    res.json({ message: 'Registration successful', user: { id: newUser.id, username, email, phone: '' }, token });
});

// ─── Auth: Login ────────────────────────────────────────
app.post('/api/login', authLimiter, [
    body('username').trim().notEmpty().withMessage('Username/Email is required').escape(),
    body('password').notEmpty().withMessage('Password is required')
], validateRequest, async (req, res) => {
    const { username, password } = req.body;
    const db = readDB();

    const user = db.users.find(u => u.username === username || u.email === username);
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });

    res.json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email, phone: user.phone || '' }, token });
});

// ─── Profile: Update User ───────────────────────────────
app.put('/api/users/:id', authenticateToken, [
    body('username').optional().trim().isLength({ min: 3 }).escape(),
    body('email').optional().trim().isEmail().normalizeEmail(),
    body('phone').optional().trim().escape(),
    body('currentPassword').optional().isString(),
    body('newPassword').optional().isLength({ min: 6 })
], validateRequest, async (req, res) => {
    const userId = parseInt(req.params.id);
    
    // IDOR Check: Ensure the user is updating their own profile
    if (req.user.id !== userId) {
        return res.status(403).json({ error: 'Forbidden. Cannot modify another user\'s profile.' });
    }

    const { username, email, phone, currentPassword, newPassword } = req.body;
    const db = readDB();

    const userIdx = db.users.findIndex(u => u.id === userId);
    if (userIdx === -1) return res.status(404).json({ error: 'User not found' });

    const user = db.users[userIdx];

    // If changing password, verify current one
    if (newPassword) {
        if (!currentPassword) return res.status(400).json({ error: 'Current password is required to set a new password.' });
        
        const validPassword = await bcrypt.compare(currentPassword, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (phone !== undefined) user.phone = phone;

    db.users[userIdx] = user;
    writeDB(db);

    res.json({ message: 'Profile updated', user: { id: user.id, username: user.username, email: user.email, phone: user.phone } });
});

// ─── Bookings: Create Booking ───────────────────────────
app.post('/api/bookings', authenticateToken, [
    body('userId').isInt(),
    body('roomName').trim().escape(),
    body('checkIn').trim().escape(),
    body('checkOut').trim().escape(),
    body('guestName').trim().escape(),
    body('guestPhone').trim().escape(),
    body('guestEmail').trim().isEmail().normalizeEmail(),
    body('specialRequests').optional().trim().escape()
], validateRequest, (req, res) => {
    const { userId, roomName, hotelId, checkIn, checkOut, nights, 
            roomCost, gstAmount, serviceFee, totalCost, paymentMethod,
            guestName, guestPhone, guestEmail, specialRequests } = req.body;
            
    // IDOR Check
    if (req.user.id !== parseInt(userId)) {
         return res.status(403).json({ error: 'Forbidden. Cannot book for another user.' });
    }

    const db = readDB();
    const newBooking = {
        id: Date.now().toString(),
        userId: parseInt(userId),
        roomName,
        hotelId,
        checkIn,
        checkOut: checkOut || '',
        nights,
        roomCost: roomCost || totalCost,
        gstAmount: gstAmount || 0,
        serviceFee: serviceFee || 0,
        totalCost,
        paymentMethod,
        guestName: guestName || '',
        guestPhone: guestPhone || '',
        guestEmail: guestEmail || '',
        specialRequests: specialRequests || '',
        bookingDate: new Date().toISOString(),
        status: 'Confirmed'
    };

    db.bookings.push(newBooking);
    writeDB(db);

    res.json({ message: 'Booking confirmed', booking: newBooking });
});

// ─── Bookings: Get User Bookings ────────────────────────
app.get('/api/bookings/:userId', authenticateToken, (req, res) => {
    const userId = parseInt(req.params.userId);
    
    // IDOR Check
    if (req.user.id !== userId) {
        return res.status(403).json({ error: 'Forbidden. Cannot view another user\'s bookings.' });
    }

    const db = readDB();
    const userBookings = db.bookings.filter(b => b.userId === userId);
    
    // Sort newest first
    userBookings.sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate));
    
    res.json({ bookings: userBookings });
});

// ─── Bookings: Cancel Booking ───────────────────────────
app.put('/api/bookings/:id/cancel', authenticateToken, (req, res) => {
    const bookingId = req.params.id;
    const db = readDB();

    const bookingIdx = db.bookings.findIndex(b => b.id === bookingId);
    if (bookingIdx === -1) return res.status(404).json({ error: 'Booking not found' });

    // IDOR Check
    if (db.bookings[bookingIdx].userId !== req.user.id) {
         return res.status(403).json({ error: 'Forbidden. Cannot cancel another user\'s booking.' });
    }

    db.bookings[bookingIdx].status = 'Cancelled';
    writeDB(db);

    res.json({ message: 'Booking cancelled', booking: db.bookings[bookingIdx] });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
