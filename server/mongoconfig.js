module.exports=()=>{
    const mongoose=require('mongoose')
    mongoose.connect('mongodb://127.0.0.1:27017/websocket', { useNewUrlParser: true, useUnifiedTopology: true},(err)=>{
        if(!err)
        console.log('mongo is connected')
    })
}