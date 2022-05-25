<template>
<div v-if="puxi" class="body">
    <!-- 不应该限制每个框的长度,而是应该渲染出来 -->
    <ck class="ck" v-for="(item,index) in mala" :key="index" ></ck>
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
        puxi:[],
        mala:['a','a','a','a']
    }
},
methods: {
    async fetchchat(){
        // const rep=await this.$http.get(`/fetchchat?send=${this.send}&accept=${sessionStorage.username}`)
        // if(rep.data){
        //     this.puxi=rep.data
        // }
    }
},
created() {
    if(this.accept&&sessionStorage.username){
        this.fetchchat()
    }
    if(sessionStorage.username)
    {
        this.send=sessionStorage.username
    }
},
}
</script>

<style lang="scss" scoped>
.body{
    display: flex;
    flex-direction: column;
    width: 100%;

    }
.ck{
    width: 100%;

}
</style>