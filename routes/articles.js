var express = require('express');
var router =express.Router();
var Article =require('../models/article');
var User =require('../models/user');
var Comment =require('../models/comment');

//get homepage

router.get('/',function(req,res){
	Article.find({},function(err,articles){
		if(err){
			console.log(err)
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
		User.findById(article.author,function(err,user){
			res.render('article',{
			article:article,
			currentauthor:user.username
			})
		})
	})
})

// edit article router
router.get('/edit/:id',function(req,res){
	Article.findById(req.params.id,function(err,article){
		res.render('edit_article',{
			title:'Edit Article',
			article:article
		})
		return;
	})
})
router.get('/add',function(req,res){
	res.render('add_article',{title:'Add Article'});
})

// Access Control
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/users/login');
  }
}

//add submit POST router

router.post('/add',function(req,res){

	//验证
	req.checkBody('title','title is required').notEmpty();
	// req.checkBody('author','author is required').notEmpty();
	req.checkBody('body','body is required').notEmpty();

	//get errors
	let errors = req.validationErrors();

	if(errors){
		res.render('add_article',{
			title:'Add Article',
			errors:errors
		})
	}else{
		let article =new Article();
		article.title=req.body.title;
		article.author=req.user._id;
		article.body=req.body.body;
		article.save(function(err){
			if(err){
				console.log(err);
				return;
			}else{
				req.flash('success','article added success!')
				res.redirect('/');
			}
		})

	}
	
})

//update submit POST router

router.post('/edit/:id',function(req,res){
	let article ={};
	article.title=req.body.title;
	article.author=req.body.author;
	article.body=req.body.body;
	let query={_id:req.params.id};
	Article.update(query,article,function(err){
		if(err){
			console.log(err);
			return;
		}else{
			req.flash('success','修改成功');
			res.redirect('/');
		}
	})
})

//delete submit POST router

router.delete('/articles/:id',function(req,res){
	let query={_id:req.params.id};
	Article.remove(query,function(err){
		if(err){
			console.log(err);
			return;
		}else{
			res.send('success');
		}
	})
})


// Access Control
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/users/login');
  }
}

// 评论
router.post('/article/:id',function(req,res){
	let comment = new Comment();
		comment.aid = req.body.id
		comment.name=req.user._id;
		comment.content=req.body.content;
	console.log(req.body.id);
	//validator
	req.checkBody('content','content is required').notEmpty();
	let errors = req.validationErrors();

	if(errors){
		res.render('article/:id',{
			title:'comment',
			errors:errors
		})
	}else{
		comment.save(function(err){
		if(err){
			console.log(err)
		}else{
			let query={aid:req.body.id}
			comment.find(query,function(err,comment){
				if(err){
					console.log(err);
					return
				}else{
					res.render('')
				}
			})
		}
	})
	}
	
})
module.exports = router;