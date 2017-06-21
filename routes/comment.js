var express = require("express"),
  router = express.Router({ mergeParams: true }),
  CoffeeShop = require("../models/coffeeshop"),
  Comments = require("../models/comment"),
  MiddleWare = require("../middleware")


router.get("/new", MiddleWare.isLoggedIn, function (req, res) {
  CoffeeShop.findById(req.params.id, function (err, req) {
    if (err) {
      console.log(err)
    } else {
      res.render("comment/commentform", { coffeeshop: req })
    }
  })
})

router.post("/", MiddleWare.isLoggedIn, function (req, res) {
  CoffeeShop.findById(req.params.id, function (err, coffeeshop) {
    if (err) {
      console.log(err)
      redirect("/coffeeshop")
    } else {
      Comments.create(req.body.comment, function (err, comment) {
        if (err) {
          console.log(err)
        } else {
          comment.author.id = req.user._id
          comment.author.username = req.user.username
          comment.save();
          coffeeshop.comments.push(comment)
          coffeeshop.save()
          res.redirect("/coffeeshop/" + req.params.id)
        }
      })
    }
  })
})

router.get("/:comment_id/edit", MiddleWare.isLoggedIn, MiddleWare.checkCommentOwnership, function (req, res) {
  Comments.findById(req.params.comment_id, function (err, comment) {
    if (err) {
      res.redirect("back")
    } else {
      res.render("comment/edit", { coffeeshop_id: req.params.id, comment: comment })
    }
  })
})


router.put("/:comment_id", MiddleWare.isLoggedIn, MiddleWare.checkCommentOwnership, function(req, res){
  Comments.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
    if(err){
      res.redirect("back")
    }else{
      res.redirect("/coffeeshop/" + req.params.id)
    }
  })
})

router.delete("/:comment_id", MiddleWare.isLoggedIn, MiddleWare.checkCommentOwnership, function(req, res){
  Comments.findByIdAndRemove(req.params.comment_id, function(err, comment){
    if(err){
      res.redirect("back")
    }else{
      res.redirect("/coffeeshop/" + req.params.id)
    }
  })
})





module.exports = router;