require('dotenv').config();
const mongoose = require('mongoose');
const listing = require('../models/listing.js');
const indata = require('./data.js');

async function main() {
    await mongoose.connect(process.env.ATLAS_URL);
    console.log("connected to Atlas DB");

    await listing.deleteMany({});
    indata.data = indata.data.map((obj) => ({ ...obj, owner: "685af93bb4c5679151d59b8b" }));
    await listing.insertMany(indata.data);
    console.log("Sample data uploaded!");
    process.exit();
}

main().catch((err) => {
    console.log(err);
    process.exit(1);
});
