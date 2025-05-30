import { Product } from "../models/ProductModel.js";
import express from 'express';
const router = express.Router();

router.get('/searchresults', async( req, res, next ) => {
    const { searchResult } = req.query;

    try {
        const products = await Product.find({
            title: { $regex: `^${searchResult}`, $options: 'i' }
        });

        const AllCategories = await Product.find();
        AllCategories.sort(() => Math.random() - 0.5 );

        if(products.length > 0) {
            return res.json( { products: products } );
        }else {
            return res.json( { products: AllCategories, text: "К сожалению, товаров с таким названием нет." } );
        }
    } catch(err) {
        next(err)
    }
});

export default router;