const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DB_FILE = path.join(__dirname, 'db.json');

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

// ─── Auth: Register ─────────────────────────────────────
app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;
    const db = readDB();

    if (db.users.find(u => u.email === email)) {
        return res.status(400).json({ error: 'Email already registered' });
    }

    const newUser = { id: Date.now(), username, email, password, phone: '' };
    db.users.push(newUser);
    writeDB(db);

    res.json({ message: 'Registration successful', user: { id: newUser.id, username, email, phone: '' } });
});

// ─── Auth: Login ────────────────────────────────────────
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const db = readDB();

    const user = db.users.find(u => (u.username === username || u.email === username) && u.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email, phone: user.phone || '' } });
});

// ─── Profile: Update User ───────────────────────────────
app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { username, email, phone, currentPassword, newPassword } = req.body;
    const db = readDB();

    const userIdx = db.users.findIndex(u => u.id === userId);
    if (userIdx === -1) return res.status(404).json({ error: 'User not found' });

    const user = db.users[userIdx];

    // If changing password, verify current one
    if (newPassword) {
        if (user.password !== currentPassword) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }
        user.password = newPassword;
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (phone !== undefined) user.phone = phone;

    db.users[userIdx] = user;
    writeDB(db);

    res.json({ message: 'Profile updated', user: { id: user.id, username: user.username, email: user.email, phone: user.phone } });
});

// ─── Bookings: Create Booking ───────────────────────────
app.post('/api/bookings', (req, res) => {
    const { userId, roomName, hotelId, checkIn, checkOut, nights, 
            roomCost, gstAmount, serviceFee, totalCost, paymentMethod,
            guestName, guestPhone, guestEmail, specialRequests } = req.body;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const db = readDB();
    const newBooking = {
        id: Date.now().toString(),
        userId,
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
app.get('/api/bookings/:userId', (req, res) => {
    const { userId } = req.params;
    const db = readDB();
    const userBookings = db.bookings.filter(b => b.userId == userId);
    
    // Sort newest first
    userBookings.sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate));
    
    res.json({ bookings: userBookings });
});

// ─── Bookings: Cancel Booking ───────────────────────────
app.put('/api/bookings/:id/cancel', (req, res) => {
    const bookingId = req.params.id;
    const db = readDB();

    const bookingIdx = db.bookings.findIndex(b => b.id === bookingId);
    if (bookingIdx === -1) return res.status(404).json({ error: 'Booking not found' });

    db.bookings[bookingIdx].status = 'Cancelled';
    writeDB(db);

    res.json({ message: 'Booking cancelled', booking: db.bookings[bookingIdx] });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
