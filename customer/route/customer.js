const { updateCustomers } = require('../controller/customerController');
const { authenticateCustomer } = require('../middleware/verifyCustomer');

const router = require('express').Router();

router.put('/update/:id', authenticateCustomer, updateCustomers);


module.exports = router;