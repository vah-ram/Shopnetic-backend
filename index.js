import express from 'express';
const app = express();
import mongoose from 'mongoose';
import cors from 'cors'
import SignRouter from './controllers/SignController.js'
import ProductRouter from './controllers/ProductController.js'

app.use(express.json());
app.use(cors());
app.use('/api/auth', SignRouter);
app.use('/api/product', ProductRouter);

mongoose.connect('mongodb+srv://Vahram:vahram12345@cluster0.powdqsm.mongodb.net/Shopnetic').then(() => {
    console.log("MongoDb Connected!")
}).catch((err) => {
    console.log(err);
});

app.listen(5000, () => {
    console.log("Server is listening!")
});
