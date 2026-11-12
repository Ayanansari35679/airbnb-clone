if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}



const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const flash = require("connect-flash");

const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js")

const listingRoute = require("./routes/listing.js");
const reviewRoute = require("./routes/review.js");
const userRoute = require("./routes/user.js");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const dbUrl = process.env.ATLAS_URL;

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET
        },
    touchAfter: 24 * 3600
});
store.on("error", (err) => {
    console.log("Error in MONGO SESSION STORE", err);
});
const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expries: Date.now() + 1000 * 60 * 60 * 24 * 3,
        maxAge: 1000 * 60 * 60 * 24 * 3,
        httpOnly: true,
    },
};

async function main() {
    await mongoose.connect(dbUrl);
}
main().then(() => {
    console.log("connected to Db")
})
    .catch((err) => {
        console.log(err);
    })



app.use(session(sessionOptions));
app.use(flash())

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success")
    res.locals.Error = req.flash("error")
    res.locals.currUser = req.user;
    next();
})



app.get("/", (req, res) => {
    res.redirect("/listing");
});
   






app.use("/listing", listingRoute);
app.use("/listing/:id/reviews", reviewRoute);
app.use("/", userRoute);




app.all(/.*/, (req, res, next) => {
    next(new ExpressError(404, "page not found"));
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    let { statusCode = 500, message = "Something went wrong" } = err;

    res.status(statusCode).render("error.ejs", { err, message });
});


app.listen(8080, () => {
    console.log("server is listening");
})