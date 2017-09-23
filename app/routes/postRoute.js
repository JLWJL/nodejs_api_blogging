'use strict';
const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();


router.route('/')
	.get(postController.ListPosts)
	.post(postController.CreatePost);
	

router.route('/:postId')
	.get(postController.SinglePost)
	.put(postController.UpdatePost)
	.delete(postController.DeletePost);




module.exports = router;

