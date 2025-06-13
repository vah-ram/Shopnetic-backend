import express from 'express';
const app = express();
import mongoose from 'mongoose';
import cors from 'cors'
import { Server } from 'socket.io';
import http from 'http';
import dotenv from "dotenv";
import SignRouter from './controllers/SignController.js'
import ProductRouter from './controllers/ProductController.js'
import TodoRouter from './controllers/TodoController.js'
import SearchRouter from './controllers/SearchController.js'

app.use(express.json());
app.use(cors());
dotenv.config();
app.use('/api/auth', SignRouter);
app.use('/api/product', ProductRouter);
app.use('/api/todo', TodoRouter);
app.use('/search', SearchRouter);

const server = http.createServer(app);

const io = new Server( server, {
    cors: {
        origin: process.env.FrontEnd_Port,
        methods: ['GET', 'POST']
    }
});

io.on("connection", (socket) => {
    console.log(`Socket Connected Id: ${socket.id}`)
});

mongoose.connect(process.env.Mongo_Port)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

server.listen( process.env.Backend_Port, () => {
    console.log("Server is listening!")
});
