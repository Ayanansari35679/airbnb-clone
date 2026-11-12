const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError");
const { listingSchema, reviewSchema } = require("./schema");
const Review = require("./models/review");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {

        // Save the previous page, not the DELETE URL
        req.session.redirectUrl = req.get("Referer") || "/listing";

        req.flash("error", "You must be logged in!");
        return res.redirect("/login");
    }

    next();
};
module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}
module.exports.isOwner =  async(req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You are not the owner of this listing");
        return res.redirect(`/listing/${id}`);
    }
    next();
}
// MIDDLEWARE: Validate listing data before saving or updating
module.exports.validationlisting = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    
    // If validation fails, throw an error
    if (error) {
        throw new ExpressError(400, error.details[0].message);
    } else {
        // If validation passes, move to the next middleware/route
        next();
    }
};

//Rating reviews 
//post route
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);

    if (error) {
        throw new ExpressError(400, error.details[0].message);
    }

    next();
};


module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;

    let review = await Review.findById(reviewId);

    if (!review || !review.author) {
        req.flash("error", "Review or author not found!");
        return res.redirect(`/listing/${id}`);
    }

    if (String(review.author) !== String(req.user._id)) {
        req.flash("error", "You are not the author of this review!");
        return res.redirect(`/listing/${id}`);
    }

    next();
};