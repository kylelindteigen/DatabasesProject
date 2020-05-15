const express = require('express');
var cookieParser = require('cookie-parser')
// const session = require('express-session');
const cors = require('cors')
// const redis = require('redis')
// var redisClient = redis.createClient({host: 'localhost', port: 6379, client: redisClient, ttl: 86400});
// var redisStore = require('connect-redis')(session)
var bodyParser = require('body-parser')
// const passport = require('./passport.js');
const getSessionStore = require('./sessionStore.js');
const app = express();
const path = require('path')



// redisClient.on('error', (err) => {
//   console.log('Redis error: ', err);
// });
//
// app.use(session({
// 	secret: "shhhh",
// 	cookie:{
// 	secure: "auto",
// 	httpOnly: false},
// 	resave: false,
// 	saveUninitialized: false
// }));
// app.use(passport.initialize())
// app.use(passport.session())
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'../frontend/build/index.html'));
});

app.use(cors());
// app.use('/', express.static('public'))
const Router = require('./routes.js');
app.use("/api", Router)
const port = process.env.PORT || 5000;
app.listen(port)
console.log("listening to port " + port)
