import { Todo } from '../models/To-do-Model.js';
import express from 'express';
const router = express.Router();

router.post('/toDoAdd', async( req,res,next ) => {
    const { text, author } = req.body;

    try {
        await Todo.create({ text: text, author: author });

        const result = await Todo.find();

        if(result) {
            return res.json({ result: result.reverse() })
        }
    } catch(err) {
        next(err)
    }
});

router.get('/toDoGet', async( req,res,next ) => {
    const { author } = req.query;

    try {
        const result = await Todo.find({ author: author });

        if(result) {
            return res.json({ result: result.reverse()})
        }
    } catch(err) {
        next(err)
    }
});

router.delete('/toDoRemove', async( req,res,next ) => {
    const { todoId } = req.query;

    try {
        const result = await Todo.findByIdAndDelete(todoId);

        if(result) {
            res.json({ status: true, msg: 'All is ok'});
        };
    } catch(err) {
        next(err)
    }
});

export default router;