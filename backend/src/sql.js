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

	static getcustposts(customerid){
		return db.query("SELECT P.CustomerID, P.PostID, Name, TimeStamp, Post FROM (SELECT P.PostID, Customer.CustomerID, Name, TimeStamp, Post FROM (SELECT Post.PostID, CustomerID, TimeStamp, Post FROM CustPost LEFT OUTER JOIN Post ON Post.PostID = CustPost.PostID) AS P LEFT OUTER JOIN Customer ON P.CustomerID = Customer.CustomerID) AS P, (SELECT CustomerID2 AS CustomerID FROM CustFollowsCust WHERE CustomerID1 = " + customerid + ") AS F WHERE F.CustomerID = P.CustomerID", function (err, result, fields) {
			if(err) throw err;
			console.log(result);
		})
	}

	static getrestposts(customerid){
		return db.query("SELECT P.RestaurantID, P.PostID, Name, TimeStamp, Post FROM (SELECT P.PostID, Restaurant.RestaurantID, Name, TimeStamp, Post FROM (SELECT Post.PostID, RestaurantID, TimeStamp, Post FROM RestPost LEFT OUTER JOIN Post ON Post.PostID = RestPost.PostID) AS P LEFT OUTER JOIN Restaurant ON P.RestaurantID = Restaurant.RestaurantID) AS P, (SELECT RestaurantID FROM CustFollowsRest WHERE CustomerID = "+ customerid +") AS F WHERE F.RestaurantID = P.RestaurantID", function (err, result, fields) {
			if(err) throw err;
			console.log(result);
		})
	}

	static getuserposts(customerid){
		return db.query("SELECT P.PostID, Name, TimeStamp, Post FROM (SELECT P.PostID, Customer.CustomerID, Name, TimeStamp, Post FROM (SELECT Post.PostID, CustomerID, TimeStamp, Post FROM CustPost LEFT OUTER JOIN Post ON Post.PostID = CustPost.PostID) AS P LEFT OUTER JOIN Customer ON P.CustomerID = Customer.CustomerID) AS P WHERE P.CustomerID = " + customerid, function (err, result, fields) {
			if(err) throw err;
			console.log(result);
		})
	}

	static getrestposts(customerid){
		return db.query("SELECT P.RestaurantID, P.PostID, Name, TimeStamp, Post FROM (SELECT P.PostID, Restaurant.RestaurantID, Name, TimeStamp, Post FROM (SELECT Post.PostID, RestaurantID, TimeStamp, Post FROM RestPost LEFT OUTER JOIN Post ON Post.PostID = RestPost.PostID) AS P LEFT OUTER JOIN Restaurant ON P.RestaurantID = Restaurant.RestaurantID) AS P WHERE P.RestaurantID = " + customerid, function (err, result, fields) {
			if(err) throw err;
			console.log(result);
		})
	}

	static getrestreview(restaurantid){
		return db.query("SELECT P.PostID, Name, TimeStamp, Post FROM (SELECT P.PostID, Customer.CustomerID, Name, TimeStamp, Post FROM (SELECT Post.PostID, CustomerID, TimeStamp, Post FROM CustPost LEFT OUTER JOIN Post ON Post.PostID = CustPost.PostID) AS P LEFT OUTER JOIN Customer ON P.CustomerID = Customer.CustomerID) AS P WHERE P.CustomerID = " + customerid, function (err, result, fields) {
			if(err) throw err;
			console.log(result);
		})
	}
	//static registerUser(username, password,
}

module.exports =  SQL;
