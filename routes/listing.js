
const express = require("express");
const router = express.Router();

const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const listingSchema = require("../schema.js");
const { reviewSchema } = require("../schema.js");
const { isLoggedIn, isOwner, validationlisting } = require("../middlewares.js");
const listingController =require("../controllers/listing.js");
const  searchListing  = require('../controllers/listing.js');

const multer = require("multer");
const {storage} =require("../cloudConfig.js");
const upload = multer({storage});

// 1. INDEX ROUTE (GET)
// Display all listings on the index page
router.get("/", wrapAsync(listingController.index));


// 2. NEW ROUTE (GET)
// Display the form to create a new listing
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));



router.get("/search",wrapAsync(listingController.searchListing));
// 3. SHOW ROUTE (GET)
// Display details of one particular listing
router.get("/:id", wrapAsync(listingController.showListing));



// 4. CREATE ROUTE (POST)
// Receive form data and create a new listing
router.post("/",isLoggedIn,
    upload.single("listing[image]"),
    validationlisting,
    wrapAsync(listingController.createListing));


// 5. EDIT ROUTE (GET)
// Display the edit form for an existing listing
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));

// 6. UPDATE ROUTE (PUT)
// Update an existing listing in MongoDB
router.put("/:id",isLoggedIn,isOwner,
    upload.single("listing[image]"),
    validationlisting
    , wrapAsync(listingController.updateListing));


// 7. DELETE ROUTE (DELETE)
// Delete an existing listing from MongoDB
router.delete("/:id",isLoggedIn, wrapAsync(listingController.deleteListing));



// Export router so app.js can use these routes
module.exports = router;
