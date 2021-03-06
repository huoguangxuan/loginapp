var mongoose = require('mongoose');

//user Schema

var UserSchema = mongoose.Schema({
	email:{
		type:String,
		required:true,
	},
	username:{
		type:String,
		required:true,
	},
	password:{
		type:String,
		required:true,
	}
});

var User = module.exports =mongoose.model('User',UserSchema);