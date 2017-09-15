var mongoose = require('mongoose');

var CommentSchema = mongoose.Schema({
	aid:String,
	name:String,
	timestamp:{
		type:Date,default:Date.now
	},
	content:String,
	avatar:String
})

var Comment = module.exports = mongoose.model('Comment',CommentSchema)