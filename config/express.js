'use strict';
const express = require('express');
const parser = require ('body-parser');
const userRoute = require('../app/routes/userRoute');
const postRoute = require('../app/routes/postRoute');

module.exports = function(){
	const app = express();

// Middlewares
	app.use(parser.json());
	app.use(parser.urlencoded({extended:true}));

//Routes
	app.use('/user',userRoute);
	app.use('/post',postRoute);

//Error handling
	app.use((err,req,res,next)=>{
		console.log("Error handled: ", err.error)
		res.status(err.status||400).send(err.message);
	});


	return app;
}