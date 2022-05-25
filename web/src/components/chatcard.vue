<template>
<div class="chatinfo">
    <!-- 聊天框 -->
    <div class="inff" v-if="false">
    <span class="kuan">tou</span>
    <span class="context">什么时候去吃饭什么什么和啊我不懂是逆不哟啊什么都问问啊我啊,sdjbdiwdnckl成功i茶匙从背后美女美女美女hi十四行诗实时</span>
    </div>
    <div class="inffe" v-if="true">
    <div class="contextout">
    <span class="context">啊什么都问dihxxxxxxxxxxxxxxxxxxxxxxxxxxxxsi十四行诗实时</span>
    </div>
    <span class="kuan2">tou</span>
    </div>
</div>
</template>

<script>
export default {
props:{
    direction:'',
    context:'',
    
},
created() {
    
},
}
</script>

<style scoped lang="scss">
.chatinfo{

    margin-bottom: 2rem;

}
.inff{display: flex;align-items: center;}
.inffe{
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.kuan2{
    margin-left:1rem ;
    margin-right:2rem;
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 0.3rem;
    background-color: antiquewhite;
}
.kuan{
    margin-left:2rem ;
    margin-right:1rem;
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 0.3rem;
    background-color: antiquewhite;
}
.context{
    display: flex;
    flex-wrap: wrap;
    background-color:chocolate;
}
.contextout{
    width: 25rem;
    background-color: brown;
    border-radius:.2rem;
    }
</style>