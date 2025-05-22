import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
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
  images: {
    type: [String],
    default: []
  },
  article: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export const Product = mongoose.model("Product", ProductSchema);
