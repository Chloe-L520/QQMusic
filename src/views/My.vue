<template>
    <div class="my">
        <!-- 页头 -->
        <div class="nav">
          <!-- tab标签 -->
          <ul class="tab">
              <li 
                  v-for="(item,index) in tabs"
                  :key="index"
                  :class="index==num?'active':''"
                  @click="num=index"
              >{{item}}</li>
          </ul>
          <div class="navMore">
            <span class="iconfont icon-xiala"></span>
            <span class="iconfont icon-gengduo"></span>
          </div>
        </div>
        <!-- 搜索框 -->
        <SearchBox/>
        <!-- 个人信息 -->
        <MyLogin/>
        <!-- 活动 -->

    </div>
</template>

<script>
import MyLogin from '@/views/My/MyLogin.vue';
import SearchBox from '@/components/SearchBox.vue';
  export default {
    components: {
      SearchBox,
      MyLogin
    },
    data() {
      return {
          num: 0, //存储tab选中的下标
          tabs:['我的'], //tab数据
      }
    },
    methods: {
      
    },
  }
</script>

<style lang="less" scoped>
@import '~@/style/index.less';
.my {
  height: 100%;
  background: #FAFAFA;
  margin: 10/@rem 30/@rem 0 ;
  .nav {
    display: flex;
    .tab {
      flex: 1;
      li{
        margin-right: 40/@rem;
        padding-bottom: 10/@rem;
        display: inline-block;
        .f_s(30);
      }
      li.active {
        font-weight: bold;
        .f_s(34);
        border-bottom: 8/@rem solid @primary;
      }
    }
    .navMore{
      span.iconfont{
        .f_s(40);
        color: #8B8B8B;
        margin-left: 30/@rem;
      }
    }
  }
}
</style>