'use strict';
const postController = require('../controllers/postContrller');
const router = require('router');


router.route('/')
	.get(postContrller.ListPosts);
	

router.route('/:userId')
	.get(postContrller.SinglePost)
	.put(postContrller.UpdatePost)
	.delete(postContrller.DeletePost);




module.exports = router;

