var middlewareObj = {},
    CoffeeShop = require("../models/coffeeshop"),
    Comments = require("../models/comment")

middlewareObj.checkCoffeeshopOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    CoffeeShop.findById(req.params.id, function (err, coffeeshop) {
      if (err) {
        res.redirect("back")
      } else {
        if (coffeeshop.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back")
        }
      }
    })
  } else {
    res.redirect("back");
  }
}

middlewareObj.checkCommentOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Comments.findById(req.params.comment_id, function (err, comment) {
      if (err) {
        res.redirect("back")
      } else {
        if (comment.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back")
        }
      }
    })
  } else {
    res.redirect("back");
  }
}

middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login")
}


module.exports = middlewareObj;