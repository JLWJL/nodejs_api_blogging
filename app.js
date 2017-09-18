'use strict';
const express = require('express');
const app = express();
const parser = require('body-parser');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const port  = process.env.PORT||3000;

app.use(parser.json());
app.use(parser.urlencoded({extended: true}));


app.use('/',(err,req,res, next)=>{
	if(err) throw err;
	next();
})

app.use('/user',userRoute);
app.use('/post',postRoute);


/**
* Error handling
*/
app.use((req,res, next)=>{
	res.send("not found");
});


app.listen(port, (err)=>{
	if(err) {
		console.log("Error: ",err);
	}else{
		console.log(`${port} listening`);
	}
});