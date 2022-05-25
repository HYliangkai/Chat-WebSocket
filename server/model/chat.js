const mongoose =require('mongoose')
const schema=new mongoose.Schema({
send:{type:mongoose.Schema.Types.ObjectId,ref:'links'},
accept:{type:mongoose.Schema.Types.ObjectId,ref:'links'},
context:{type:String}
})
const model=mongoose.model('chats',schema)
module.exports=model