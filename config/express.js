'use strict';
const express = require('express');
const parser = require ('body-parser');
const userRoute = require('../app/routes/userRoute');
const postRoute = require('../app/routes/postRoute');

module.exports = function(){
	const app = express();

	app.use(parser.json());
	app.use(parser.urlencoded({extended:true}));

	app.use('/user',userRoute);
	app.use('/post',postRoute);


	return app;
}