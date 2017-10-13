'use strict';

const port  = process.env.PORT||3000;
const parser = require('body-parser');
const express = require('./config/express');
const db = require('./config/db');

const app = express();

db.connect(function(err){
	if(err){
		console.log("Can't establish connection to the database");
	}
	else{
		app.listen(port, ()=>{
			console.log(`PORT ${port} listening`);
		})
	}
});

module.exports = app;
