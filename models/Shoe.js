const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ShoeModel = new Schema({
  name: String,
  urlName: String,
  id: String,
  shortDescription: String,
  shoePurchaseLink: String,
  brand: String,
  image: String,
});

const Shoe = mongoose.model('Shoe', ShoeModel);

const create = async (name, shortDescription, shoePurchaseLink, brand, image) => {
  const errors = [];

  const newShoe = new Shoe();

  const id = uuidv4();

  newShoe.name = name;
  newShoe.urlName = name.replace(/\s+/g, '-').toLowerCase();
  newShoe.id = id;
  newShoe.shortDescription = shortDescription;
  newShoe.shoePurchaseLink = shoePurchaseLink;
  newShoe.brand = brand;
  newShoe.image = image;

  try {
    const saveShoe = await newShoe.save()
    return saveShoe;
  } catch (e) {
    return {
      error: e.errmsg
    }
  }
}

const find = async (urlName) => {
  const findShoe = await Shoe.findOne({ urlName });
  return findShoe
}

const load = async (amount) => {
  const findShoes = await Shoe.find().sort({ name: 1 }).limit(amount)
  return findShoes
}

const Sneaker = {
  create,
  find,
  load
}

module.exports = Sneaker;
