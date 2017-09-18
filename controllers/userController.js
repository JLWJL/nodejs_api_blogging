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
			res.status(500).send("Error - single user: "+err);
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
	let userName = req.query.user_name;
	let sql = "INSERT INTO user (`user_name`) VALUES (?)";
	pool.query(sql,[userName],(err,results,fields)=>{
		if(err){
		 res.status(500).send(err);
		}
		else{
			res.status(200).send("User created")
		}
	});
}


function updateUser(req,res){
	if(!isEmptyObj(req.query)){
		let id  = req.params.userId;
		let sql = "UPDATE user SET ? WHERE user_id = ?";
		console.log("Request.query: ", req.query);
		console.log("ID: ", id);
		pool.query(sql,[req.query, id],(err,results,fields)=>{
			if(err){
				res.status(500).send(err);
			}else{
				res.status(200).send("User updated");
			}

		});
	}
	else{
		res.json({result:"Nothing has been updated"});
	}
}


function deleteUser(req,res){
	let id = req.params.userId;
	let sql = "DELETE FROM user WHERE user_id =?";

	pool.query(sql, [id], (err,results,fields)=>{
		if(err){
			res.status(500).send("Error when deleting: "+err);
		}
		else{
			results.message = "Delete done";
			res.status(200).json(results)
		}
	});

}


function isEmptyObj(obj){
    return (Object.getOwnPropertyNames(obj).length === 0);
}





module.exports = {
	ListUsers : listUsers,
	SingleUser: singleUser,
	CreateUser: createUser,
	UpdateUser: updateUser,
	DeleteUser: deleteUser

};