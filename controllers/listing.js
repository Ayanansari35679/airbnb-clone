const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({accessToken:mapToken});

module.exports.index = async (req,res)=>{
     const allListings = await Listing.find({});

    // Send all listings to index.ejs
    res.render("listings/index.ejs", { allListings });
};


module.exports.renderNewForm = async (req, res) => {
    
    // Open the new listing form
    res.render("listings/new.ejs");
}

module.exports.showListing = async (req, res) => {
    
    // Get listing ID from URL
    let { id } = req.params;

    // Find listing by ID and populate its reviews
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}} ).populate("owner");
    
    if(!listing){
        req.flash("error","Listing you requested for does not exits!");
        return  res.redirect("/listing");
    }
    // Send listing data to show.ejs
    res.render("listings/show.ejs", { listing });
};

module.exports.searchListing = async (req, res) => {

    let value = (req.query.q || "").trim();
    let sort = req.query.sort || "asc";
    let category = req.query.category;

    if (!value && !category) {
        req.flash("error", "Search is not found");
        return res.redirect("/listing");
    }

    let filter = {};

    if (category) {
        filter.category = category;
    }

    if (value) {
        filter.$or = [
            { title: { $regex: value, $options: "i" } },
            { location: { $regex: value, $options: "i" } }
        ];
    }

    let search = await Listing.find(filter)
        .sort({ price: sort === "desc" ? -1 : 1 });

    if (search.length > 0) {
        res.render("listings/index.ejs", {
            allListings: search,
            value: value,
            sort: sort,
            category: category
        });
    } else {
        req.flash("error", "No listings found");
        return res.redirect("/listing");
    }
};
module.exports.createListing = async (req, res, next) => {
    const response = await geocodingClient
        .forwardGeocode({
            query: req.body.listing.location,
            limit: 1
        })
        .send();

    const feature = response.body.features[0];

    if (!feature) {
        req.flash("error", "Location not found. Please enter a valid location.");
        return res.redirect("/listing/new");
    }


    const newListing = new Listing(req.body.listing);

    newListing.owner = req.user._id;
    newListing.image = {
        url: req.file.path,
        filename: req.file.filename
    };

    newListing.geometry = feature.geometry;

    await newListing.save();

    req.flash("success", "New Listing created");
    res.redirect("/listing");
};
module.exports.renderEditForm = async (req, res) => {

    // Get listing ID from URL
    let { id } = req.params;

    // Find the listing that we want to edit
    const listing = await Listing.findById(id);

    if(!listing){
        req.flash("error","Listing you requested for does not exits!");
        return  res.redirect("/listing");
    }
    let originalImageUrl=listing.image.url;
    originalImageUrl= originalImageUrl.replace("/upload/h_300,w_250");

    // Open edit.ejs and send listing data
    res.render("listings/edit.ejs", { listing ,originalImageUrl});
};

module.exports.updateListing = async (req, res) => {

    // Get listing ID from URL
    let { id } = req.params;

    // Find listing by ID and update it with new form data
    let listing= await Listing.findByIdAndUpdate(
        id,
        { ...req.body.listing }
    );
    if(typeof req.file != "undefined"){

        let url= req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename};
        await listing.save();
    }
    req.flash("success","Listing Updated")

    // Redirect to the updated listing's show page
    res.redirect(`/listing/${id}`);
};

module.exports.deleteListing = async (req, res) => {

    // Get listing ID from URL
    let { id } = req.params;

    // Find listing by ID and delete it
    await Listing.findByIdAndDelete(id);

    req.flash("success","Listing deleted");

    // Redirect to all listings page
    res.redirect("/listing");
};