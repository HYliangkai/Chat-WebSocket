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

    route.get('/linklist',async(req,res)=>{
        const model = require('../model/link')
        //不要password信息
        const linklist = await model.find({}, '-password')
        res.send(linklist.map(c=>c.username))
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
    route.get('/getcontext', async (req, res) => {
        if (!req.query.send || !req.query.accept) { res.status(404).send({ message: 'error'  }) }
        else {
            const model = require('../model/link')
            const modell=require('../model/chat')
            const acceptid = await model.findOne({ username: req.query.accept })
            const sendid=await model.findOne({username:req.query.send})
            if (!acceptid||!sendid) { res.status(404).send({ message: 'error' }) }
            else {
                // await modell.create({ send: sendid, accept: acceptid, context: '嘻嘻' })
                // await modell.create({ send: acceptid, accept: sendid, context: '那就这样吧' })
                //mongoose或查询 先只搜索10条
                //mongoose原生是有callback的,只不过在这里用的是await语法  需要的是最新的十条内容 只能用sort()
                const context = await modell.find({ "$or": [{ send: sendid, accept: acceptid }, { send: acceptid, accept: sendid }] }).sort({_id:-1}).limit(10)
                const data = context.map(item => {
                    return {
                        sendtime: item._id.getTimestamp(),
                        send: item.send,
                        accept: item.accept,
                        context:item.context
                    }
                })
                res.send(data)
            }
        }
    })


    app.use('/api',route)
}