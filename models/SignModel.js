import mongoose from 'mongoose';

const SignScheme = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    shoppingId: {
        type: String,
        required: true
    },
    basketShopping: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }], 
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Favorite"
    }],
    ref: {
        type: String,
        default: "User"
    },
}, {
    timestamps: true
});

export const User = mongoose.model("User", SignScheme);
