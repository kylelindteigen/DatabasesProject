const express = require('express')

const sql = require('./sql.js')

sql.init();
sql.login('kylelindteigen', 'password');
var Router = express.Router();



module.exports = Router;
