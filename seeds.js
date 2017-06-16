var mongoose = require("mongoose"),
  CoffeeShop = require("./models/coffeeshop"),
  Comments = require("./models/comment")

var data = [
  {
    name: "StarBucks",
    img: "https://static.pexels.com/photos/29612/pexels-photo-29612.jpg",
    star: 3,
    price: 2,
    phone: "(208)579-5130",
    address: "500 W Idaho St Boise, ID 83702",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"
  },
  {
    name: "Fast To Go",
    img: "https://static.pexels.com/photos/29612/pexels-photo-29612.jpg",
    star: 3,
    price: 2,
    phone: "(208)579-5130",
    address: "500 W Idaho St Boise, ID 83702",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"
  }
]

function seedDB() {
  // CoffeeShop.remove({}, function (err) {
  //   if (err) {
  //     console.log(err)
  //   }
    console.log("remove CoffeShop")
  data.forEach(function (seed) {
    CoffeeShop.create(seed, function (err, data) {
      if (err) {
        console.log(err)
      } else {
        console.log("Add new Coffeeshop");
        Comments.create({
          text: "This place is great",
          author: "Jay Jay"
        }, function (err, comment) {
          if (err) {
            console.log(err)
          } else {
            data.comments.push(comment)
            data.save();
            console.log(comment)
          }
        })
      }
    })
  })
  // })
}

module.exports = seedDB;