const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors')
const proxy = require('express-http-proxy')
dotenv.config();
const app = express();

app.use(cors())
app.use(express.json());

app.use('/customer', proxy('http:localhost:5000'))
app.use('/shopping', proxy('http:localhost:8000'))
app.use('/', proxy('http:localhost:6000')) // this is the product endpoint

const port = process.env.PORT || 1000;

app.listen(port, () => {
    console.log(`gateway service is running on http://localhost:${port}`)
})