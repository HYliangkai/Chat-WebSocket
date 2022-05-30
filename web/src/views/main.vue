<template>
<div class="body">
    <div class="main">
        <div class="chat">
            <div class="info">
                <span class="fo">{{accept}}</span>
            </div>
            <div class="mes" >
                <div>
                <!-- 不用路由的形式用组件的形式,能方便实时传值 -->
                <ck class="ck"  :direction="sd(item)" :context="item.context" v-for="(item,index) in context" :key="index"></ck>
                </div>
            </div>
            <div class="send">
                <div class="sendinfo">
                    <div class="context">
                        <el-input type="textarea" class="sendder" v-model="message" size="medium" resize="none"  :minlength="1" :maxlength="500" :autosize="{minRows: 3, maxRows: 5 }"></el-input>
                    </div>
                    <div class="sendbtn">
                        <button @click="sendmes">发送</button>
                    </div>
                </div>
                
            </div>
        </div>
        <div class="link" ref="link">
            <div class="linkinfo" v-for="(item,index) in linklist" :key="index" @click="cc(item)" :ref="item">{{item}}</div>
        </div>
    </div>
</div>
</template>

<script>
import ck from '../components/chatcard.vue'
export default {
components:{ck},
    data() {
        return {
            context:[],
            send:sessionStorage.username,
            accept:'',
            linklist:[],
            message:'',
        }
    },
computed:{
    //计算属性默认是不能带参数的,但是可以写闭包让其可以传参
    sd(){
    return function(d){
        if(d.send==sessionStorage.id){
            return true
        }
        else{
            return false
        }
    }
    }
},
    methods: {
        cc(info){
            //增加连接稳定性,再来个加入房间操作
            //变色操作
            // this.$refs[info].style['background-color']="rgba(230, 229, 229,0.7)";

            this.fetchchat(info)
            this.accept=info

        },
        async fetchchat(info){
        if(info&&sessionStorage.username){
        const rep=await this.$http.get(`/getcontext?send=${sessionStorage.username}&accept=${info}`)
        this.context=rep.data.reverse()
        }
        else{this.$message.info('请先登录')}},
        //注意方法和变量不能重名
        sendmes(){
            if(!this.message.trim()){this.$message.info('请输入发送内容')}
            else if(!this.accept){this.$message.info('请选择一个发送人')}
            else{
                let senddata={
                    send:sessionStorage.id,
                    accept:this.accept,
                    context:this.message
                }
                this.$ws.emit('sendmes',senddata,()=>{})}
        },
        async fetchlink(){
            const rep=await this.$http.get('linklist')
            this.linklist=rep.data
        },
        listensend(){
            this.$ws.on('sendout',(data)=>{
                //对信息进行两步剖析
                console.log('有在接收')
                if(data.send!=this.accept){
                    // 相应的用户标上红点?
                    return
                }
                else{
                    this.context.push(data.context)
                }
            })
        },
        listenerror(){this.$ws.on('iserror',(data)=>{
            if(!data){this.$message.error('发送失败,请重试')}
            })},
        listensucsend(){
            this.$ws.on('sucsend',(data)=>{
                this.$message.success('发送成功')
                this.context.push(data)
                this.message=''
            })
        },
        setuproom(){
        this.$ws.emit('SetupRoom',sessionStorage.id)
        }
    },  
    created() {
        this.$ws.on('connect', () => { console.log('you are connection') })
        //建立房间
        this.setuproom()
        //查找联系人列表
        this.fetchlink()
        //监听收到信息
        this.listensend()
        //监听错误处理
        this.listenerror()
        //监听发送成功事件
        this.listensucsend()
    },
}
</script>





<style lang="scss" scope>
.body{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

}
.main{
    width: 60vw;
    height: 80vh;
    background-color:rgb(245, 245, 245);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 5px grey;
    border-radius: 3px;
}
.chat{
    width: 45vw;
    background-color: rgb(245, 245, 245);
    height: 80vh;
    display: flex;
    flex-direction: column;
}
.info{
    width: 100%;
    height: 5vh;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(230, 229, 229);
span{
    padding-left: 2rem;
}
}
.mes{
    width: 100%;
    height: 58vh;
    background-color:rgb(245, 245, 245);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    div{
    width: 100%;
    overflow-y: auto;
    }
}

.send{
    width: 100%;
    height: 17vh;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid rgb(230, 229, 229);

}
.sendinfo{
    width: 90%;
    height: 90%;
    background-color: rgb(245, 245, 245);
    display: flex;
    flex-direction: column;
}
.context{
    height: 80%;
    display: flex;
    align-items: flex-end;
}

.sendbtn{
    height: 20%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    button{
    color: #333;
    height: 100%;
    width: 4rem;
    background-color:rgba($color: #000000, $alpha: 0.128);
    border: 1px solid rgba($color: #000000, $alpha: 0.256);
    border-radius: 2px;
    transition: .3s;
    cursor: pointer;
    }
}
.link{
    width: 15vw;    
    height: 80vh;
    background-color:rgb(230, 229, 229);
    border-left: 1px solid rgb(230, 229, 229);
    overflow: auto;
}
.linkinfo{
    width: 100%;
    height: 5vh;
    background-color: rgb(245, 245, 245);
    cursor: pointer;
    border-bottom: 1px solid rgb(230, 229, 229);

}
.linkinfo:hover{
    opacity: .8;
}

</style>