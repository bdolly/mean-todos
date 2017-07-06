var express = require('express'),
	router = express.Router();

// Get all Todos
router.get('/todos', function(req, res, next){
	res.send('TODOS API');
});

module.exports = router;