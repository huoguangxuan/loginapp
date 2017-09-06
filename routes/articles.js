var express = require('express');
var router =express.Router();
var Article =require('../models/article')
router.get('/add',function(req,res){
	res.render('add_article',{title:'add artcile'});
})

//add submit POST router

router.post('/add',function(req,res){
	let article =new Article();
	article.title=req.body.title;
	article.author=req.body.author;
	article.body=req.body.body;
	article.save(function(err){
		if(err){
			console.log(err);
			return;
		}else{
			res.redirect('/');
		}
	})
})
module.exports = router;