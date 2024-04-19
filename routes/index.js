const express = require('express');
const router = express.Router();
const passport = require("passport");
const localStrategy = require("passport-local");
const userModel = require("./users")

passport.use(new localStrategy(userModel.authenticate()));

router.post("/register", function(req, res){
  var userData = new userModel({
    username: req.body.username,
    secret: req.body.secret
  });

  userModel.register(userData, req.body.password)
  .then(function(registeredUser){
    passport.authenticate("local")(req, res, function(){
      res.redirect("/profile")
    })
  })
})

router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/"
}), function(req, res){}) 

router.get('/logout', function(req, res, next){
  req.logout(function(err){
    if(err){return next(err)};
    res.redirect("/");
  })
})

router.get("/login", (req, res)=>{
  res.render("login")
});

router.get("/profile", isLoggedIn , async (req, res)=>{
  const {username} = req.body;
  var user = await userModel.findOne({"username": username});
  console.log(username);
  res.render("profile", { "username": user});
})

router.get("/", (req, res)=>{
  res.render("index")
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/");
}

module.exports = router;