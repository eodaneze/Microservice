const Customer = require("../models/Customer");


const getAllCustomers = async(req, res) => {
    try {
        // using a mongodb $ne operator(not equal) to get all the users excluding the one with the isAdminrole
        const allCustomer = await Customer.find({role: {$ne: 'isAdmin'}});
        res.json(allCustomer);
      } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users' });
      }
}
const updateCustomers = async(req, res) => {
    const {id} = req.params;
       

    try{
       const customer = await Customer.findByIdAndUpdate(id, {
          $set: req.body
       }, {new: true});
       res.status(200).send(customer)
    }catch(err){
       console.log(err)
    }
}

module.exports = {updateCustomers, getAllCustomers}