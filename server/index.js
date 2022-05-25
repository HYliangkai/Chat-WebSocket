const express=require('express')
const app=express()
app.use(express.json())
app.use(require('cors')()) //注意json和cors要在接口转发之前
require('./router/api')(app)
require('./mongoconfig')()
app.listen('2333',(err)=>{
    if(!err)console.log('127.0.0.1:2333')
    
})