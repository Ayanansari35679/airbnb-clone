const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});

    const updatedData = initData.data.map((obj) => ({
        ...obj,
        image: {
            url: obj.image.url,
            filename: obj.image.filename
        },
        owner: "6ae87580361fc3ab2be8526b"
    }));

    await Listing.insertMany(updatedData);

    console.log("Data was initialized");
};

main()
    .then(async () => {
        console.log("Connected to DB");
        await initDB();
        mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
        mongoose.connection.close();
    });