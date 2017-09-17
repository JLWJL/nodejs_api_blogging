'use strict';
const express = require('express');
const app = express();
const parser = require('body-parser');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const port  = process.env.PORT||3000;

app.use(parser.json());
app.use(parser.urlencoded({extended: true}));





/**
* Error handling
*/
app.use((req,res, next)=>{
	
	console.log("not found");
	res.sendFile(__dirname+'/public/Error.html');
});


app.listen(port, ()=>{
	console.log(`${port} listening`);
}));