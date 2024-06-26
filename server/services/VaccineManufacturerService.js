const vaccineManufacturersModel = require('../models/vaccineManufacturersModel');

class MembersService {
    async getAll() {
        let result = await vaccineManufacturersModel.find({});
        if (result.length == 0)
            throw new Error('There is no vaccines');
        return result;
    }
    async get(name) {
        let vaccine = await vaccineManufacturersModel.find({ name: name });
        if (vaccine.length == 0) {
            throw new Error('Invalid vaccine name!');
        }
        return vaccine;
    }
    async insert(newVaccine) {
        let vaccine = await vaccineManufacturersModel.find({ name: newVaccine.name });
        if (vaccine.length > 0)
            throw new Error('Invalid new vaccine name!');
        else {
            await vaccineManufacturersModel.create(newVaccine);
            return newVaccine;
        }
    }

    async delete(vaccineNameToDelete) {
        let vaccine = await vaccineManufacturersModel.findOne({ name: vaccineNameToDelete })
        if (!vaccine)
            throw new Error(`Invalid vaccine name ${vaccineNameToDelete}!`);
        else {
            await vaccineManufacturersModel.deleteOne({ name: vaccineNameToDelete });
        }
    }
}
let membersService = new MembersService();
module.exports = membersService;