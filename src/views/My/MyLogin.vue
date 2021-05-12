<template>
  <div class="mylogin">
    <div class="box" v-if="userInfo">
      <h4>{{userInfo.username}}</h4>
      <img src="@/assets/img/user.jpg" alt="">
      <ul class="info">
        <li>关注<span>2</span></li>
        <li>粉丝<span>5</span></li>
        <li>新歌提醒<span>暂无更新</span></li>
      </ul>
    </div>
    <div class="box2" v-else>
      <div class="button">
        <router-link class="iconfont icon-wode1" to="/login"></router-link>
        立即登录
      </div>
      <span>立即登录，资产云同步</span>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
  export default {
    computed: {
      ...mapState({
        userInfo:state=>state.userx.userInfo
      })
    },
  }
</script>

<style lang="less" scoped>
@import '~@/style/index.less';
.mylogin{

}
.box{
  position: relative;
  .h(186);
  border-radius: 15/@rem;
  background: @white;
  margin-bottom: 50/@rem;
  h4 {
    display: inline-block;
    .f_s(34);
    margin: 25/@rem 0 50/@rem 166/@rem;
  }
  img{
    .w(100);
    .h(100);
    border-radius: 100%;
    position: absolute;
    top: -20/@rem;
    left: 30/@rem;
  }
  .info{
    display: flex;
    li{
      .f_s(26);
      padding: 0 26/@rem;
      border-right: #646464;
      span {
        .f_s(20);
        margin-left: 18/@rem;
        color: #646464;
      }
    }
  }
}
.box2{
  // position: absolute;
  #flex-around;
  .h(186);
  text-align: left;
  border-radius: 15/@rem;
  background: @white;
  padding: 0 0 0 60/@rem;
  .button{
    .h(60);
    .f_s(30);
    line-height: 60/@rem;
    color: @white;
    background: @primary;
    padding: 0 30/@rem;
    border-radius: 35/@rem;
    .iconfont{
      color: @white;
    }
  }
  span{
    .f_s(22);
  }
}
</style>