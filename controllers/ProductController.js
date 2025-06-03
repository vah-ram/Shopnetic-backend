import { Product } from "../models/ProductModel.js";
import { User } from "../models/SignModel.js";
import express from 'express';
import { customAlphabet } from 'nanoid'

const router = express.Router();

router.post('/addProduct', async(req, res, next) => {
    
    const { categoryTitle, title, price, images } = req.body;
    
    const generateNumericCode = customAlphabet('0123456789', 12);
    const randomCode = generateNumericCode();

    try {
        const hasArticle = await Product.findOne({ article: randomCode  });

        while(hasArticle) {
          randomCode = generateNumericCode();
          hasArticle = await Product.findOne({ article: randomCode  });
        };

        const product = await Product.create({
          categoryName: categoryTitle,
          title: title,
          price: price,
          images: images,
          article: randomCode
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
      result.sort(() => Math.random() - 0.5 );
  
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

  router.get('/getBasketProducts', async (req, res, next) => { 
    
    const { myId } = req.query;
    
    try {
      const user = await User.findById(myId);

      if(user) {
        const arr = (
        await Promise.all(
          user.basketShopping.map(item => Product.findById(item))
        )
      ).filter(Boolean);
        
        if(arr) {
          res.json({ arr: arr.reverse() });
        } else {
          return false;
        }     
      }
    } catch (err) {
      next(err);
    }
  });

    router.get('/getBasketPrices', async (req, res, next) => { 
      
      const { myId } = req.query;
      
      try {
        const user = await User.findById(myId);

        if(user) {
          const products = (
            await Promise.all(
              user.basketShopping.map(item => Product.findById(item))
            )
          ).filter(Boolean);

          const productsPrices = products.reduce((sum, item) => 
            sum + item.price, 0
          );
          
          return res.json({ productsPrices }); 
        }
      } catch (err) {
        next(err);
      }
    });

  router.delete('/deleteBasketProduct', async(req, res, next) => {
    const { myId, productId } = req.query

    try {
      const item = await User.findById(myId);

      if(item) {
        item.basketShopping = item.basketShopping.filter((item) => item.toString() !== productId)
        await item.save()
      }
    } catch(err) {
      next(err)
    }
  });

  router.get('/getCatalog', async (req, res, next) => {
    const { articleId } = req.query;
  
    try {
      const catalog = await Product.findOne( { article: articleId } );
  
      if(catalog) {
        return res.json({ catalog });
      }
  
    } catch (err) {
      next(err);
    }
  });

  router.get('/getSimiliarProducts', async (req, res, next) => {
    const { similiarName, catalogId } = req.query;

    try {
      const catalogs = await Product.find({categoryName: similiarName});
      const filtered = catalogs.filter((item) => {
        return item._id.toString() !== catalogId.toString()
      });
      filtered.sort(() => Math.random() - 0.5 );

      if(filtered) {
        return res.json({ catalogs: filtered });
      }
  
    } catch (err) {
      next(err);
    }
  });

  router.post('/addFavorite', async(req, res, next) => {
    const { productId, myId } = req.body;

    try {
      const user = await User.findById(myId);

      if(!user.favorites.includes(productId)) {
        user.favorites.push(productId);
        await user.save();

        return res.json({ favorites: user.favorites });
      };
    } catch(err) {
      next(err)
    }
  });

  router.delete('/deleteFavorite', async(req, res, next) => {
    const { productId, myId } = req.query;

    try {
      const user = await User.findById(myId);

      if(user && user.favorites.includes(productId)) {

        user.favorites = user.favorites.filter((item) => {
          item.toString() !== productId
        })

        await user.save();

        return res.json({ favorites: user.favorites });
      } else {
        return res.json("That product is not available!")
      }
    } catch(err) {
      next(err)
    }
  });

  router.get('/getFavorite', async(req, res, next) => {
    const { myId } = req.query;

    try {
      const user = await User.findById(myId);

      if(user) {
        return res.json({ favorites: user.favorites });
      };
    } catch(err) {
      next(err)
    }
  });

export default router;