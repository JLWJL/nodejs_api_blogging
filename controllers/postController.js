const mysql = require('mysql');
const pool = mysql.createPool({
				connectionLimit	: 100,
				host						: 'localhost',
				user						: 'root',
				password				: '',
				database				: 'blogging'
			});


function listPosts(req,res){

}


function singlePost(req,res){
	
}


function createPost(req,res){
	
}


function updatePost(req,res){
	
}


function deletePost(req,res){
	
}




module.exports = {

};