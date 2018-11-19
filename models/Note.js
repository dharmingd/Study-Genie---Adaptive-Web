const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const noteSchema=new Schema({
	userId:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'users'
	},
	groupIds:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:'groups'
	}],
	// As status has only 2 fixed values, so using enum
	status:{
		type:String,
		enum:['public','private']
	},
	// As category has only 2 fixed values, so using enum
	category:{
		type:String,
		enum:['note','cheatsheet']
	},
	content:String,
	commentIds:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:'comments'
	}],
	numberOfLikes:Number,
	numberOfFavourites:Number,
	tags:Array,
	firstCreatedTime:Date
});

mongoose.model('notes',noteSchema)