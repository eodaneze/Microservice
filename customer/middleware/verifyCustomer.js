const jwt = require('jsonwebtoken');
const authenticateCustomer = (req, res, next) => {
    const authHeader = req.headers.token;
     if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, customer) => {
            if(err) res.status(403).json("Token is not valid");

            req.customer = customer;
            next();
        })
     }else{
        return res.status(401).json("You are not authenticated")
     }
    
}


// only the admin can get all the customers at once
const isAdmin = (req, res, next) => {
    if(req.customer && req.customer.role === 'isAdmin'){
       return next();
    }
    return res.status(403).json({ error: 'Forbidden: Admin access required' });
   
}

// Middleware to check if the requested customer ID matches the authenticated customer's ID

const isSameCustomerOrAdmin = (req, res, next) => {
    const customerId = req.params.id;
    if(req.customer.role === 'isAdmin' || req.customer.id === customerId){
       return next();
    }
    return res.status(403).json({ error: 'Forbidden: Access denied' });
}
module.exports = {authenticateCustomer, isAdmin, isSameCustomerOrAdmin}