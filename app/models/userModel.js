const db = require('../../config/db');


function getAll(values, done){
	let sql = "Select * FROM user"

	db.getPool().query(sql,(err, results, fields)=>{
		if(err) {
			return done({"Error": "List all users error"});
		}
		return done(results);
		
	});
}

function singleUser(values, done){
	let sql = "SELECT * FROM user WHERE user_id = ?";

	db.getPool().query(sql, [values], (err, results, fields)=>{
		if(err) {
			return done({"Error": "Get signle user error: "+err});
		}
		return done(results);
	});
}

function createUser(values, done){
	
	let sql = "INSERT INTO user SET ?";
	db.getPool().query(sql,[values],(err,results,fields)=>{
		if(err){
		 	return done({"Error":"Create user error: "+err});
		}
		else{
			done(results);
		}
	});
}

function updateUser(values, done){
	let sql = "UPDATE user SET ? WHERE user_id = ?";

	db.getPool().query(sql, values, (err,results,fields)=>{
		if(err){
			return done({"Error":"Update user errL "+err});
		}else{
			done(results);
		}
	});
}



module.exports = {
	getAll   : getAll,
	singleUser  : singleUser,
	createUser  : createUser,
	updateUser  : updateUser,
	// DeleteUser  : deleteUser,
	// FollowUser  : followUser,
	// UnFollowUser: unFollowUser,
	// ListAllFollowing: listAllFollowing,
	// ListUserFollowing: listUserFollowing,
	// FollowerPost: followerPost,
	// LikePost: likePost,
	// ListLikedPost:listLikedPost

};