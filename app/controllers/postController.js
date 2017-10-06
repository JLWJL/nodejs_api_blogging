const Post = require('../models/postModel');

function listPosts(req,res){
	Post.ListPosts((results)=>{
		res.json(results);
	});
}


function singlePost(req,res){
	let id = pool.escape(req.params.postId);
	Post.SinglePost(id, (results)=>{
		if(results.length==0){
			res.send(results);
		}else{
			res.json(results);
		}
	});
}


/**
* Rquire boty post name and user id to create new post
* Check if user exists before insert new post
*/
function createPost(req,res){
	
	Post.CreatePost(req.body, function(result){
		if(result.Error){
			res.status(400).send(result);
		}else{
			res.status(201).json(result);
		}
	});
}


function updatePost(req,res){

	if(!isEmptyObj(req.body)){
		
		let values = [
			req.body,
			req.params.post_id
		]
		
		Post.UpdatePost(values, (result)=>{
			res.json(result);
		});

	}
	else{
		res.json({result:"Nothing has been updated"});
	}

}


function deletePost(req,res){
	let id = req.params.postId;
	Post.DeletePost(id, (results)=>{
		res.json(result);
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