import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';

const generateNumericCode = customAlphabet('0123456789', 12); 

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
    unique: true
  }
}, {
  timestamps: true
});

ProductSchema.pre('save', async function (next) {
  if (!this.article) {
    let code;
    let exists = true;

    while (exists) {
      code = generateNumericCode();
      const existing = await mongoose.models.Product.findOne({ article: code });
      if (!existing) exists = false;
    }

    this.article = code;
  }

  next();
});

export const Product = mongoose.model("Product", ProductSchema);
