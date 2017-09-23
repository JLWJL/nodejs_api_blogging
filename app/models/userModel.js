const db = require('../../config/db');


function getAll(done){
	let sql = "Select * FROM user"

	db.getPool().query(sql,(err, results, fields)=>{
		if(err) {
			return done({"Error": "List all users error"});
		}
		return done(results);
		
	});
}







module.exports = {
	getAll   : getAll,
	// SingleUser  : singleUser,
	// CreateUser  : createUser,
	// UpdateUser  : updateUser,
	// DeleteUser  : deleteUser,
	// FollowUser  : followUser,
	// UnFollowUser: unFollowUser,
	// ListAllFollowing: listAllFollowing,
	// ListUserFollowing: listUserFollowing,
	// FollowerPost: followerPost,
	// LikePost: likePost,
	// ListLikedPost:listLikedPost

};