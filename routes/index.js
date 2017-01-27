var express = require('express');
var router = express.Router();

// Default page
router.get('/', isULogin, function(req, res, next) {
	res.render('index');
});

router.get('/about', isULogin, function(req, res, next) {
	res.render('about');
});

router.get('/contact', isULogin, function(req, res, next) {
	res.render('contact');
});

function isULogin(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}else{
		req.flash('error_msg', "Please Login");
		res.redirect('/login');
	}
}

module.exports = router;