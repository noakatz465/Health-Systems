const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    idNumber: String,
    address: {
        city: String,
        street: String,
        number: String
    },
    dateOfBirth: Date,
    phone: String,
    mobile: String,
    vaccinations: [{
        manufacturer: String,
        dateReceived: Date
    }],
    positiveTestDate: Date,
    recoveryDate: Date,
    image: String
})

const model = mongoose.model('members', memberSchema);
module.exports= model;