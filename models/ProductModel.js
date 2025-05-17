import mongoose from 'mongoose';

const ProductScheme = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String
    },
}, {
    timestamps: true
});

export const Product = mongoose.model("Product", ProductScheme);
