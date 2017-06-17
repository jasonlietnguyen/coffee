var express = require("express"),
  router = express.Router(),
  CoffeeShop = require("../models/coffeeshop"),
  Comments = require("../models/comment")


router.get("/", function (req, res) {
  CoffeeShop.find({}, function (err, coffeeshop) {
    if (err) {
      console.log(err)
    } else {
      res.render("coffeeshop/coffeeshop", { coffeeshop: coffeeshop })
    }
  })
})

// Form
router.post("/", isLoggedIn, function (req, res) {
  var phone = req.body.phone
  var newPhone = '(' + phone[0] + phone[1] + phone[2] + ') ' + phone[3] + phone[4] + phone[5] + '-' + phone[6] + phone[7] + phone[8] + phone[9]
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  CoffeeShop.create({
    name: req.body.name,
    img: req.body.img,
    star: Number(req.body.star),
    price: req.body.price,
    phone: newPhone,
    author: author,
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

router.get("/new", isLoggedIn, function (req, res) {
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

router.get("/:id/edit", function (req, res) {
  CoffeeShop.findById(req.params.id, function (err, coffeeshop) {
    if (err) {
      console.log(err)
      res.redirect("/coffeeshop")
    } else {
      res.render("coffeeshop/edit", { coffeeshop: coffeeshop});
    }
  })
})

router.put("/:id", function(req, res){
  CoffeeShop.findByIdAndUpdate(req.params.id, req.body.coffeeshop, function(err, update){
    if(err){
      res.redirect("/coffeeshop")
    }else{
      res.redirect("/coffeeshop/" + req.params.id)
    }
  })
})



router.delete("/:id", isLoggedIn, function(req, res){
  CoffeeShop.findByIdAndRemove(req.params.id, function(err){
    res.redirect("/coffeeshop")
  })
})


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login")
}

module.exports = router;