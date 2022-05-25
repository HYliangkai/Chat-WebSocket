const express=require('express')
module.exports=(app)=>{
    const route = express.Router({mergeParams: true})


    route.get('/logup',async(req,res)=>{
        const username=req.query.username
        const password=req.query.password
        const model=require('../model/link')
        const rep=await model.findOne({username:username})
        if(!rep){
            const repp=await model.create({username:username,password:password})
            res.send(repp)
        }else{
            res.send({message:'has'})
        }
        
    })

    route.get('/login',async(req,res)=>{
        if (!req.query.username || !req.query.username) { res.send({ message: 'error' })}
        const username=req.query.username
        const password=req.query.password
        const model = require('../model/link')
        const rep = await model.findOne({ username: username,password:password })
        if(rep){res.send(rep)}
        else{res.send({message:'error'})}
        
    })


    app.use('/api',route)
}