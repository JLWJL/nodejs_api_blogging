'use strict';
// const express = require('express');
// const app = express();
const parser = require('body-parser');
// const userRoute = require('./routes/userRoute');
// const postRoute = require('./routes/postRoute');
const port  = process.env.PORT||3000;

const db = require('./config/db');
const express = require('./config/express');
const app = express();

/**
* Error handling
*/
app.use((req,res, next)=>{
	res.status(404).send("not found");
});

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

// app.use(parser.json());
// app.use(parser.urlencoded({extended: true}));


// app.use('/',(err,req,res, next)=>{
// 	if(err) throw err;
// 	next();
// })

// app.use('/user',userRoute);
// app.use('/post',postRoute);


// /**
// * Error handling
// */
// app.use((req,res, next)=>{
// 	res.send("not found");
// });


// app.listen(port, (err)=>{
// 	if(err) {
// 		console.log("Error: ",err);
// 	}else{
// 		console.log(`${port} listening`);
// 	}
// });