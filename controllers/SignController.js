import { User } from "../models/SignModel.js";
import express from 'express';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/register', async(req, res, next) => {
    
    const { username, email, password } = req.body;
    
    try {
        const hasUsername = await User.findOne({ username });
            if(hasUsername) {
                return res.json({msg: "Username is already exists!", status: false})
            };
        const hasEmail = await User.findOne({ email });
            if(hasEmail) {
                return res.json({msg: "Email is already exists!", status: false})
            };
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            username: username,
            email: email,
            password: hashedPassword
        });

        return res.json({ status: true, obj: user });
    } catch(err) {
        next(err)
    }
  });

  router.post('/login', async(req, res, next) => {

    const { username, password } = req.body;
    
    try {
        const user = await User.findOne({ username });
            if(!user) {
                res.json({ msg: "Invalid username or password!", status: false});
            };

        const isPasswordValid = await bcrypt.compare( password, user.password );
            if(!isPasswordValid) {
                res.json({ msg: "Invalid username or password!", status: false});
            };

            return res.json({ status: true, obj: user });
    } catch(err) {
        next(err)
    }
  });
  
export default router;