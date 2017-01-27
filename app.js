var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local'),Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');

// requiring config db file 
var dbConfig = require('./config/database.js');


mongoose.connect(dbConfig.database);

var db = mongoose.connection;

var routes = require('./routes/index');
var auth = require('./routes/auth');

var app = express();

require('./config/vengine.js')(app); // get our config file

// BodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

// Express session
app.use(session({
	secret: 'secret',
	saveUninitialized: true,
	resave: true
}));

// Use passport 
app.use(passport.initialize());
app.use(passport.session());

// Express validator
app.use(expressValidator({
	errorFormatter: function(param, msg, value){
		var namespace = param.split('.')
		, root = namespace.shift()
		, formParam = root;
		while(namespace.length){
			formParam += '[' + namespace.shift() + ']';
		}
		return {
			param : formParam,
			msg : msg,
			value : value
		};
	}
}));

// Connect flash
app.use(flash());

// Global response variables
app.use(function(req, res, next){
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});



app.use('/', routes);
app.use('/', auth);

// Set port
app.set('port', 3000);

app.listen(app.get('port'), function(){
	console.log('Server started on port '+ app.get('port'));
});