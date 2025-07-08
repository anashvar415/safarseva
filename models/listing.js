const mongoose=require('mongoose');
const review = require('./review.js'); 
const schema= mongoose.Schema;
const listingSche=new schema (
    {
        title:String,
        description:String,
        image: {
            filename: String,
  url: String },
        price:Number,
        location:String,
    reviews: [
            {
                type: schema.Types.ObjectId ,
                ref: "review"
            }
        ],
        owner:{
            type: schema.Types.ObjectId,
            ref: "user" 
        },
        category: {
            type: String},
       geometry: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point'
            },
            coordinates: {
                type: [Number],
                required: true
            } ,
            unavailableDates: [
    {      start: new Date("2025-07-10"),
      end: new Date("2025-07-15")

    }
  ]

        }
        
    }
);

listingSche.post('findOneAndDelete', async function(listing) {
   if(listing){
        await review.deleteMany({
            _id: {
                $in: listing.reviews
            }
        });
    }
    
});
const listing=mongoose.model("listing",listingSche);
module.exports=listing;