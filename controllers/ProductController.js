import { Product } from "../models/ProductModel.js";
import express from 'express';

const router = express.Router();

router.post('/addProduct', async(req, res, next) => {
    
    const { categoryTitle, title, price, image } = req.body;
    
    try {
        const product = await Product.create({
          categoryName: categoryTitle,
          title: title,
          price: price,
          imageUrl: image
        });

        if(product) {
          return res.json({ status: true })
        } else {
          return res.json({ status: false })
        }

    } catch(err) {
        next(err)
    }
  });

  router.get('/getProduct', async (req, res, next) => {
    const { name } = req.query;
  
    try {
      const filter = name ? { categoryName: name } : {};
      const result = await Product.find(filter);
  
      return res.json({ result });
  
    } catch (err) {
      next(err);
    }
  });
  

export default router;