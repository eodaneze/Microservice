const {isStrongPassword, isValidEmail} = require('../helper/function');
const Customer = require("../models/Customer");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const verification_secret = process.env.verification_secret_key;
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
const register = async(req, res) => {
    try{
         const {username, fullname, email, password} = req.body;
         if (!isValidEmail(email)) return res.status(400).json({ message: 'Invalid email format' });
         const exisitingUser = await Customer.findOne({$or: [{username}, {email}]});
         if(exisitingUser) return res.status(400).json({message: "Username or email already exists"});
         const hashedPassword = await bcrypt.hash(password, 10);
         const verificationToken = jwt.sign({ fullname, email }, verification_secret);
         const newCustomer = new Customer({
            username,
            fullname,
            email,
            password: hashedPassword,
            verificationToken: verificationToken
         });
         await newCustomer.save();
         const verificationLink = `http://localhost:5000/verify/token=${verificationToken}`;
         const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to Nodemicroservice',
            html: `Dear ${fullname}, Thank you for registering at nodemicroservice, Click <a href="${verificationLink}">here</a> to verify your email.`,
        };
        transporter.sendMail(mailOptions, (err) => {
            if(err){
               
              console.log(err)
               res.status(400).json({ message: 'error registering user'});
            }else{
                           
               res.status(200).json({ message: `User registered successfully. Verification email sent to ${email}`});
            }
         });
        
    }catch(err){
        console.log(err)
    }
}
module.exports = {register}