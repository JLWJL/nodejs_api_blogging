'use strict';
const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();


router.route('/')
	.get(userController.ListUsers)
	.post(userController.CreateUser);
	
router.route('/:follow_id-:followed_id')
	.get(userController.FollowUser)
	.delete(userController.UnFollowUser)

router.route('/following')
  .get(userController.ListAllFollowing);

router.route('/:userId')
	.get(userController.SingleUser)
	.put(userController.UpdateUser)
 	.delete(userController.DeleteUser);

router.route('/:userId/following')
	.get(userController.ListUserFollowing)


module.exports = router;
