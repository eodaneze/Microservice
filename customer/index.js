const express = require("express");
const dotenv = require('dotenv')
const authRouter = require("./route/auth");
const authCustomer = require("./route/customer");
require('colors');
require('./config/db')


dotenv.config();
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
app.use("/api", authRouter)
app.use("/api", authCustomer)

app.listen(port, () => {
    console.log(`customer service is running on http://localhost:${port}`.blue)
})