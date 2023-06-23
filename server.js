const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;
const db = require('./dbConnection.js');
const { response } = require('express');

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Home Page!')
})

app.get('/getActiveRequest/:personalId', async (req, res) => {
    let findBeardRequest = await db.beardDB.findOne({personalId : req.params.personalId})
    if (findBeardRequest == undefined){
        response.statusCode = 400
    }
    else{
        response.statusCode = 200
    }
    res.send(findBeardRequest)
})

app.get('/getGafCommanderPendingRequests/:gafName',async (req, res) =>{
    let activeBeardRequests = await db.beardDB.find({gafCommanderSignature : " ",
                                                    gafName : req.params.gafName}
                                                     ).toArray()
    res.send(activeBeardRequests)
})

app.get('/getRasarPendingRequests',async (req, res) =>{
    let activeBeardRequests = await db.beardDB.find({rasarSignature : " ",
                                                      gafCommanderSignature: {$ne: " "},
                                                      requestStatus : 1 }).toArray()
    res.send(activeBeardRequests)
})

app.get('/getUnitCommanderPendingRequests',async (req, res) =>{
    let activeBeardRequests = await db.beardDB.find({rasarSignature : " ",
                                                    gafCommanderSignature: {$ne: " "},
                                                    rasarSignature: {$ne: " "},
                                                    requestStatus : 1 }).toArray()
    res.send(activeBeardRequests)
})

app.post('/addUser', (req, res) => {
   let userToAdd = new db.usersSchema(req.body);
   db.usersDB.insertOne(userToAdd);
   res.send('User Added Susscessfuly!');

})

app.post('/addBeardRequest', (req, res) =>{
    let beardRequest = new db.beardSchema(req.body)
    db.beardDB.insertOne(beardRequest)
    res.send('request added Susscessfuly')
})

app.put('/gafCommanderRequestUpdate', (req, res) => {
    let docuemntToUpdate = req.body.decisdedDocumet
    docuemntToUpdate.forEach(async (element) => {
        const filter = { personalId: element.personalId};
        const updateDocument = {
            $set: {
                gafCommanderSignature: req.body.signature,
                requestStatus : element.requestStatus
            },
          };
        await db.beardDB.updateOne(filter, updateDocument);
    });
    res.send('request updated Susscessfuly')
})


app.put('/rasarRequestUpdate', (req, res) => {
    let docuemntToUpdate = req.body.decisdedDocumet
    docuemntToUpdate.forEach(async (element) => {
        const filter = { personalId: element.personalId};
        const updateDocument = {
            $set: {
                rasarSignature: req.body.signature,
                requestStatus : element.requestStatus
            },
          };
        await db.beardDB.updateOne(filter, updateDocument);
    });

    res.send('request updated Susscessfuly')
})


app.put('/unitCommanserRequestUpdate', (req, res) => {
    let docuemntToUpdate = req.body.decisdedDocumet
    docuemntToUpdate.forEach(async (element) => {
        let finalDecision;
        element.requestStatus == 1 ? finalDecision = 2 : finalDecision = 0
        const filter = { personalId: element.personalId};
        const updateDocument = {
            $set: {
                unitCommanderSignature: req.body.signature,
                requestStatus : finalDecision
            },
          };
        await db.beardDB.updateOne(filter, updateDocument);
    });

    res.send('request updated Susscessfuly')
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})
