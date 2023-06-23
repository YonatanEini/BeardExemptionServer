const usersMongoModule = require('./schemas/UsersSchema')
const beardMongoModule = require('./schemas/BeardRequestSchema')

const mongoose = require('mongoose')
const mongoDB = 'mongodb://localhost:27017/GetPtor';

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb Connection Error:'));

const usersDB = db.collection('Users');
const beardDB = db.collection('BeardRequests');
const ip = "127.0.0.1"
const port = 10000

const usersSchema = mongoose.model('Users', usersMongoModule.usersSchame);
const beardSchema = mongoose.model('BeardRequests', beardMongoModule.beardRequestSchema);

module.exports = { db, usersDB, usersSchema, beardDB, beardSchema };


