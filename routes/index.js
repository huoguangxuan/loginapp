var express = require('express');
var router =express.Router();
var Article =require('../models/article')
//get homepage

router.get('/',function(req,res){
	Article.find({},function(err,articles){
		if(err){

		}
		res.render('index',
			{
				title:'Articles',
				articles:articles
			}
		);
	})
	
})
// get single article router
router.get('/article/:id',function(req,res){
	Article.findById(req.params.id,function(err,article){
		res.render('article',{
			article:article
		})
		return;
	})
})

// edit article router
router.get('/article/edit/:id',function(req,res){
	Article.findById(req.params.id,function(err,article){
		res.render('edit_article',{
			title:'Edit Article',
			article:article
		})
		return;
	})
})
module.exports = router;