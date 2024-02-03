const Customer = require("../models/Customer");


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

module.exports = {updateCustomers}