const dotenv = require("dotenv"); // config.js
dotenv.config();
module.exports = { port: process.env.PORT };
