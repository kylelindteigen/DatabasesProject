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

	static getfollows(customerid){

	}
	//static registerUser(username, password,
}

module.exports =  SQL;
