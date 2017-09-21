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
	let userName = req.body.user_name;
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
	if(!isEmptyObj(req.body)){
		let id  = req.params.userId;
		let sql = "UPDATE user SET ? WHERE user_id = ?";
		console.log("Request.query: ", req.body);
		console.log("ID: ", id);
		pool.query(sql,[req.body, id],(err,results,fields)=>{
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


function followUser(req,res){
	let follow = req.params.follow_id;
	let followed = req.params.followed_id;

	if(follow && followed && (follow !== followed)){
		let sql = "INSERT INTO following SET ?"

		pool.query(sql, [req.params], (err,results, fields)=>{
			if(err){
				res.status(500).send("Error when building user following connection: "+err);				
			}else{
				results.message = "Follow done";
				res.status(200).send(results);
			}

		});

	}
	else{
		res.status(400).send("Need two different user id")
	}
}


function unFollowUser(req,res){
	let follow = req.params.follow_id;
	let followed = req.params.followed_id;

	if(follow && followed && (follow !== followed)){
		let sql = "DELETE FROM following WHERE follow_id = ? AND followed_id =?";

		pool.query(sql, [follow, followed], (err,results, fields)=>{
			if(err){
				res.status(500).send("Error when deleting user following connection: "+err);				
			}else{
				results.message = "Unfollow done";
				res.status(200).send(results);
			}
		});
	}
	else{
		res.status(400).send("Need two different user id")
	}
}


function listAllFollowing(req, res){
	let sql = "SELECT * FROM following"
	pool.query(sql, (err,results,fields)=>{
		if(err){
			res.status(500).send("Error when listing all user following connections: "+err);				
		}else{
			results.message = "List all user following connections done";
			res.status(200).json(results);
		}
	});
}


function listUserFollowing(req, res){
	let follow_id = req.params.userId;
	let sql = "SELECT * FROM following WHERE follow_id = ?"
	pool.query(sql, [follow_id], (err,results,fields)=>{
		if(err){
			res.status(500).send("Error when listing the user following list: "+err);				
		}else{
			results.message = "List user's following list done";
			res.status(200).json(results);
		}
	});
}



function isEmptyObj(obj){
    return (Object.getOwnPropertyNames(obj).length === 0);
}



module.exports = {
	ListUsers   : listUsers,
	SingleUser  : singleUser,
	CreateUser  : createUser,
	UpdateUser  : updateUser,
	DeleteUser  : deleteUser,
	FollowUser  : followUser,
	UnFollowUser: unFollowUser,
	ListAllFollowing: listAllFollowing,
	ListUserFollowing: listUserFollowing

};