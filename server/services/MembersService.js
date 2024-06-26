const memberModel = require('../models/memberModel');

class MembersService {
    async getAll() {
        let result = await memberModel.find({});
        if (result.length == 0)
            throw new Error('There is no members');
        return result;
    }
    async get(id) {
        let foundMember = await memberModel.find({ idNumber: id });
        if (foundMember.length == 0) {
            throw new Error('Invalid member id!');
        }
        return foundMember;
    }
    async insert(newMember) {
        let memberAlreadyExists = await memberModel.find({ idNumber: newMember.numberId });
        if (memberAlreadyExists.length > 0)
            throw new Error('Invalid new member id!');
        else {
            await memberModel.create(newMember);
            return newMember;
        }
    }

    async delete(memberToIdDelete) {
        let memberById = await memberModel.findOne({ idNumber: memberToIdDelete })
        if (!memberById)
            throw new Error(`Invalid member Id ${memberToIdDelete}!`);
        else {
            await memberModel.deleteOne({ idNumber: memberToIdDelete });
        }
    }

    async update(memberToUpdate) {
        let memberById = await memberModel.findOne({ idNumber: memberToUpdate.idNumber })
        if (!memberById)
            throw new Error(`Invalid member Id ${memberToUpdate.idNumber}!`);
        else {
            await memberModel.updateOne(
                { idNumber: memberToUpdate.idNumber },
                { $set: memberToUpdate }
            )
        }

    }
}
let membersService = new MembersService();
module.exports = membersService;