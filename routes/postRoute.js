'use strict';
const postController = require('../controllers/postContrller');
const router = require('router');
const mysql = require('mysql');
const pool = mysql.createPool({
				connectionLimit	: 100,
				host						: 'localhost',
				user						: 'root',
				password				: '',
				database				: 'blogging'
			});

