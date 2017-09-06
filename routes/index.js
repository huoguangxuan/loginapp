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
module.exports = router;