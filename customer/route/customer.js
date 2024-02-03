const { updateCustomers } = require('../controller/customerController');

const router = require('express').Router();

router.put('/update/:id', updateCustomers);


module.exports = router;