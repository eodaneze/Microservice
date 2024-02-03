const Customer = require("../models/Customer");
const bcrypt = require('bcrypt');

const register = async(req, res) => {
    try{
         const {username, fullname, email, password} = req.body;
         const exisitingUser = await Customer.findOne({$or: [{username}, {email}]});
         if(exisitingUser) return res.status(400).json({message: "Username or email already exists"});
         const hashedPassword = await bcrypt.hash(password, 10);
         const newCustomer = new Customer({
            username,
            fullname,
            email,
            password: hashedPassword
         });
         await newCustomer.save();
         res.status(200).json({message: "Your registration was successful", newCustomer})
    }catch(err){
        console.log(err)
    }
}
module.exports = {register}