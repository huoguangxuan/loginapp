var express = require('express');
var router =express.Router();
var User =require('../models/user');
var bcrypt= require('bcryptjs');

//Register

router.get('/register',function(req,res){
	req.flash('success','you are now registered and can login');
	res.render('register',{ msg: req.flash('success') });
})

router.get('/login',function(req,res){
	res.render('login',{ msg: req.flash('success') });
})
//Register user
router.post('/register',function(req,res){
	var name=req.body.name;
	var email=req.body.email;
	var username = req.body.username;
	var password =req.body.password;
	var password2= req.body.password2;

	//Validator
	req.checkBody('name','Name is required').notEmpty();
	req.checkBody('username','Username is required').notEmpty();
	req.checkBody('email','email is required').notEmpty();
	req.checkBody('email','email is not valid').isEmail();
	req.checkBody('password','password is required').notEmpty();
	req.checkBody('password2','passwords do not match').equals(req.body.password);
	var errors = req.validationErrors();
	if(errors){
		console.log(errors);
		res.render('register',{
			errors:errors
		})
	}else{
		var newUser =new User({
			name:name,
			email:email,
			username:username,
			password:password
		});
		bcrypt.genSalt(10,function(err,salt){
			bcrypt.hash(newUser.password,salt,function(err,hash){
				if(err){
					console.log(err);
				}
				newUser.password =hash;
				newUser.save(function(err){
					if(err){
						console.log(err)
						return;
					}else{
						req.flash('success','you are now registered and can login');
						res.redirect('login');
					}
				})
			})
		})
	}
})
module.exports = router;