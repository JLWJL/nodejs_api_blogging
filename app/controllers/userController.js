const mysql = require('mysql');
const pool = mysql.createPool({
				connectionLimit	: 100,
				host						: 'localhost',
				user						: 'root',
				password				: '',
				database				: 'blogging'
			});

const User = require ('../models/userModel');




function listUsers(req,res){
	User.getAll(null, (results)=>{
		res.json(results);
	});
}


function singleUser(req,res){
	let id = req.params.userId;
	User.singleUser(id, (results)=>{
		if(results.length==0){
			res.send("User not found");
		}else{
			res.json(results);
		}
	});
}


function createUser(req,res){
	
	User.createUser(req.body, function(result){
		res.json (result);
	});
}


function updateUser(req,res){

	if(!isEmptyObj(req.body)){
		
		let values = [
			req.body,
			req.params.userId
		]
		
		User.updateUser(values, (result)=>{
			res.json(result);
		});

	}
	else{
		res.json({result:"Nothing has been updated"});
	}
}


function deleteUser(req,res){
	let id = req.params.userId;
	
	User.deleteUser(id, (result)=>{
		res.json(result);
	});
}


function followUser(req,res){
	let follow = req.params.follow_id;
	let followed = req.params.followed_id;

	if(follow && followed && (follow !== followed)){

		User.followUser([req.params], (result)=>{
			res.status(200).send(result);
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

		User.unFollowUser([follow,followed],(result)=>{
			res.status(200).send(result);
		});
	}
	else{
		res.status(400).send("Need two different user id")
	}
}


function listAllFollowing(req, res){

	User.listAllFollowing((results)=>{
		res.json(results);
	});

}


function listUserFollowing(req, res){
	let follow_id = req.params.userId;

	User.listUserFollowing(follow_id, (results)=>{
		res.json(results);
	});

}

function followerPost(req,res){
	let user_id = req.params.userId;

	User.followerPost(user_id, (results)=>{
		res.json(results);
	});
}


/*
* GET:
* List all liked posts of an user
*/
function listLikedPost(req, res){
	let user_id = req.params.userId;
	let sql = `SELECT post_liked.post_id, post_name 
						FROM post_liked, post 
						WHERE post_liked.post_id = post.post_id
						AND post_liked.user_id = ?`;

	User.listLikedPost(user_id, (results)=>{
		res.json(results);
	});

}



/*
* POST:
* User like a post
*/
function likePost(req,res){
	let user_id = req.params.userId;
	let post_id = req.body.postId;

	if(user_id && post_id){
		User.likePost([post_id, user_id], (results)=>{
			res.json(results);
		});
	}
	else{
		res.status(400).send("Need user id and post id");
	}
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
	ListUserFollowing: listUserFollowing,
	FollowerPost: followerPost,
	LikePost: likePost,
	ListLikedPost:listLikedPost

};