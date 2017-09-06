var mongoose = require('mongoose')

//article schema
var ArticleSchema = mongoose.Schema({
	title:{
		type:String,
		required:true
	},
	author:{
		type:String,
		required:true
	},
	body:{
		type:String,
		required:true
	}
})
var Artcile =module.exports = mongoose.model('Article',ArticleSchema)