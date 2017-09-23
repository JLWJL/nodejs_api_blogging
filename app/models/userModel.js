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
			return done({"Error":"Update user error"+err});
		}else{
			done(results);
		}
	});
}

function deleteUser(values, done){
	let sql = "DELETE FROM user WHERE user_id = ?";

	db.getPool().query(sql, values, (err,results,fields)=>{
		if(err){
			return done({"Error":"Delete user error"+err});
		}else{
			done(results);
		}
	});
}

function followUser(values, done){
	let sql = "INSERT INTO following SET ?"

	db.getPool().query(sql, values, (err,results,fields)=>{
		if(err){
			return done({"Error":"Build following error "+err});
		}else{
			done(results);
		}
	});
}

function unFollowUser(values, done){

	let sql = "DELETE FROM following WHERE follow_id = ? AND followed_id =?";

	db.getPool().query(sql, values, (err,results,fields)=>{
		if(err){
			return done({"Error":"Delete following error "+err});
		}else{
			results.message = "Delete following done";
			done(results);
		}
	});
}

function listAllFollowing(done){
	let sql = "SELECT * FROM following";

	db.getPool().query(sql, (err,results,fields)=>{
		if(err){
			return done({"Error":"List all following connections error "+err});
		}else{
			results.message = "List all following connections done";
			done(results)
		}
	});
}


function listUserFollowing(values, done){
	let sql = "SELECT * FROM following WHERE follow_id = ?";
	db.getPool().query(sql, values, (err,results,fields)=>{
		if(err){
			return done({"Error":"List user following error "+err});
		}else{
			results.message = "List user's following list done";
			done(results);
		}
	});
}


function followerPost(values, done) {
	let sql = "SELECT post_id, post_name FROM post INNER JOIN following on (post.user_id = following.followed_id) WHERE following.follow_id = ?";

	db.getPool().query(sql, values, (err,results,fields)=>{
		if(err){
			return done({"Error":"List user following's post error: "+err});
		}else{
			results.message = "List user following's post done";
			done(results)
		}
	});
}


function likePost(values, done){
	let sql = "INSERT INTO post_liked (`post_id`, `user_id`) VALUES(?,?)";

	db.getPool().query(sql, values, (err,results,fields)=>{
		if(err){
			return done({"Error":"Adding user's liked post error: "+err});
		}else{
			done(results);
		}
	});
}

function listLikedPost(values, done) {
	let sql = `SELECT post_liked.post_id, post_name 
						FROM post_liked, post 
						WHERE post_liked.post_id = post.post_id
						AND post_liked.user_id = ?`;

	db.getPool().query(sql, values, (err,results,fields)=>{
		if(err){
			return done({"Error":"List user's liked post error: "+err});
		}else{
			results.message = "List user's liked post done";
			done(results)
		}
	});
}


module.exports = {
	getAll   : getAll,
	singleUser  : singleUser,
	createUser  : createUser,
	updateUser  : updateUser,
	deleteUser  : deleteUser,
	followUser  : followUser,
	unFollowUser: unFollowUser,
	listAllFollowing: listAllFollowing,
	listUserFollowing: listUserFollowing,
	followerPost: followerPost,
	likePost: likePost,
	listLikedPost:listLikedPost

};