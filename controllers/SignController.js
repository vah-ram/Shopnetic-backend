import { User } from "../models/SignModel.js";
import express from 'express';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/register', async(req, res, next) => {
    
    const { username, email, password } = req.body;

    const htmlTags = 
    `
        <section style=" width: 400px; height: 100%; text-align: left; padding: 10px;">
            <h1 style="color: rgb(255, 57, 57); font-size: 24px; margin-top: 20px;">ShopNetic!</h1>
            
            <h3 style="margin-top: 30px; font-size: 25px;"> 
                Verify your email <br> address 
                 to complete <br> registration
             </h3>
        
            <p style="margin-top: 30px; display: block; text-align: left; font-size: 20px;">
                <b style="margin-bottom: 10px;">Hi ${username}</b>,
                <p>
                    Thank you for your interest in our Shopnetic 
                    online store. <br> For complete your verify Email 
                    please click<br> Verify Email button!
                </p>
            </p>

            <div style="width: 100%; text-align: left; margin-top: 40px;">
                <a href="https://shopnetic-free.free.nf" target="_blank"
                    style="display: inline-block; width: 70%; max-width: 300px; height: 50px; line-height: 40px; 
                            border: none; border-radius: 7px; color: white; background: rgb(255, 57, 57); 
                            text-decoration: none; text-align: center; font-family: sans-serif; 
                            font-weight: bold; font-size: 19px;
                            dsiplay:flex; justify-content: center; align-items: center;">
                    <p style="margin-top: 3px; letter-spacing: .5px;">Verify Email</p>
                </a>
            </div>
        </section>
    `;

    try {

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "shopnetic.feedback@gmail.com",
                pass: "zval jzpz dgxf yerz"
            }
        });

        const mailSended = await transporter.sendMail({
                from: "shopnetic.feedback@gmail.com",
                to: email,
                subject: "Verify your Email!",
                html: htmlTags
            }).then(() => {
                console.log("Email sent!");
                return true;
            }).catch(() => {
                console.log("Email not sended!");
                return false;
            })

        if(mailSended) {
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
        }
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