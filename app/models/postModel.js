const db = require('../../config/db');

function listPosts(done){
	let sql = "Select * FROM post"
	db.getPool().query(sql, (err, results, fields)=>{
		if(err) {
			return done({
				"message": err.code,
				"status" : 500 
			}, null);
		}
		return done(null,results);
	});
}


function singlePost(values, done){
	let id = db.getPool().escape(values);
	let sql = "SELECT * FROM post WHERE post_id ="+id;
	
	db.getPool().query(sql,[values],(err,results,fields)=>{
		if(err){
			let error = {"message":err.code,"status":500};
			return done(error, results);
		}else{
			return done(err, results);
		}
		
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
		return done({
			"message": "Post name and user id required",
			"status" : 400
		}, null);

	}else{
		
		isUserExist(userId, function(err,result){
			if(err){
				done(err,null)
			}
			else if(result){
				insertPost(values, done);
			}
			else{
				done({
					"message":"User not found, cannot create post",
					"status": 400
				},null);
			}
		});
	}
}


function updatePost(values, done){
	let sql = "UPDATE post SET ? WHERE post_id = ?";
	
	db.getPool().query(sql,[values],(err,results,fields)=>{
		if(err){
			return done({
				"message":err.code,
				"status":500
			}, null);
		}else{
			done(err, results);
		}
	});
}


function deletePost(values, done){
	let sql = "DELETE FROM post WHERE post_id =?";

	db.getPool().query(sql, [values], (err,results,fields)=>{
		if(err){
			return done({
				"message":err.code,
				"status":500
			},null);
		}
		else{
			done(err,results);			
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
			if(err){
				next({
					"message":err.code,
					"status": 500
				},
				 null)	;		
			}
			let isExist = results.length < 1 ? false:true;
			next(null, isExist);
	});
}


function insertPost(values, done){
	let sql = "INSERT INTO post SET ?";
	db.getPool().query(sql,[values],(err,results,fields)=>{
		if(err){
		 done({
		 	"message": err.code,
			"status": 500
		 }, null);
		}
		else{
			done(null,results)
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