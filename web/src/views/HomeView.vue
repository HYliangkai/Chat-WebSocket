<template>
<div class="body">
  <div class="shell">
    <!-- 登录注册部分 -->
    <div class="top">
      <span class="off" ref="off">SIGNIN</span>
      <div class="button">
        <!-- 点击变化的时间在这里 -->
      <div class="ball" @click="change" ref="ball">
      </div>
      
      </div>
      <span class="on" ref="on">SIGNUP</span>
    </div>
    <div class="bottom" ref="bottom">
      <div class="signin">
        <h2>Sign In</h2>
        <input type="text" placeholder="username" v-model='username'>
        <input type="text" placeholder="password" v-model="password">
        <button @click="login">GO</button>
      </div>
      <div class="signup">
        <h2>Sign Up</h2>
        <input type="text" placeholder="username" v-model='username'>
        <input type="text" placeholder="password" v-model="password">
        <button @click="logup">GO</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      index:0,
      username:'',
      password:''
    }
  },
  methods: {
    async logup(){
      let rep=await this.$http.get(`logup?username=${this.username}&password=${this.password}`)
      if(rep.data.message){
        console.log('yes')
        this.$message.info('此用户名已注册baby')
      }else if(rep.data.username){
        sessionStorage.username=rep.data.username
        sessionStorage.id=rep.data._id
        this.$message.success('注册成功')
        this.$router.replace('/main')
      }
    },
    async login(){
      let rep=await this.$http.get(`login?username=${this.username}&password=${this.password}`)
      if(rep.data.username){
        sessionStorage.username=rep.data.username
        sessionStorage.id=rep.data._id
        this.$message.success('登录成功')
        this.$router.replace('/main')
      }else{
        this.$message.error('登录失败,再试一次')
      }
    },
    change(){
      //vue实现样式改变的两种方法:1.条件渲染 2.refs获取dom
      if(this.index===0){
        this.index=1
        //注意这个ref要加s
        //给他加一个60%的长度,自然顶到右边了
        this.$refs.ball.style.left=60+'%'
        //单个样式是.style.xx  多个样式是.style.csstext='string'
        //切换透明度
        this.$refs.on.style.opacity=1
        this.$refs.off.style.opacity=0.5
        //旋转:旋转的原理的y轴换180度加上动画时间 所有属性都是静态的,都是加上改变时间之后就变成动态的了
        this.$refs.bottom.style.transform ="rotateY(180deg)"
      }
      else if(this.index===1){
        this.index=0
        this.$refs.ball.style.left=0
        this.$refs.on.style.opacity=.5
        this.$refs.off.style.opacity=1
        this.$refs.bottom.style.transform ="rotateY(0deg)"
        }
      
    }
  },
}
</script>
<style scoped lang="scss">
.body{
  background-color: rgb(31,32,41) !important;
  height: 100vh ;
  display: flex;
  justify-content: center;
  align-items: center;

}
.shell{
  width: 18.75rem /* 300px -> 18.75rem */;
  height: 21.875rem /* 350px -> 21.875rem */;
  display: flex;
  flex-direction: column; 
  /* 纵向排列 */
  justify-content: space-evenly;
  align-items: center;
  perspective: 1000px /* 1000px -> 62.5rem */;
  /* 透视距离,设置了透视距离之后只有3d效果显示 */
}
/* 头部 */
.top{
  width:18.75rem /* 300px -> 18.75rem  罪魁祸首*/;
  display: flex;
  cursor: default;
  justify-content:space-evenly;
}
/* off and on */
.off,.on{
  color: #fff;
  transition: .5s;/* 动画时间? */
  font: 300 1.25rem /* 20px -> 1.25rem */ '';/* weight,size,family */
}
/* 给没被选到的on一个半透明 */
.on{
  opacity: .5;
}
.button{
  width: 3.75rem /* 60px -> 3.75rem */;
  height: 1.5625rem /* 25px -> 1.5625rem */;
  background-color: rgb(255,235,167);
  border-radius: 1.25rem /* 20px -> 1.25rem */;
  position: relative;
}
.ball{
  position: absolute;
  width: 1.5625rem /* 25px -> 1.5625rem */;
  height: 1.5625rem /* 25px -> 1.5625rem */;
  background-color: rgb( 45, 45, 56);
  border-radius: 50%;
  box-shadow: 0 0 10px black; //加个阴影更真实一点
  left: 0;
  transform: translate(-1px);
  cursor: pointer;

}
//设置主要信息
//把子级div分开,实现效果:1.每个div占据100%的大小,这样可以实现到时一个100%
.bottom{
  width: 18.75rem /* 300px -> 18.75rem */;
  height: 15.625rem /* 250px -> 15.625rem */;
  background-image: url('../assets/background.png');
  transform-style: preserve-3d;//设置一下动画效果是3d的
  position: relative;
  transition: .7s;
  border-radius: .3125rem /* 5px -> .3125rem */;
  div{
    h2{
      color: #fff;
    }
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  input{
    width: 12.5rem /* 200px -> 12.5rem */;
    height: 1.5625rem /* 25px -> 1.5625rem */;
    padding: 0 .625rem /* 10px -> .625rem */;
    background-color: rgb(31, 32, 41);
    color: #fff;//文字颜色
    border-radius: .1875rem /* 3px -> .1875rem */;
  }
  button{
    width: 5rem /* 80px -> 5rem */;
    height: 1.875rem /* 30px -> 1.875rem */;
    color: #333;
    background-color: rgb(255, 235, 167);
    border-radius: .25rem /* 4px -> .25rem */;
    transition: .3s;
    margin-bottom: .625rem /* 10px -> .625rem */;
    cursor: pointer;
  }
  button:hover{
    box-shadow: 0 0 .625rem /* 10px -> .625rem */ rgb(255, 235, 167);
  }
  }
}
//给这两个设置翻转浮空动画,外加镜像翻转
.signin{
  transform: translateZ(4.375rem);
}
//signup的z轴深度的-70px,并且y轴反向,所以就在图的反面
.signup{
  position: absolute;

  top: 0;
  transform: translateZ(-4.375rem)  rotateY(180deg);//up转动时候还要镜像翻转一下,因为翻转之后就已经是镜像了,纠正就就再镜像
}
.body{
  display: flex;
  flex-direction: column;
}
</style>