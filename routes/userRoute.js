'use strict';
const userController = require('../controllers/userContrller');
const router = require('router');


router.route('/')
	.get(userContrller.ListUsers)
	.post(userContrller.CreateUser);
	

router.route('/:userId')
	.get(userContrller.SingleUser)
	.put(userContrller.UpdateUser)
	.delete(userContrller.DeleteUser);


module.exports = router;
