const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const listingSchema=new Schema({
    title: { 
        type:String,
        required:true,
    },
    category: { 
        type:String,
        required:true,
    },
    quantity : {
        type:Number,
        required:true,
    },
    createdAt : {
        type:Date,
    },
    
    image: {
        url:String,
        filename:String,
    },
    price: Number,
    location:String,
    country:String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref:"Reviews",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref:"User",
    },
    geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

listingSchema.post("findOneAndDelete", async(listing) => {
    if(listing) {
        await Reviews.deleteMany({ _id: {sin: listing.reviews}});
    }
});

const Listing=mongoose.model("Listing", listingSchema);
module.exports=Listing;


