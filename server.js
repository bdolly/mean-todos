// load environment vars from .env 
require('dotenv').config();

// dependencies
var express = require('express'),
	path = require('path'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser');

// routes 
var index = require('./routes/index'),
	todos = require('./routes/todos');



var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// midddleware
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended:false
}));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'client')));

// ROUTING 
app.use('/', index);
app.use(process.env.API_BASE, todos);

app.use(function(req, res, next){
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});


var server = app.listen(3000, function(){
	var host = process.env.DB_HOST;
	var port = server.address().port;
	console.log('App listening at http://%s:%s', host, port);
});


module.exports = app;
