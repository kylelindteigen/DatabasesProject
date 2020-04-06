const express = require('express')

const sql = require('./sql.js')

sql.init();
sql.login('kylelindteigen', 'password');
sql.getcustposts('0')
sql.getresttposts('0')
var Router = express.Router();



module.exports = Router;
