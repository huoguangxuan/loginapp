var express= require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator= require('express-validator');
var flash= require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo =require('mongodb');
var mongoose = require('mongoose');
var dbUrl= 'mongodb://localhost/loginapp'
mongoose.connect(dbUrl,function(err,res){
	if(err){
		console.log('DB CONNECTION FAILED:'+err)
	}else{
		console.log('DB CONNECTION SUCCESS:'+dbUrl)
	}
})

// var routes = require('./routes/index');
var users = require('./routes/users');
// var articles = require('./routes/articles');
var routes = require('./routes/articles');
//init App
var app = express();

// View Engine 
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));
app.use(cookieParser());

//set Static Folder
app.use(express.static(path.join(__dirname,'public')));

//Express session
app.use(session({
	secret:'secret',
	saveUninitialized:true,
	resave:true
}));

//Connect Flash
app.use(flash());
// express message middleware Global Vars
app.use(function(req,res,next){
	res.locals.messages= require('express-messages')(req,res);
	next();
});
// Express Validator

app.use(expressValidator({
	errorFormatter:function(param,msg,value){
		var namespace =param.split('.'),
		root =namespace.shift(),
		formParam = root;
	  while(namespace.length){
	  	formParam += '['+namespace.shift()+']';
	  }
	  return{
	  	param:formParam,
	  	msg  :msg,
	  	value:value
	  };
	}
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());




// set routes
app.use('/',routes);
app.use('/users',users);
// app.use('/articles',articles);
//Set Port
app.set('port',(process.env.PORT || 3000));

app.listen(app.get('port'),function(){
	console.log('Server started on port'+app.get('port'));

})