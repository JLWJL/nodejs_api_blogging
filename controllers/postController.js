const mysql = require('mysql');
const pool = mysql.createPool({
				connectionLimit	: 100,
				host						: 'localhost',
				user						: 'root',
				password				: '',
				database				: 'blogging'
			});


function listPosts(req,res){
	let sql = "Select * FROM post"
	pool.query(sql, (err, results, fields)=>{
		if(err) {
			console.log("Error when List all posts");
			res.send(err);
			return;
		}
		else if(results!==null){
			console.log("All posts sent");
			res.json(results);
		}
	});
}


function singlePost(req,res){
	let id = pool.escape(req.params.postId);
	let sql = "SELECT * FROM post WHERE post_id ="+id;
	
	pool.query(sql,(err,results,fields)=>{
		if(err){
			res.status(500).send("Error when get single post: "+err);
		}
		else if(results.length==0){
			res.send("Post doesn't exist");
		}else{
			console.log("Result: ", results);
			res.json(results);
		}
	});
}


/**
* Rquire boty post name and user id to create new post
* Check if user exists before insert new post
*/
function createPost(req,res){
	let postName = req.query.post_name;
	let userId = req.query.user_id;

	if(!postName || !userId)
	{
		res.status(400).send("Post name and user id required");

	}else{
		
		isUserExist(userId, function(result){
			if(result){
				insertPost(req,res);
			}
			else{
				res.status(400).send("User not found, can't create post");
			}
		});
	}
}


function updatePost(req,res){
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


function deletePost(req,res){
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


/**
* If user found, execute 'next'
*/
function isUserExist(id, next){
	pool.query("SELECT * FROM user WHERE user_id =?", [id], (err,results,fields)=>{
			
			let isExist = results.length < 1 ? false:true;
			console.log("What is nt: ",typeof nt);

			next(isExist);
	});
}

function insertPost(req,res){
	let sql = "INSERT INTO post SET ?";
	pool.query(sql,[req.query],(err,results,fields)=>{
		if(err){
		 res.status(500).send(err);
		}
		else{
			res.status(200).send("Post created")
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