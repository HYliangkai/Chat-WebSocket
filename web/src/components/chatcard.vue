<template>
<div class="chatinfo">
    <!-- 聊天框 -->
    <div class="inff"  v-if="!direction" >
    <span class="kuan"></span>
    <span class="context">
        <span class="in" style="background-color:rgb(255,255,255) ;">
            {{context}}
        </span>
    </span>
    </div>
    <div class="inffe"  v-if="direction" >
    <span class="context2">
        <span class="in" style="background-color:rgb(149, 236, 105) ;">
            {{context}}
        </span>
    </span>
    <span class="kuan2"></span>
    </div>
</div>
</template>

<script>
export default {
props:{
    direction:Boolean,
    context:'',
    
},
created() {
    
},
}
</script>

<style scoped lang="scss">
.chatinfo{
    margin-bottom: 1.5rem;
}
.inff{
    display: flex;
    align-items: center;
}
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
    background-color:burlywood
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
    width: 60%;
    display: flex;
    flex-wrap: wrap;
    // background-color:chocolate;
}
.context2{
    width: 60%;
    // background-color: royalblue;
    display: flex;
    justify-content: flex-end;
}
.in{
    padding: .4rem;
    border-radius: .3rem;
}
</style>