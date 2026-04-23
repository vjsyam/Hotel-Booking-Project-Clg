

async function test() {
    try {
        console.log("Registering user...");
        let res = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: 'testuser123', email: 'test1234@test.com', password: 'password123'})
        });
        let data = await res.json();
        console.log("Register Response:", res.status, data);

        if (res.status === 429) {
            console.log("Rate limited, let's login instead if user exists...");
        }

        console.log("Logging in...");
        res = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: 'testuser123', password: 'password123'})
        });
        data = await res.json();
        console.log("Login Response:", res.status, data);

        const token = data.token;
        const userId = data.user.id;

        console.log(`Fetching bookings for user ${userId}...`);
        res = await fetch(`http://localhost:5000/api/bookings/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        data = await res.json();
        console.log("Bookings Response:", res.status, data);
    } catch (err) {
        console.error(err);
    }
}
test();
