var express = require("express"),
    router = express.Router({mergeParams: true}),
    CoffeeShop = require("../models/coffeeshop"),
    Comments = require("../models/comment")


router.get("/new", isLoggedIn, function (req, res) {
  CoffeeShop.findById(req.params.id, function (err, req) {
    if (err) {
      console.log(err)
    } else {
      res.render("comment/commentform", { coffeeshop: req })
    }
  })
})

router.post("/", isLoggedIn, function (req, res) {
  CoffeeShop.findById(req.params.id, function (err, coffeeshop) {
    if (err) {
      console.log(err)
      redirect("/coffeeshop")
    } else {
      Comments.create(req.body.comment, function (err, comment) {
        if (err) {
          console.log(err)
        } else {
          coffeeshop.comments.push(comment)
          coffeeshop.save()
          res.redirect("/coffeeshop/" + req.params.id)
        }
      })
    }
  })
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login")
}

module.exports = router;