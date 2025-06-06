import { User } from "../models/SignModel.js";
import express from 'express';
import bcrypt from 'bcrypt';
import QrCode from 'qrcode';
import { customAlphabet } from "nanoid";

const router = express.Router();

router.post('/register', async(req, res, next) => {
    
    const { username, email, password } = req.body;

    const generateId = customAlphabet("012346789", 10);
    const randomId = generateId();

    try {
        const IdIsValid = await User.findOne({ shoppingId: randomId });

        while(IdIsValid) {
            randomId = generateId();
            IdIsValid = await User.findOne({ shoppingId: randomId });
        };

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
            password: hashedPassword,
            shoppingId: randomId,
            shoppingQr: await QrCode.toDataURL(randomId)
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
                res.json({ msg: "Invalid username!", status: false});
            };

        const isPasswordValid = await bcrypt.compare( password, user.password );
            if(!isPasswordValid) {
                res.json({ msg: "Invalid password!", status: false});
            };

            return res.json({ status: true, obj: user });
    } catch(err) {
        next(err)
    }
  });
  
export default router;