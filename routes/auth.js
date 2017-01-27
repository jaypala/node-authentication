var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local'),Strategy;

var User = require('../models/user')

// Register page
router.get('/register', function (req, res, next) {
	errors = "";
	res.render('register',{ errors:errors });
});

// Register User
router.post('/register', function (req, res, next) {
	var name = req.body.name;
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;
	var password2 = req.body.password2;

	// validate
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Insert valid email').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Password do not match').equals(req.body.password);

	var errors = req.validationErrors();

	// console.log(errors);

	if(errors){
		res.render('register',{ errors:errors });
	}else{
		var newUser = new User({
			name: name,
			email: email,
			username: username,
			password: password
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'You are registered successfully');

		res.redirect('/login');
	}



});

// Login page
router.get('/login', function (req, res, next) {
	res.render('login');
});


passport.use(new LocalStrategy(
  	function(username, password, done) {
    	User.getUserByUsername(username, function(err, user){
    		if(err) throw err;
    		if(!user){
    			return done(null, false, {message: "User does not exist"});
    		}
    		User.comparePassword(password, user.password, function(err, isMatch){
    			if(err) throw err;
	    		if(isMatch){
	    			return done(null,user);
	    		}else{
	    			return done(null,false, {message: "password does not match"});
	    		}
    		});
    	});
  	}
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  	passport.authenticate('local', {successRedirect:'/', failureRedirect:'/login' , failureFlash: true}),
  	function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res){
	req.logout();
	req.flash('success_msg', 'You are successfully logout');
	res.redirect('/login');
});
module.exports = router;