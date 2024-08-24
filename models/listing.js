// listing.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review'); // Import Review model

const listingSchema = new Schema({
    title: { 
        type: String,
        required: true,
    },
    category: { 
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    image: {
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    geometry: {
        type: {
            type: String, // 'geometry.type' must be 'Point'
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

listingSchema.pre('findOneAndDelete', async function (next) {
    const listing = await this.model.findOne(this.getFilter());

    if (listing.reviews && listing.reviews.length) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }

    next();
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
