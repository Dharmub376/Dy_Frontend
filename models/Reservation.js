const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    firstName: String,
    middleName: String,
    lastName: String,
    contactNumber: String,
    email: String,
    departureCity: String,
    departureDate: Date,
    departureShift: String,
    seatType: String,
    arrivalCity: String,
    idType: String,
    idNumber: String,
    countryIssuance: String
});

module.exports = mongoose.model('Reservation', reservationSchema);
