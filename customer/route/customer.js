const { updateCustomers, getAllCustomers} = require('../controller/customerController');
const { authenticateCustomer, isAdmin} = require('../middleware/verifyCustomer');

const router = require('express').Router();

router.put('/update/:id', authenticateCustomer, updateCustomers);
  // get the users... only the admin can perform this
  router.get('/',authenticateCustomer, isAdmin, getAllCustomers);


module.exports = router;