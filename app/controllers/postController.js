const Post = require('../models/postModel');

function listPosts(req,res,next){
	Post.ListPosts((err, results)=>{
		if(err){
			next(err)
		}else{
			res.json(results);
		}
	});
}


function singlePost(req,res,next){
	
	Post.SinglePost(req.id, (err, results)=>{
		if(err){
			console.log("Got next()",err);
			next(err);
		}else{
			res.status(200).json(results);
		}
	});
}


/**
* Rquire boty post name and user id to create new post
* Check if user exists before insert new post
*/
function createPost(req,res, next){
	
	Post.CreatePost(req.body, function(err, result){
		if(err){
			next(err);
		}else{
			res.status(201).json(result);
		}
	});
}


function updatePost(req,res, next){

	if(!isEmptyObj(req.body)){
		
		let values = [
			req.body,
			req.params.post_id
		]
		
		Post.UpdatePost(values, (err, result)=>{
			res.json(result);
		});

	}
	else{
		next({
			"message":"Nothing has been updated",
			"status":400
		});
	}

}


function deletePost(req,res, next){
	let id = req.params.postId;
	Post.DeletePost(id, (err, results)=>{
		if(err){
			next(err)
		}else{
			res.status(200).json(results);
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
			next(isExist);
	});
}


function insertPost(req,res){
	let sql = "INSERT INTO post SET ?";
	pool.query(sql,[req.body],(err,results,fields)=>{
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