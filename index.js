var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  port = 4000



mongoose.connect("mongodb://coffeereview:reviewcoffee@ds127802.mlab.com:27802/coffee-review");

// Schema
var CoffeeshopSchema = new mongoose.Schema({
  name: String,
  img: String,
  phone: String,
  address: String,
  description: String,
  star: Number,
  price: Number
})

var CoffeeShop = mongoose.model("CoffeeShop", CoffeeshopSchema)



app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs")



// All CoffeeShop
app.get("/coffeeshop", function (req, res) {
  CoffeeShop.find({}, function (err, req) {
    if (err) {
      console.log(err)
    } else {
      res.render("coffeeshop", { coffeeshop: req })
    }
  })
})

// Form
app.post("/coffeeshop", function (req, res) {
  var phone = req.body.phone
  var newPhone = '(' + phone[0] + phone[1] + phone[2] + ') ' + phone[3] + phone[4] + phone[5] + '-' + phone[6] + phone[7] + phone[8]
  CoffeeShop.create({
    name: req.body.name,
    img: req.body.img,
    star: Number(req.body.star),
    price: req.body.price,
    phone: newPhone,
    address: req.body.address,
    description: req.body.description
  }, function (err, req) {
    if (err) {
      console.log(err)
    } else {
      res.redirect("/coffeeshop")
    }
  })
})
app.get("/coffeeshop/new", function (req, res) {
  res.render("coffeeshopform")
})

// Show single coffee shop
app.get("/coffeeshop/:id", function (req, res) {
  CoffeeShop.findById(req.params.id, function(err, req){
    if(err){
      console.log(err)
    }else{
      res.render("singleshop", {coffeeshop: req})
    }
  })
})

app.get("*", function (req, res) {
  res.send("404: Sorry Page not found")
})

app.listen(port, function (req, res) {
  console.log("Application is listening on port", port)
})









// var coffeeshop = [
//   {
//     name: "Slow by Slow",
//     img: "https://static.pexels.com/photos/302899/pexels-photo-302899.jpeg",
//     star: 4,
//     price: 2,
//     phone: "(208)454-2510",
//     address: "405 South 8th St Ste 155 Boise, ID 83702",
//     description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium"
//   },
//   {
//     name: "StarBucks",
//     img: "https://static.pexels.com/photos/29612/pexels-photo-29612.jpg",
//     star: 3,
//     price: 2,
//     phone: "(208)579-5130",
//     address: "500 W Idaho St Boise, ID 83702",
//     description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"
//   },
//   {
//     name: "Dunken Donut",
//     img: "https://static.pexels.com/photos/38106/pexels-photo-38106.jpeg",
//     star: 4,
//     price: 1,
//     phone: "(208)204-8610",
//     address: "1416 W Grove St Boise, ID 83702",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
//   },
//   {
//     name: "Tim Horten",
//     img: "https://static.pexels.com/photos/296888/pexels-photo-296888.jpeg",
//     star: 2,
//     price: 3,
//     phone: "(208)654-6510",
//     address: "405 South 8th St Ste 155 Boise, ID 83702",
//     description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"
//   },
//   {
//     name: "Flying M",
//     img: "https://static.pexels.com/photos/374592/pexels-photo-374592.jpeg",
//     star: 1,
//     price: 2,
//     phone: "(208)854-9870",
//     address: "8205 W Rifleman St Boise, ID 83704",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
//   },
//   {
//     name: "Early Bird",
//     img: "https://static.pexels.com/photos/324028/pexels-photo-324028.jpeg",
//     star: 3,
//     price: 4,
//     phone: "(208)786-5420",
//     address: "201 N Orchard St Boise, ID 83706",
//     description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium"
//   }
// ]