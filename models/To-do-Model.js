import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
});

export const Todo = mongoose.model("Todo", TodoSchema);
