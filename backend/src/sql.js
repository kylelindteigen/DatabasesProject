const mysql = require('mysql');

const db = mysql.createConnection({
	host	: 'mysql.eecs.ku.edu',
	user	: 'kylelindteigen',
	password: 'Taeyo9if',
	database: 'kylelindteigen'
});

class SQL{
	static init(){
		//Connect
		db.connect((err) => {
			if(err){
				throw err;
			}
		});
	}

	static login(email, password){
		return new Promise(async (resolve,reject) =>{
				try{
					db.query("SELECT * FROM User WHERE User.Email = \"" + email +"\" AND User.Password = PASSWORD(\"" + password + "\")", function (err, result, fields) {
						if(err) reject(err);
						else{
							resolve(result)
						}
					})
				}catch(e){
					reject(e)
				}


		})
	}

	static createUser(username, name, email, password){
		return new Promise(async (resolve,reject) =>{
				try{
					db.query("INSERT INTO User(Username, Name, Email, Password) VALUES(\""+username+"\", \""+name+"\", \""+email+"\", PASSWORD(\""+password+"\"))", function (err, result, fields) {
						if(err) reject(err);
						else{
							resolve(result)
						}
					})
				}catch(e){
					reject(e)
				}


		})
	}

	static createRestUser(username, name, email, password, style, address){
		return new Promise(async (resolve,reject) =>{
			try{
				db.query("INSERT INTO User(Username, Name, Email, Password) VALUES(\""+username+"\", \""+name+"\", \""+email+"\", PASSWORD(\""+password+"\"))", function (err, result, fields) {
					if(err) throw err;
					db.query("INSERT INTO Restaurant(UserID, Style, Address) VALUES(\""+x.InsertedID +"\", \""+style+"\", \""+address+"\")", function (err2, result2, fields2) {
						if(err2) throw err2;
						resolve(result)
					});
				});
			}catch(e){
				reject(e)
			}
		});


	}

	static createMenuItem(userid, name, nutritionalInfo, style, price){
		return db.query("INSERT INTO MenuItem(ItemID, UserID, Name, NutritionalInformation, Style, Price) VALUES( 1 ,"+userid+", \""+name+"\", \""+nutritionalInfo+"\",\""+style+"\", "+price+" )",  function (err, result, fields) {
			if(err) throw err;
			console.log(result);
		})
	}

	static createPost(userid, post){
		return db.query("INSERT INTO User(PostID, UserID, TimeStamp, Post) VALUES(1,"+userid+", NOW(), \""+post+"\")", function (err, result, fields) {
			if(err) throw err;
			console.log(result);
		})
	}

	static createComment(userid, postid, comment){
		return db.query("INSERT INTO User(UserID, PostID, TimeStamp, Comment) VALUES("+userid+","+postid+",NOW(), \""+comment+"\"", function (err, result, fields) {
			if(err) throw err;
			console.log(result);
		})
	}

	static createComment(userid, postid, comment){
		return db.query("INSERT INTO User(UserID, PostID, TimeStamp, Comment) VALUES("+userid+","+postid+",NOW(), \""+comment+"\"", function (err, result, fields) {
			if(err) throw err;
			console.log(result);
		})
	}

	static getUserInfo(userid){
		return new Promise(async (resolve,reject) =>{
				try{
					db.query("SELECT Name, Username, Email FROM User WHERE UserID = " + userid, function (err, result, fields) {
						if(err) reject(err);
						else{
							resolve(result)
						}
					})
				}catch(e){
					reject(e)
				}


		})
	}

	static getUserPosts(userid){
		return new Promise(async (resolve,reject) =>{
				try{
					db.query("SELECT UserID, PostID, Name, Username, TimeStamp, Post FROM (Select User.UserID, PostID, Name, Username, TimeStamp, Post FROM User, Post WHERE User.UserID = Post.UserID) AS J WHERE J.UserID = " + userid, function (err, result, fields) {
						if(err) reject(err);
						else{
							resolve(result)
						}
					})
				}catch(e){
					reject(e)
				}


		})
	}

	static getFollows(userid){
		return new Promise(async (resolve,reject) =>{
				try{
					db.query("SELECT Name, Username, UserID FROM Follows, User WHERE User.UserID = UserID2 AND Follows.UserID1 =  "+userid, function (err, result, fields) {
						if(err) reject(err);
						else{
							resolve(result)
						}
					})
				}catch(e){
					reject(e)
				}


		})
	}

	static getFollowed(userid){
		return new Promise(async (resolve,reject) =>{
				try{
					db.query("SELECT Name, Username, UserID FROM Follows, User WHERE User.UserID = UserID1 AND Follows.UserID2 =  "+userid, function (err, result, fields) {
						if(err) reject(err);
						else{
							resolve(result)
						}
					})
				}catch(e){
					reject(e)
				}


		})
	}

	static getFollowsPosts(userid){
		return new Promise(async (resolve,reject) =>{
				try{
					db.query("Select F.UserID, PostID, Name, Username, TimeStamp, Post FROM (SELECT Name, Username, UserID FROM Follows, User WHERE User.UserID = UserID2 AND Follows.UserID1 =  "+userid+" ) AS F, Post WHERE F.UserID = Post.UserID", function (err, result, fields) {
						if(err) reject(err);
						else{
							resolve(result)
						}
					})
				}catch(e){
					reject(e)
				}


		})
	}

	static setFollows(follower, follow){
		return new Promise(async (resolve,reject) =>{
				try{
					db.query("INSERT INTO Follows(UserID1, UserID2) VALUES("+follower+", "+follow+")",  function (err, result, fields) {
						if(err) reject(err);
						else{
							resolve(result)
						}
					})
				}catch(e){
					reject(e)
				}


		})
	}

	static getPostComments(postid){
		return new Promise(async (resolve,reject) =>{
				try{
					db.query("SELECT C.UserID, Name, Username, C.TimeStamp, Comment FROM (SELECT User.UserID, Name, Username, PostID, TimeStamp, Comment FROM User, Comment WHERE User.UserID = Comment.UserID AND Comment.PostID = "+postid+") AS C, Post WHERE Post.PostID = C.PostID", function (err, result, fields) {
						if(err) reject(err);
						else{
							resolve(result)
						}
					})
				}catch(e){
					reject(e)
				}


		})
	}

	static getRestReviews(userid){
		return new Promise(async (resolve,reject) =>{
				try{
					 db.query("SELECT UserCID as UserID, Description, Rating, R.ItemID AS ItemID, Picture, R.Name AS RName, Username, MenuItem.Name AS MName FROM (SELECT UserCID, Description, Rating, ItemID, Picture, Name, Username, UserRID FROM User, Review WHERE User.UserID = Review.UserCID) AS R, MenuItem WHERE R.ItemID = MenuItem.ItemID AND R.UserRID = "+ userid, function (err, result, fields) {
						if(err) reject(err);
						else{
							resolve(result)
						}
					})
				}catch(e){
					reject(e)
				}


		})
	}

	static getUserReviews(userid){
		return new Promise(async (resolve,reject) =>{
				try{
					 db.query("SELECT UserRID as UserID, Description, Rating, R.ItemID AS ItemID, Picture, R.Name AS RName, Username, MenuItem.Name AS MName FROM (SELECT UserCID, Description, Rating, ItemID, Picture, Name, Username, UserRID FROM User, Review WHERE User.UserID = Review.UserRID) AS R, MenuItem WHERE R.ItemID = MenuItem.ItemID AND R.UserCID = "+ userid, function (err, result, fields) {
						if(err) reject(err);
						else{
							resolve(result)
						}
					})
				}catch(e){
					reject(e)
				}


		})
	}

	static isRestaurant(userid){
		return new Promise(async (resolve,reject) =>{
				try{
					 db.query("SELECT UserID FROM Restaurant WHERE UserID = "+ userid, function (err, result, fields) {
						if(err) reject(err);
						else{
							resolve(result)
						}
					})
				}catch(e){
					reject(e)
				}


		})
	}

	static getRestMenu(userid){
		return new Promise(async (resolve,reject) =>{
				try{
					 db.query("SELECT * FROM MenuItem WHERE MenuItem.UserID = "+userid, function (err, result, fields) {
						if(err) reject(err);
						else{
							resolve(result)
						}
					})
				}catch(e){
					reject(e)
				}


		})
	}

	static getMenuItemRest(itemid){
		return db.query("SELECT Restaurant.UserID, Restaurant.Name, Restaurant.Style, Username, Address FROM (SELECT User.UserID, Name, Username, Email, Style, Address FROM Restaurant, User WHERE Restaurant.UserID = User.UserID) AS Restaurant, MenuItem WHERE Restaurant.UserID = MenuItem.UserID AND MenuItem.ItemID =" + itemid, function (err, result, fields) {
			if(err) throw err;
			console.log(result);
		})
	}

	static searchStyleRestaurant(style){
		return db.query("SELECT DISTINCT * FROM (SELECT User.UserID, Name, Username, Email, Style, Address FROM Restaurant, User WHERE Restaurant.UserID = User.UserID) AS R WHERE Style = \"" + style + "\"", function (err, result, fields) {
			if(err) throw err;
			console.log(result);
		})
	}

	static searchStyleMenu(style){
		return db.query("SELECT DISTINCT * FROM MenuItem WHERE Style = \"" + style + "\"", function (err, result, fields) {
			if(err) throw err;
			console.log(result);
		})
	}

	static searchRestaurantName(name){
		return db.query("SELECT DISTINCT * FROM (SELECT User.UserID, Name, Username, Email, Style, Address FROM Restaurant, User WHERE Restaurant.UserID = User.UserID) AS R WHERE Name LIKE \"" + name + "\"", function (err, result, fields) {
			if(err) throw err;
			console.log(result);
		})
	}

	static searchMenuName(name){
		return db.query("SELECT DISTINCT * FROM MenuItem WHERE Name LIKE \"" + name + "\"", function (err, result, fields) {
			if(err) throw err;
			console.log(result);
		})
	}

	static searchUserName(name){
		return new Promise(async (resolve,reject) =>{
				try{
					 db.query("SELECT DISTINCT * FROM User WHERE Name LIKE \"" + name + "\"", function (err, result, fields) {
						if(err) reject(err);
						else{
							resolve(result)
						}
					})
				}catch(e){
					reject(e)
				}


		})
	}

	static searchUserUsername(name){
		return db.query("SELECT DISTINCT * FROM User WHERE Username LIKE \"" + name + "\"", function (err, result, fields) {
			if(err) throw err;
			console.log(result);
		})
	}

	static searchAddress(address){
		return db.query("SELECT DISTINCT * FROM (SELECT User.UserID, Name, Username, Email FROM Restaurant, User WHERE Restaurant.UserID = User.UserID) AS R WHERE Name LIKE \"" + name + "\"", function (err, result, fields) {
			if(err) throw err;
			console.log(result);
		})
	}


	//static registerUser(username, password,
}

module.exports =  SQL;
