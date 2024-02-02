const express = require("express");
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());

const port = process.env.PORT || 2000;

app.listen(port, () => {
    console.log(`Shopping service is running on http://localhost:${port}`)
})