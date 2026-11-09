const User = require("../models/user.js");
const passport = require("passport");

module.exports.signUp= async(req,res)=>{
    try{
        let {username,email,password} = req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                next(err);
            }
            req.flash("success","welcome to Wanderlust!");
            res.redirect("/listing");
        })
        
    } catch (err){
        req.flash("error",err.message);
        res.redirect("/listing");
    }
}

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login = async (req,res)=>{
        req.flash("success","welcome to Wanderlust! You are logged in!");
        let redirectUrl = res.locals.redirectUrl || "/listing";
        res.redirect(redirectUrl);
}

module.exports.logOut = (req,res,next)=>{
    req.logout((err) => {
        if (err) {
            return next(err);
        }
    req.flash("success","you are logged out!");
     res.redirect("/listing");
    })
};