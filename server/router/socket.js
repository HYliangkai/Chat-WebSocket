module.exports = (io) => {
    //连接事件
    let client=0
    io.on('connection', (socket) => {

        socket.on('SetupRoom', (data) => {
            console.log(data)
            //进入到当前房间并不意味着之前的房间会丢弃
            socket.join(data)
            console.log(socket.rooms)
        })
        socket.on('sendmes', async(data) => {
            console.log(data)
            const sendid = data.send
            //1.查出接收人信息
            const model = require('../model/link')
            const rep = await model.findOne({ username: data.accept }).lean()
            const rep2=await model.findById(sendid)
            if (!rep.username||!rep2) { socket.emit('iserror') }
            else {
                const acceptid = rep._id
                //存入数据库
                const model2 = require('../model/chat')
                const senddata = {
                    send: sendid,
                    accept: acceptid,
                    context: data.context
                }
                const rep3 = await model2.create(senddata)
                //数据转发
                console.log(rep3)
                //给自己一个发送成功的提示
                socket.emit('sucsend', rep3)
                //给对方一个即时发送

                    const acid=acceptid.toString()
                socket.to(acid).emit('sendout', { send:rep2.username,context:rep3 })
                    console.log('发送完毕')
                //就算房间不存在也可以发送,只不过没有人接收而已
            }
        })
        console.log(socket.rooms)
        //建立连接时执行
        console.log('连接对象:' + socket.id);client++;console.log('当前连接用户' + client)
        //断开连接的时候执行    
        socket.on('disconnect', () => {client--;console.log('当前用户' + client)})
    })
}