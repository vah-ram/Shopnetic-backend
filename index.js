import express from 'express';
const app = express();
import mongoose from 'mongoose';
import cors from 'cors'
import { Server } from 'socket.io';
import http from 'http'
import SignRouter from './controllers/SignController.js'
import ProductRouter from './controllers/ProductController.js'
import SearchRouter from './controllers/SearchController.js'

app.use(express.json());
app.use(cors());
app.use('/api/auth', SignRouter);
app.use('/api/product', ProductRouter);
app.use('/api/todo', SearchRouter);

const server = http.createServer(app);

const io = new Server( server, {
    cors: {
        origin: "https://shopnetic-shop.free.nf",
        methods: ['GET', 'POST']
    }
});

// io.on("connection", (socket) => {
// });

mongoose.connect('mongodb+srv://Vahram:vahram12345@cluster0.powdqsm.mongodb.net/Shopnetic').then(() => {
    console.log("MongoDb Connected!")
}).catch((err) => {
    console.log(err);
});

server.listen(5000, () => {
    console.log("Server is listening!")
});
