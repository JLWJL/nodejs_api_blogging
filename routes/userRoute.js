'use strict';
const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();


router.route('/')
	.get(userController.ListUsers)
// 	.post(userController.CreateUser);
	

router.route('/:userId')
	.get(userController.SingleUser)
// 	.put(userController.UpdateUser)
// 	.delete(userController.DeleteUser);


module.exports = router;
