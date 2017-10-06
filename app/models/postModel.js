const db = require('../../config/db');

function listPosts(done){
	let sql = "Select * FROM post"
	db.getPool().query(sql, (err, results, fields)=>{
		if(err) {
			return done({"Error": "List all posts error"});
		}
		return done(results);
	});
}


function singlePost(values, done){
	let id = db.getPool().escape(req.params.postId);
	let sql = "SELECT * FROM post WHERE post_id ="+id;
	
	db.getPool().query(sql,[values],(err,results,fields)=>{
		if(err){
			return done({"Error": "Get signle post error: "+err});
		}
		return done(results);
	});
}


/**
* Rquire boty post name and user id to create new post
* Check if user exists before insert new post
*/
function createPost(values, done){
	let postName = values.post_name;
	let userId = values.user_id;

	if(!postName || !userId)
	{
		done({"Error": "Post name and user id required"});

	}else{
		
		isUserExist(userId, function(result){
			if(result){
				insertPost(values, done);
			}
			else{
				done({"Error":"User not found, cannot create post"});
			}
		});
	}
}


function updatePost(values, done){
	let sql = "UPDATE post SET ? WHERE post_id = ?";
	
	db.getPool().query(sql,[values],(err,results,fields)=>{
		if(err){
			return done({"Error":"Update post error"+err});
		}else{
			done(results);
		}
	});
}


function deletePost(values, done){
	let sql = "DELETE FROM post WHERE post_id =?";

	db.getPool().query(sql, [values], (err,results,fields)=>{
		if(err){
			return done({"Error":"Delete post error"+err});
		}
		else if(results.affectedRows <1){
			done({"Result":"No post found for deleting"});
		}else{
			done(results);			
		}
	});
}


function isEmptyObj(obj){
    return (Object.getOwnPropertyNames(obj).length === 0);
}


/**
* If user found, execute 'next'
*/
function isUserExist(id, next){
	db.getPool().query("SELECT * FROM user WHERE user_id =?", [id], (err,results,fields)=>{
			let isExist = results.length < 1 ? false:true;
			next(isExist);
	});
}


function insertPost(values, done){
	let sql = "INSERT INTO post SET ?";
	db.getPool().query(sql,[values],(err,results,fields)=>{
		if(err){
		 done({"Error": "Insert post error"});
		}
		else{
			done(results)
		}
	});
}



module.exports = {
	ListPosts : listPosts,
	SinglePost: singlePost,
	CreatePost: createPost,
	UpdatePost: updatePost,
	DeletePost: deletePost
};