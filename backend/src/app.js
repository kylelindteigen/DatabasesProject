const express = require('express');

const Router = require('./routes.js');

const app = express();

app.use('8000', Router)
app.listen('3000', () => {
	console.log('server started on port 3000');
})
