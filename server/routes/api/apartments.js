const express = require('express')
const mongodb = require('mongodb')

const router = express.Router();

router.get('/', async (req, res) => {
    const apartments = await loadApartmentsCollection();
    res.send(await apartments.find({}).toArray());
  });

  router.post('/', async(req, res) => {
    const apartments = await loadApartmentsCollection();
    await apartments.insertOne({
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

async function loadApartmentsCollection(){
    const client = await mongodb.MongoClient.connect("mongodb+srv://visal:1234@visalclouddb.k7ikj.gcp.mongodb.net/homon?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})
    return client.db('homon').collection("apartments")
}

module.exports = router