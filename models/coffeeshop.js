var mongoose = require("mongoose")


var coffeeshopSchema = new mongoose.Schema({
  name: String,
  img: String,
  phone: String,
  address: String,
  description: String,
  star: Number,
  price: Number,
  author: {
    id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  comments:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments"
    }
  ]
})

module.exports = mongoose.model("CoffeeShop", coffeeshopSchema)