var express = require('express');
var router =express.Router();
var Article =require('../models/article')
router.get('/add',function(req,res){
	res.render('add_article',{title:'Add Article'});
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


//update submit POST router

router.post('/edit/:id',function(req,res){
	let article ={};
	article.title=req.body.title;
	article.author=req.body.author;
	article.body=req.body.body;
	let query={_id:req.params.id}
	Article.update(query,function(err){
		if(err){
			console.log(err);
			return;
		}else{
			res.redirect('/');
		}
	})
})
module.exports = router;