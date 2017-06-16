var mongoose = require("mongoose")

var CoffeeshopSchema = new mongoose.Schema({
  name: String,
  img: String,
  phone: String,
  address: String,
  description: String,
  star: Number,
  price: Number
})

module.exports = mongoose.model("CoffeeShop", CoffeeshopSchema)