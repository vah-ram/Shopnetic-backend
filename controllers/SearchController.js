import { Product } from "../models/ProductModel.js";
import express from 'express';
const router = express.Router();

router.get('/searchresults', async( req, res, next ) => {
    const { searched } = req.query;

    try {
        const productsSearchedByArticle = await Product.findOne({
            article: searched
        });

        const products = await Product.find({
            title: { $regex: `^${searched}`, $options: 'i' }
        });

        const AllCategories = await Product.find();
        AllCategories.sort(() => Math.random() - 0.5 );

        if(productsSearchedByArticle) {
            return res.json( { product: productsSearchedByArticle } );
        }else {
            if(products.length > 0) {
                return res.json( { products: products } );
            }else {
                return res.json( { products: AllCategories, text: "К сожалению, товаров с таким названием нет." } );
            }
        }
    } catch(err) {
        next(err)
    }
});

export default router;