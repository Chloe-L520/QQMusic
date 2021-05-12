<template>
  <div class="home">
    <!-- tab标签 -->
    <div class="nav">
      <ul class="tab">
        <li 
          ref="li"
          v-for="(item,index) in tabs" 
          :key="index"
          :class="index==num?'active':''"
          :route="true"
          @click="handleTab(num=index)"
        >{{item}}</li>
      </ul>
      <i class="iconfont icon-weibiaoti-8_huaban1"></i>
    </div>
    <!-- <van-tabs 
      v-model="activeName"
      color="#4FCC92"
      line-width="30px"
    > 

      <i class="iconfont icon-weibiaoti-8_huaban1"></i>
      <van-tab title="推荐" name="0" to="/home/recommend">内容 1</van-tab>
      <van-tab title="音乐馆" name="1" to="/home/music">内容 2</van-tab>
      <van-tab title="电台" name="2" to="/home/podcast">内容 3</van-tab>
    </van-tabs>
    

    
    <!-- tab内容 -->
    <div class="content">
      <router-view name="searchbox"></router-view>
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      activeName: '0',
      // active: '/home' , //动态设置active为当前路由
      num: 0, //存储tab选中的下标
      tabs:['推荐','音乐馆','电台'],  //首页tab数据
      // tabUrlName: ['recommend','music','music','music'], //tabbbar路径名称
      tabUrl: ['/','music','radio']  //tabbar路径
    }
  },
  // watch: {  //解决点击返回按钮,tab跟页面不对应
  //   $route(newValue, oldValue) {
  //     this.active = newValue.path
  //   }
  // },
  // mounted() {  //解决刷新页面,tab跟页面不对应
  //   this.active = this.$route.path
  // },
  methods: {
    handleTab(){  //标签切换
      this.$router.push(`${this.tabUrl[this.num]}`)
    }
  },
}
</script>

<style lang="less" scoped>
@import '~@/style/index.less';
.home {
  overflow: hidden;
  margin: 30/@rem 30/@rem 0;
  .nav{
    z-index: 9999;
    .h(80);
    #flex-between;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 10/@rem 30/@rem 0;
    background: @bg-c;
    .tab {
      li{
        display: inline-block;
        .f_s(30);
        margin-right: 40/@rem;
        padding-bottom: 10/@rem;
      }
      li.active {
        .f_s(34);
        font-weight: bold;
        border-bottom: 8/@rem solid @primary;
      }
    }
    i {
      .f_s(50);
      color: @primary;
      margin-left: 40/@rem;
    }
  }
  .content {
    left: 30/@rem;
    right: 30/@rem;
    top: 100/@rem;
  }
}

</style>
