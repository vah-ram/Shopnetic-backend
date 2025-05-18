import { Product } from "../models/ProductModel.js";
import { User } from "../models/SignModel.js";
import express from 'express';

const router = express.Router();

router.post('/addProduct', async(req, res, next) => {
    
    const { categoryTitle, title, price, images } = req.body;
    
    try {
        const product = await Product.create({
          categoryName: categoryTitle,
          title: title,
          price: price,
          images
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

  router.post('/toBasket', async(req, res, next) => {
    const { myId, id } = req.body

    try {
      const user = await User.findById(myId);

      if(!user.basketShopping.includes(id)) {
        user.basketShopping.push(id);
        await user.save();
      };
    } catch(err) {
      next(err)
    }
  });

export default router;