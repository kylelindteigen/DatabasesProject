const express = require('express')

const sql = require('./sql.js')

sql.init();
var Router = express.Router();



module.exports = Router;
