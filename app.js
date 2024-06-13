const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Reservation = require('./models/Reservation');

mongoose.connect('mongodb://localhost:27017/yourDatabase', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', () => {
    console.log("connection succeeded");
});

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// User registration route
app.post('/register', async (req, res) => {
    try {
        const { email, username, password, confirmpassword } = req.body;

        if (password !== confirmpassword) {
            return res.status(400).send('Passwords do not match');
        }

        const user = new User({ email, username, password });
        await user.save();
        console.log("User created successfully");
        res.status(201).send('User created successfully');
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(400).send('Error creating user');
    }
});

// User login route
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('User not found');
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).send('Invalid password');
        }
        res.status(200).send('Login successful');
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send('Internal Server Error');
    }
});

// Handle form submission for reservation
app.post('/reserve', async (req, res) => {
    try {
        var reservationData = new Reservation({
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.lastName,
            contactNumber: req.body.contactNumber,
            email: req.body.email,
            departureCity: req.body.departureCity,
            departureDate: req.body.departureDate,
            departureShift: req.body.departureShift,
            seatType: req.body.seatType,
            arrivalCity: req.body.arrivalCity,
            idType: req.body.idType,
            idNumber: req.body.idNumber,
            countryIssuance: req.body.countryIssuance
        });

        await reservationData.save();
        console.log("Reservation inserted successfully");
        return res.redirect('payment.html');
    } catch (err) {
        console.error("Error inserting reservation:", err);
        res.status(500).send("Internal Server Error");
    }
});

// New route to fetch all reservations (for admin or debugging purposes)
app.get('/reservations', async (req, res) => {
    try {
        const reservations = await Reservation.find({});
        res.json(reservations);
    } catch (err) {
        console.error("Error fetching reservations:", err);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/', (req, res) => {
    res.set({ 'Access-Control-Allow-Origin': '*' });
    return res.redirect('index.html');
});

app.listen(3000, () => {
    console.log("server listening at port 3000");
});
