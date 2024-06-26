const mongoose = require('mongoose');

const vaccineManufacturerSchema = mongoose.Schema({
    name: String
},{collection: 'vaccineManufacturers'})

const model = mongoose.model('vaccineManufacturers', vaccineManufacturerSchema);
module.exports= model;
