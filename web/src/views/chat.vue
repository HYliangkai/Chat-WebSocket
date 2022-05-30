<template>
<div  v-if="send" class="body" >
    <!-- 不应该限制每个框的长度,而是应该渲染出来 -->

    <ck class="ck"  :direction="sd(item)" :context="item.context" v-for="(item,index) in context" :key="index"></ck>

</div>
</template>

<script>
import ck from '../components/chatcard.vue'
export default {
components:{ck},
props:{
    accept:'',
},
computed:{  
},
data() {
    return {
        send:'',
        context:[]
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
    async fetchchat(){
        const rep=await this.$http.get(`/getcontext?send=${sessionStorage.username}&accept=${this.accept}`)
        this.context=rep.data.reverse()
    }
},
created() {

    if(this.accept&&sessionStorage.username){
        this.send=sessionStorage.username
        this.fetchchat()
    }
    else{
        this.$message.info('请先登录')
    }
},
mounted() {

},
}
</script>

<style lang="scss" scoped>
.body{

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 100%;
    }
.ck{
    width: 100%;
}
</style>