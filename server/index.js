const express = require('express')
const { Server } = require('socket.io')
const { createServer } = require("http");
const app = express()
app.use(express.json())
app.use(require('cors')()) //注意json和cors要在接口转发之前
require('./router/api')(app)
require('./mongoconfig')()
const httpserver = createServer(app)
const io = new Server(httpserver, {
    cors:true
    // {//设置允许跨域请求的特定网址
    //     origin: 'http://localhost:8080'
    // }
    //或者可以直接cors:true
})
require('./router/socket')(io)
httpserver.listen(2333, () => { console.log('2333 is success') })



