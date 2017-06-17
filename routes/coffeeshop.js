var express = require("express"),
    router = express.Router(),
    CoffeeShop = require("../models/coffeeshop"),
    Comments = require("../models/comment")


router.get("/", function (req, res) {
  CoffeeShop.find({}, function (err, coffeeshop) {
    if (err) {
      console.log(err)
    } else {
      res.render("coffeeshop/coffeeshop", { coffeeshop: coffeeshop})
    }
  })
})

// Form
router.post("/", function (req, res) {
  var phone = req.body.phone
  var newPhone = '(' + phone[0] + phone[1] + phone[2] + ') ' + phone[3] + phone[4] + phone[5] + '-' + phone[6] + phone[7] + phone[8] + phone[9]
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

router.get("/new", function (req, res) {
  res.render("coffeeshop/coffeeshopform")
})

// Show single coffee shop
router.get("/:id", function (req, res) {
  CoffeeShop.findById(req.params.id).populate("comments").exec(function (err, req) {
    if (err) {
      console.log(err)
    } else {
      console.log(req)
      res.render("coffeeshop/singleshop", { coffeeshop: req })
    }
  })
})

module.exports = router;