<template>
  <div class="plop">
    <!-- tab标签 -->
    <div class="nav">
      <ul class="tab">
        <li 
          v-for="(item,index) in tabs" 
          :key="index"
          :class="index==num?'active':''"
          @click="num=index"
        >{{item}}</li>
      </ul>
      <span class="iconfont icon-genzongjilu"></span>
    </div>
    <!-- 搜索框 -->
    <SearchBox/>
    <!-- tab内容 -->
    <div class="content">
      <div v-if="num==0">广场的内容</div>
      <div v-else-if="num==1">关注的内容</div>
    </div>
  </div>
</template>
<script>
import SearchBox from '../components/SearchBox.vue';
export default {
  components: {
    SearchBox
  },
  data() {
    return {
      num: 0, //存储tab选中的下标
      tabs: ['广场','关注']  //tab数据
    }
  },
}
</script>
<style lang="less" scoped>
@import '../style/index.less';
.plop {
  margin: 10/@rem 30/@rem 0 ;
}
.iconfont {
  .f_s(60);
}
.nav {
  #flex-between;
  .tab{
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
  span {
    color: @primary;
  }
}
</style>