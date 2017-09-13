var express = require('express');
var router =express.Router();
var User =require('../models/user');
var bcrypt= require('bcryptjs');
const passport =require('passport');

//Register

router.get('/register',function(req,res){
	// req.flash('success','you are now registered and can login');
	res.render('register');
})

//login form
router.get('/login',function(req,res){
	res.render('login');
})

//logout

router.get('/logout',function(req,res){
	req.logout();
	req.flash('success', 'You are logged out');
	res.redirect('/users/login');
})
//login process
router.post('/login',function(req,res,next){
	passport.authenticate('local',{
		successRedirect:'/',
		failureRedirect:'/users/login',
		failureFlash:true
	})(req,res,next);
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
						let query = {
							username:req.body.username,
							email:req.body.email
						}
						User.findOne(query,function(err){
							if(err){
								req.flash('success','you are now registered and can login');
								res.redirect('login');
							}else{
								req.flash('error','用户名或email已存在');
								res.redirect('register');
							}
						})
						
					}
				})
			})
		})
	}
})
module.exports = router;