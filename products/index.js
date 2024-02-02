const express = require("express");
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Product service is running on http://localhost:${port}`)
})