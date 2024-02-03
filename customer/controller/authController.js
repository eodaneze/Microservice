const {isStrongPassword, isValidEmail} = require('../helper/function');
const Customer = require("../models/Customer");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const verification_secret = process.env.verification_secret_key;
const secret_key = process.env.JWT_SECRET;
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      customer: process.env.EMAIL_customer,
      pass: process.env.EMAIL_PASS,
    },
  });
const register = async(req, res) => {
    try{
         const {customername, fullname, email, password} = req.body;
         if (!isValidEmail(email)) return res.status(400).json({ message: 'Invalid email format' });
         const exisitingcustomer = await Customer.findOne({$or: [{customername}, {email}]});
         if(exisitingcustomer) return res.status(400).json({message: "customername or email already exists"});
         const hashedPassword = await bcrypt.hash(password, 10);
         const verificationToken = jwt.sign({ fullname, email }, verification_secret);
         const newCustomer = new Customer({
            customername,
            fullname,
            email,
            password: hashedPassword,
            verificationToken: verificationToken
         });
         await newCustomer.save();
         const verificationLink = `http://localhost:5000/verify/token=${verificationToken}`;
         const mailOptions = {
            from: process.env.EMAIL_customer,
            to: email,
            subject: 'Welcome to Nodemicroservice',
            html: `Dear ${fullname}, Thank you for registering at nodemicroservice, Click <a href="${verificationLink}">here</a> to verify your email.`,
        };
        transporter.sendMail(mailOptions, (err) => {
            if(err){
               
              console.log(err)
               res.status(400).json({ message: 'error registering customer'});
            }else{
                           
               res.status(200).json({ message: `customer registered successfully. Verification email sent to ${email}`});
            }
         });
        
    }catch(err){
        console.log(err)
    }
}


const verifyEmail = async (req, res) => {
    try {
      const verificationToken = req.params.token;
  
      // Verify the token
      const decodedToken = jwt.verify(verificationToken, verification_secret);
      const { fullname, email } = decodedToken;
  
      // Update the customer's verification status
      const customer = await Customer.findOneAndUpdate({ fullname, email, verificationToken }, { $set: { isVerified: true, verificationToken: null } });
  
      if (!customer) {
        return res.status(400).json({ message: 'Invalid verification token' })
      }
  
      res.status(200).json({ message: 'Email verified successfully, you can now login' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }


  const authLogin = async(req, res) => {
    const{email, password} = req.body;
    if(!email || !password) return res.status(400).json({error: "Please provide email and password"});
    try{
        //  find the customer by email in the database
         const customer = await Customer.findOne({email});
      
        //  check if the customer exist
        if(!customer) res.status(400).json({error: 'customer with this record does not exist in the database'});
    //    compare the password with the strored hashed password
        const passwordMarch = await bcrypt.compare(password, customer.password);
        if(!passwordMarch) res.status(401).json({error: 'Incorrect password'});
        // check if the customer have been verified
        if(!customer.isVerified) return res.status(401).json({message: `You have not verified your account please check your email ${email} to verify your account`})
       // Use destructuring with the spread operator to exclude password from the response
       const {password: _, ...others} = customer.toObject();
         // use a jwt to authenticate a customer
         const accessToken = jwt.sign({
            id: customer._id, 
            email: customer.email, role: customer.role}, secret_key, {
            expiresIn: '6h',
          });
        res.status(200).json({message: "Login successful", others, accessToken})
    }catch(err){
       console.log(err)
    }
}
module.exports = {register, verifyEmail, authLogin}