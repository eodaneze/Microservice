const express = require("express");
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());

const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
    console.log("here is the product service")
     res.send("Hello from product service")
})

app.listen(port, () => {
    console.log(`Product service is running on http://localhost:${port}`)
})