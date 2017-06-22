var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOveride = require("method-override"),
    port = '4000',
    CoffeeShop = require("./models/coffeeshop"),
    Comments = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds")

var commentRoutes =  require("./routes/comment"),
    coffeeShopRoutes = require("./routes/coffeeshop"),
    indexRoutes = require("./routes/index")

// seedDB()

// Passport Configeration
app.use(require("express-session")({
  secret: "ths is my secret",
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())



mongoose.connect("mongodb://coffeereview:reviewcoffee@ds127802.mlab.com:27802/coffee-review");
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.use(methodOveride("_method"))
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
})

app.use(indexRoutes);
app.use("/coffeeshop", coffeeShopRoutes);
app.use("/coffeeshop/:id/comments", commentRoutes);


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