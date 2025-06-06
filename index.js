import express from 'express';
const app = express();
import mongoose from 'mongoose';
import cors from 'cors'
import { Server } from 'socket.io';
import http from 'http'
import SignRouter from './controllers/SignController.js'
import ProductRouter from './controllers/ProductController.js'
import TodoRouter from './controllers/TodoController.js'
import SearchRouter from './controllers/SearchController.js'

app.use(express.json());
app.use(cors());
app.use('/api/auth', SignRouter);
app.use('/api/product', ProductRouter);
app.use('/api/todo', TodoRouter);
app.use('/search', SearchRouter);

const server = http.createServer(app);

const io = new Server( server, {
    cors: {
        origin: "https://shopnetic.wuaze.com",
        methods: ['GET', 'POST']
    }
});

// io.on("connection", (socket) => {
// });

mongoose.connect('mongodb+srv://Vahram:vahram12345@cluster0.powdqsm.mongodb.net/Shopnetic')
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

server.listen(5000, () => {
    console.log("Server is listening!")
});
