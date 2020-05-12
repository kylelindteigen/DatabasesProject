const express = require('express')
const session = require('express-session');

const sql = require('./sql.js')

sql.init();
var Router = express.Router();


Router.get('/', function(req,res){
	var sess = req.session;
	console.log(req.session.id);
	req.session.userid = "";
	res.sendFile('index.html')
})

Router.post('/login', function(req, res){
	var sess = req.session;
	const json_data = req.body
	var email = json_data.email
	var password = json_data.password
	email = "kylelindteigen@ku.edu"
	password = "password"
	req.email = email;
	sql.login(email, password).then(s =>{
		req.userid = s[0].UserID
		res.send(JSON.stringify({status:"success",
        token: req.sessionID,
        userid : s[0].UserID,
		name : s[0].Name}))
	}).catch(() =>
		res.send(JSON.stringify({status: "fail"}))
	)
})

Router.get('/logout', function(req, res){
	req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });
})

Router.post('/signUp', function(req, res){
	const json_data = req.body
	var username = json_data.username
	var name = json_data.name
	var email = json_data.email
	var password = json_data.password

	sql.createUser(username, name, email, password).then(s =>{
		s.status = "success"
		res.send(s)
	}).catch(() =>
		res.send("failed to login")
	)
})

Router.post('/signUpRest', function(req, res){
	const json_data = req.body
	var username = json_data.username
	var name = json_data.name
	var email = json_data.email
	var password = json_data.password
	var style = json_data.style
	var address = json_data.address

	sql.createRestUser(username, name, email, password, style, address).then(s =>{
		s.status = "success"
		res.send(s)
	}).catch(() =>
		res.send("failed to login")
	)
})

Router.post('/loadHomePage', function(req, res){
	var body = req.body;
	userid = parseInt(body.userid)
	console.log(userid)
	sql.getFollowsPosts(userid).then(s =>{
		sql.getFollows(userid).then(r =>{
			sql.getFollowed(userid).then(t =>{
				res.send(JSON.stringify({followsposts: s, follows: r, followed: t}))
			}).catch(()=>{

			})
		}).catch(()=>{

		})
	}).catch(()=>{

	})
})

Router.post('/loadUserPage', function(req, res){
	const json_data = req.body
	var userid = json_data.userid

	sql.getUserPosts(userid).then(s =>{
		sql.getFollows(userid).then(r =>{
			sql.getFollowed(userid).then(t =>{
				sql.getUserInfo(userid).then(u =>{
					sql.getUserReviews(userid).then(i =>{
						res.send(JSON.stringify({userposts: s, follows: r, followed: t, userinfo: u, reviews: i}))

					}).catch(()=>{

					})
				}).catch(()=>{

				})
			}).catch(()=>{

			})
		}).catch(()=>{

		})
	}).catch(()=>{

	})

})

Router.post('/loadRestPage', function(req, res){
	const json_data = req.body
	var userid = json_data.userid

	sql.getUserPosts(userid).then(s =>{
		sql.getFollows(userid).then(r =>{
			sql.getFollowed(userid).then(t =>{
				sql.getUserInfo(userid).then(u =>{
					sql.getUserReviews(userid).then(i =>{
						sql.getMenuItemRest(userid).then(j=>{
							res.send(JSON.stringify({userposts: s, follows: r, followed: t, userinfo: u, reviews: i, menu: j}))
						}).catch(() =>{

						})

					}).catch(()=>{

					})
				}).catch(()=>{

				})
			}).catch(()=>{

			})
		}).catch(()=>{

		})
	}).catch(()=>{

	})

})

Router.get('/follow', function(req, res){
	const json_data = req.body
	var follower = json_data.follower
	var follow = json_data.follow
	sql.setFollows(follower, follow).then(s=>{
		console.log(s)
		res.send(s)
	}).catch(()=>{

	})
})

Router.get('/getPostComments', function(req, res){
	const json_data = req.body
	var postid = json_data.postid

	sql.getPostComments(postid).then(s=>{
		console.log(s)
		res.send(s)
	}).catch(()=>{

	})
})

Router.get('/savePost', function(req, res){
	const json_data = req.body
	var userid = json_data.userid
	var post = json_data.post

	sql.createPost(userid, post)
})

Router.post('/search', function(req, res){
	const json_data = req.body
	var search = json_data.search
	console.log(search)

	sql.searchUserName(search).then(s =>{
		res.send(JSON.stringify({return: s}))
	}).catch(() =>
		res.send("failed to login")
	)
})

Router.post('/isRestaurant', function(req, res){
	const json_data = req.body
	var userid = json_data.userid

	sql.isRestaurant(userid).then(s =>{
		if (s == []){
			res.send(JSON.stringify({Restaurant: true}))
		}
		else{
			res.send(JSON.stringify({Restaurant: false}))
		}
	}).catch(() =>
		res.send(JSON.stringify({Restaurant: false}))
	)
})
module.exports = Router;
