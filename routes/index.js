var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user")


router.get("/", function(req, res){
  res.redirect("/coffeeshop")
})

router.get("/register", function (req, res) {
  res.render("register")
})

router.post("/register", function (req, res) {
  var newUser = new User({ username: req.body.username })
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err)
      return res.render("register")
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/coffeeshop")
      })
    }
  })
})


router.get("/login", function (req, res) {
  res.render("login")
})

router.post("/login", passport.authenticate("local",
  {
    successRedirect: "/coffeeshop",
    failureRedirect: "/login"
  }), function (req, res) {
})

router.get("/logout", function(req, res){
  req.logOut();
  res.redirect("/coffeeshop")
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login")
}

// router.get("*", function (req, res) {
//   res.send("404: Sorry Page not found")
// })

module.exports = router;