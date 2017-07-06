// load environment vars form .env
require('dotenv').config();

var express = require('express'),
	router = express.Router(),
	mongojs = require('mongojs'),
	db = mongojs('mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+'@ds023912.mlab.com:23912/mean_todos_app', ['todos']);

// Get all Todos
router.get('/todos', function(req, res, next){
	db.todos.find(function(err, todos){
		if(err){
			res.send(err);
		}else{
			res.json(todos);
		}
	});
});

module.exports = router;