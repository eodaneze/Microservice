const express = require("express");
const dotenv = require('dotenv')
const authRouter = require("./route/auth");
require('colors');
require('./config/db')


dotenv.config();
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    console.log("here is the customer service")
     res.send("Hello from customer service")
})

app.use("/api", authRouter)

app.listen(port, () => {
    console.log(`customer service is running on http://localhost:${port}`.blue)
})