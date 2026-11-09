const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async(req,res)=>{
    let listing= await Listing.findById(req.params.id);
    
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    req.flash("success","New Review Created");
    res.redirect(`/listing/${listing._id}`);

    
};
module.exports.deleteReview = async (req,res)=>{
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull:{ reviews:reviewId}});
    //pull -> it is used to find the matching reveiw id from reviews array and updateit;
    //$pull removes the review ID from the Listing's array. It does not delete the 
    // actual Review document from the Reviews collection.
    await Review.findByIdAndDelete(reviewId);
    //This deletes the actual review document from the MongoDB reviews collection
    req.flash("success","Review Deleted");
    res.redirect(`/listing/${id}`);
};