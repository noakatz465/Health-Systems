const Controller = require("./Controller");
const membersService = require('../services/MembersService');

class MembersController extends Controller{
    constructor(){
        super(membersService)
    }
}

let membersController = new MembersController();
module.exports = membersController;