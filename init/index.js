const mongoose = require('mongoose');
const listing = require('../models/listing.js');
const indata = require('./data.js');
 async function main(){
await mongoose.connect(process.env.ATLAS_URL);

        
    }
    main().then(()=>{    console.log("connected to db");}
)
.catch((err)=>{
        console.log(err);
    });
    const initdb = async () => {    
        await listing.deleteMany({});
        indata.data =indata.data.map((obj)=>({...obj,owner: "685aebc3a8e1e736b343f5d2"}));
        await listing.insertMany(indata.data);
    }
    initdb();