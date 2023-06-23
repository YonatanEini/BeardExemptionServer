const requestType = {
    personalRequest : 0,
    religiousRequest : 1,
    medicalRequest : 2
};
const requestStatus = {
    rejected : 0,
    pending : 1,
    approved : 2
};

const mongoose = require('mongoose')

const beardRequestSchema = new mongoose.Schema({
    personalId : {type: String, required: true},
    beardRequestType : {type: Number, required: true},
    requestDescription : {type: String, required: true},
    requestStatus : {type: Number, required: true},
    gafName : {type: String, required: true},
    gafCommanderSignature : {type: String, required: true},
    rasarSignature : {type: String, required: true},
    unitCommanderSignature : {type: String, required: true},
});

module.exports = {beardRequestSchema};