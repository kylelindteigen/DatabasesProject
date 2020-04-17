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

	static login(username, password){
		return db.query("SELECT * FROM Customer WHERE Customer.Username = \"" + username +"\" AND Customer.Password = PASSWORD(\"" + password + "\")", function (err, result, fields) {
			if(err) throw err;
			console.log(result);
		})
	}

	static createUser(username, name, email, password){
		return db.query("INSERT INTO User(Username, Name, Email, Password) VALUES(\""+username+"\", \""+name+"\", \""+email+"\", PASSWORD(\""+password+"\"))", function (err, result, fields) {
			if(err) throw err;
			console.log(result);
		});
	}

	static createRestUser(username, name, email, password, style, address){
		let x = db.query("INSERT INTO User(Username, Name, Email, Password) VALUES(\""+username+"\", \""+name+"\", \""+email+"\", PASSWORD(\""+password+"\"))", function (err, result, fields) {
			if(err) throw err;
			console.log(result);
		});

		let y = db.query("INSERT INTO Restaurant(UserID, Style, Address) VALUES(\""+x.InsertedID +"\", \""+style+"\", \""+address+"\")", function (err, result, fields) {
			if(err) throw err;
			console.log(result);
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

	static getUserPosts(userid){
		return db.query("SELECT UserID, PostID, Name, Username, TimeStamp, Post FROM (Select User.UserID, PostID, Name, Username, TimeStamp, Post FROM User LEFT OUTER JOIN Post ON User.UserID = Post.UserID) AS J WHERE J.UserID = " + userid, function (err, result, fields) {
			if(err) throw err;
			console.log(result);
		})
	}

	static getFollowsPosts(userid){
		return db.query("Select F.UserID, PostID, Name, Username, TimeStamp, Post FROM (SELECT Name, Username, UserID FROM Follows RIGHT OUTER JOIN User ON User.UserID = UserID2 WHERE Follows.UserID1 =  "+userid+") AS F, Post WHERE F.UserID = Post.UserID ", function (err, result, fields) {
			if(err) throw err;
			console.log(result);
		})
	}

	static getPostComments(postid){
		return db.query("SELECT C.UserID, Name, Username, C.TimeStamp, Comment FROM (SELECT User.UserID, Name, Username, PostID, TimeStamp, Comment FROM User LEFT OUTER JOIN Comment ON User.UserID = Comment.UserID WHERE Comment.PostID = "+postid+") AS C, Post WHERE Post.PostID = C.PostID", function (err, result, fields) {
			if(err) throw err;
			console.log(result);
		})
	}

	static getRestReviews(userid){
		return db.query("SELECT UserCID, UName, Username, Description, Rating, ItemID, Picture, MName FROM Restaurant, (SELECT UserCID, UserRID, Description, Rating, R.ItemID AS ItemID, Picture, R.Name AS UName, Username, MenuItem.Name AS MName FROM (SELECT UserCID, Description, Rating, ItemID, Picture, Name, Username, UserRID FROM User LEFT OUTER JOIN Review ON User.UserID = Review.UserCID) AS R LEFT OUTER JOIN MenuItem ON  R.ItemID = MenuItem.ItemID) AS Review WHERE Restaurant.UserID = "+ userid +" AND Review.UserRID = "+ userid, function (err, result, fields) {
			if(err) throw err;
			console.log(result);
		})
	}

	static getRestMenu(userid){
		return db.query("SELECT * FROM MenuItem WHERE MenuItem.UserID = "+userid, function (err, result, fields) {
			if(err) throw err;
			console.log(result);
		})
	}

	static getMenuItemRest(itemid){
		return db.query("SELECT Restaurant.UserID, Restaurant.Name, Restaurant.Style, Username, Address FROM (SELECT User.UserID, Name, Username, Email, Style, Address FROM Restaurant LEFT OUTER JOIN User ON Restaurant.UserID = User.UserID) AS Restaurant, MenuItem WHERE Restaurant.UserID = MenuItem.UserID AND MenuItem.ItemID =" + itemid, function (err, result, fields) {
			if(err) throw err;
			console.log(result);
		})
	}

	static searchStyleRestaurant(style){
		return db.query("SELECT DISTINCT * FROM (SELECT User.UserID, Name, Username, Email, Style, Address FROM Restaurant LEFT OUTER JOIN User ON Restaurant.UserID = User.UserID) AS R WHERE Style = \"" + style + "\"", function (err, result, fields) {
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
		return db.query("SELECT DISTINCT * FROM (SELECT User.UserID, Name, Username, Email, Style, Address FROM Restaurant LEFT OUTER JOIN User ON Restaurant.UserID = User.UserID) AS R WHERE Name LIKE \"" + name + "\"", function (err, result, fields) {
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
		return db.query("SELECT DISTINCT * FROM User WHERE Name LIKE \"" + name + "\"", function (err, result, fields) {
			if(err) throw err;
			console.log(result);
		})
	}

	static searchUserUsername(name){
		return db.query("SELECT DISTINCT * FROM User WHERE Username LIKE \"" + name + "\"", function (err, result, fields) {
			if(err) throw err;
			console.log(result);
		})
	}

	static searchAddress(address){
		return db.query("SELECT DISTINCT * FROM (SELECT User.UserID, Name, Username, Email FROM Restaurant LEFT OUTER JOIN User ON Restaurant.UserID = User.UserID) AS R WHERE Name LIKE \"" + name + "\"", function (err, result, fields) {
			if(err) throw err;
			console.log(result);
		})
	}


	//static registerUser(username, password,
}

module.exports =  SQL;
