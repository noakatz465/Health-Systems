require('dotenv').config();

const mongoose = require('mongoose');

async function mongooseConnect() {
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log('connected to mongodb!!')
}

module.exports = mongooseConnect;