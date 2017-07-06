// load environment vars form .env
require('dotenv').config();

var express = require('express'),
	router = express.Router(),
	mongojs = require('mongojs'),
	db = mongojs('mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+'@ds023912.mlab.com:23912/mean_todos_app', ['todos']);

var errorHandler = function(res,err, result){
	if(err){
			res.send(err);
		}else{
			res.json(todos);
		}
};

// GET all Todos
router.get('/todos', function(req, res, next){
	db.todos.find(function(err, todos){
		errorHandler(res, err, todos);
	});
});


// GET Single TODO
router.get('/todo/:id',function(req, res, next){
	db.todos.findOne({
		_id: mongojs.ObjectId(req.params.id),
	}, function (err, todo) {
		errorHandler(res, err, todo);
	})
});


 //POST a todo item 
 router.post('/todo', function(req, res, next){
 	var todo = req.body;
 	if(!todo.text || !(todo.isCompleted + '')){
 		res.status(400);
 		res.json({
 			"error":"Invalid Data"
 		});
 	}else{
 		db.todos.save(todo, function(err, result){
 			errorHandler(res, err, result);
 		});
 	}
 });


 // PUT update todo
 router.put('/todo/:id', function(req, res, next){
 	var todo = req.body;
 	var updObj = {};

 	if(todo.isCompleted) updObj.isCompleted = todo.isCompleted;
 	if(todo.text) updObj.text = todo.text;
 	if (!updObj) {
 		res.send(400);
 		res.status(400);
 		res.json({
 			"error":"Invalid Data"
 		});
 	}else{
 		db.todos.updae({
 			_id:mongojs.ObjectId(req.parmas.id)
 		}, updObj,{}, function(err, result){
 			errorHandler(res, err, result);
 		})
 	}
 	
 });




 // DELETE todo 
 router.delete('/todo/:id', function(req, res, next){
 	
 	db.todos.remove({
 		_id: mongojs.ObjectId(req.params.id)
 	},'', function(err, result){
 		if(err){
				res.send(err);
			}else{
				res.json(result);
			}
 	});
 });

module.exports = router;