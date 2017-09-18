const mysql = require('mysql');
const pool = mysql.createPool({
				connectionLimit	: 100,
				host						: 'localhost',
				user						: 'root',
				password				: '',
				database				: 'blogging'
			});

function listUsers(req,res){
	let sql = "Select * FROM user"
	pool.query(sql, (err, results, fields)=>{
		if(err) {
			console.log("Error: List all users");
			res.send(err);
			return;
		}
		else if(results!==null){
			console.log("All users sent");
			res.json(results);
		}
	});
}


function singleUser(req,res){
	let id = pool.escape(req.params.userId);
	let sql = "SELECT * FROM user WHERE user_id ="+id;
	console.log("SQL: ",sql);
	pool.query(sql,(err,results,fields)=>{
		if(err){
			res.status(400).send("Error - single user: "+err);
		}
		else if(results.length==0){
			res.send("User doesn't exist");
		}else{
			console.log("Result: ", results);
			res.json(results);
		}
	});
}


function createUser(req,res){
	
}


function updateUser(req,res){
	
}


function deleteUser(req,res){
	
}




module.exports = {
	ListUsers: listUsers,
	SingleUser: singleUser

};