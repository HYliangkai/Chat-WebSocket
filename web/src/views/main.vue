<template>
<div class="body">
    <div class="main">
        <div class="chat">
            <div class="info">
                <span class="fo">{{accept}}</span>
            </div>
            <div class="mes">
                <router-view class="mess" />
            </div>
            <div class="send">
                <div class="sendinfo">
                    <div class="context">
                        <el-input type="textarea" class="sendder" v-model="context" size="medium" resize="none"  :minlength="1" :maxlength="500" :autosize="{minRows: 3, maxRows: 5 }"></el-input>
                    </div>
                    <div class="sendbtn">
                        <button @click="send">send</button>
                    </div>
                </div>
                
            </div>
        </div>
        <div class="link">
            <div class="linkinfo" @click="cc" ref="cc">jiojio</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            context:'',
            send:sessionStorage.username,
            accept:''
        }
    },
    methods: {
        cc(){
            this.$refs.cc.style.opacity=0.8
            this.accept='jiojio'
            this.$router.replace(`/chat/${this.accept}`)
        },
        send(){
            if(this.context.trim().length<=0){this.$message.error('不能发送空白信息')}
            else{
            this.$message.success('send success')
            }
        }
    },
}
</script>

<style lang="scss" scope>
.body{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh
}
.main{
    width: 60vw;
    height: 80vh;
    background-color:aquamarine;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 5px grey;
    border-radius: 3px;
}
.chat{
    width: 45vw;
    background-color: bisque;
    height: 80vh;
    display: flex;
    flex-direction: column;
}
.info{
    width: 100%;
    height: 5vh;
    display: flex;
    align-items: center;
span{
    padding-left: 2rem;
}
}
.mes{
    width: 100%;
    height: 58vh;
    background-color: cadetblue;
    overflow-y: scroll;
    
}
.mess{
    height: 58vh;
    
}
.send{
    width: 100%;
    height: 17vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.sendinfo{
    width: 90%;
    height: 90%;
    background-color: azure;
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
    background-color: blueviolet;
}
.linkinfo{
    width: 100%;
    height: 5vh;
    background-color: chocolate;
    cursor: pointer;
}
.linkinfo:hover{
    box-shadow: 0 0 2px black;
    
}

</style>