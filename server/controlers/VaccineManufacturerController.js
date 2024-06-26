const Controller = require("./Controller");
const vaccineManufacturersService = require('../services/VaccineManufacturerService');

class VaccineManufacturersController extends Controller{
    constructor(){
        super(vaccineManufacturersService)
    }
}

let vaccineManufacturersController = new VaccineManufacturersController();
module.exports = vaccineManufacturersController;