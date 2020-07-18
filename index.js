// Initiating Express
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const Sneaker = require('./models/Shoe')

async function server(config) {
  const app = express();
  const port = 3000;

  await mongoose.connect('mongodb://localhost/restocked', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  mongoose.set('useFindAndModify', false);

  // Parsers
  app.use(bodyParser.json({ limit: '1mb' }));
  app.use(bodyParser.urlencoded({ extended: false, limit: '1mb' }));
  app.use(cors({credentials: true, origin: '*'}));

  app.get('/sneaker/discovery', async function(req, res) {
    const findSneakers = await Sneaker.load(12)
    res.json({
      sneakers: findSneakers,
      error: false,
    })
  })

  app.get('/sneaker/:id', async function (req, res) {
    const urlName = req.params.id;
    const findSneaker = await Sneaker.find(urlName);
    res.json({
      sneaker: findSneaker,
      error: false
    })
  })

  app.post('/sneaker/add', async function (req, res) {
    const shoe = req.body;
    const createSneaker = await Sneaker.create(shoe.sneakerName, shoe.shortDescription, shoe.purchaseLink, shoe.brand, shoe.imageLink)
    console.log(createSneaker)
    res.json({
      error: false
    })
  })

  app.listen(port, () => console.log(`Running Restocked backend on port ${port}`))
}

const restocked = server();
module.exports = restocked;
