const express = require('express')
const mongodb = require('mongodb')

const router = express.Router();

router.get('/', async (req, res) => {
    const rooms = await loadRoomsCollection();
    res.send(await rooms.find({}).toArray());
  });

router.post('/', async(req, res) => {
    const rooms = await loadRoomsCollection();
    await rooms.insertOne({
        code: req.body.code,
        price: req.body.price,
        location: req.body.location,
        address: req.body.address,
        detail: req.body.detail,
        contact: req.body.contact,
        dateCreated: new Date()
    })
    res.status(201).send()
})

async function loadRoomsCollection(){
    const client = await mongodb.MongoClient.connect("mongodb+srv://visal:1234@visalclouddb.k7ikj.gcp.mongodb.net/homon?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})
    return client.db('homon').collection("rooms")
}

module.exports = router