const express = require("express");
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    console.log("here is the customer service")
     res.send("Hello from customer service")
})

app.listen(port, () => {
    console.log(`customer service is running on http://localhost:${port}`)
})