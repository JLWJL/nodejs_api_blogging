'use strict';

const chai = require('chai');
const expect = chai.expect;
const app = require('../app.js');

chai.use(require('chai-http'));


describe('Endpoint post/', ()=>{
	
	//this.timeout(3000); //Time waiting for a response

	before(()=>{

	});

	after(()=>{
		
	});


	it('post/ should return all posts', ()=>{
		return chai.request(app)
			.get('/post')
			.then((res)=>{
				expect(res).to.have.status(200);
				expect(res).to.be.json;
			});
	});


	it('invalid_path/ should return Not Found', ()=>{
		return chai.request(app)
			.get('/INVALID_PATH')
			.then((res)=>{
				throw new Error('Path Not Existed');
			})
			.catch((err)=>{
				expect(err).to.have.status(404);
			});
	});


	//Create new post
	//Method: POST
	it('post/ should create new post', ()=>{
		return chai.request(app)
			.post('/post/')
			.send({
				user_id:5,
				post_name: 'test by Mocha'
			})
			.then((res)=>{
				expect(res).to.have.status(201);
				expect(res).to.be.json;
				expect(res.body).to.be.an('object');
				// expect(res.body.results).to.be.an('array')
			});
	});



	//Create new post
	//Method: POST
	//Bad request
	it('post/ should return bad request',()=>{
		return chai.request(app)
			.post('/post/')
			.send({
				user_id:299,
				post_name:'User 299 not found'
			})
			.then((res)=>{
				throw new Error('Invalid content type');
			})
			.catch((err)=>{
				expect(err).to.have.status(400);
			});
	});
});
