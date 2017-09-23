const mysql = require('mysql');
const state = {
	pool:null
};





module.exports.connect = function(done){ //'done' -> callback

	state.pool = mysql.createPool({
					connectionLimit	: 100,
					host						: 'localhost',
					user						: 'root',
					password				: '',
					database				: 'blogging'
				});
	done();
}

module.exports.getPool = function(){
	return state.pool;
}