const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('colors');
dotenv.config();

const url = process.env.MONGO_URL

mongoose.connect(url)
.then(() => console.log("Db connection was scuccessful".green))
.catch((err) => console.log((err + 'Error connecting to db'). red))