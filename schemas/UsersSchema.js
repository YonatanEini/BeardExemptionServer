const authoriseLevel = {
    solider : 0,
    gafCommander : 1,
    rasar : 2,
    unitCommander : 3
};


const mongoose = require('mongoose')

const usersSchame = new mongoose.Schema({
    personalId : {type: String, required: true},
    password : {type: String, required: true},
    gafName : {type: String, required: true},
    authorise : {type: Number, required: true}
});

module.exports = {usersSchame};