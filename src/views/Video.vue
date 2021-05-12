<template>
  <div class="video">
    <!-- tab标签 -->
    <div class="tab-wrapper" ref="tabWrapper">
      <ul class="tab" ref="tab" :style="{width:130*10/75+'rem'}">
        <li 
          v-for="(item,index) in tabs" 
          :key="index"
          :class="index==num?'active':''"
          @click="num=index"
        >{{item}}</li>
    </ul>
    </div>
    <!-- 搜索框 -->
    <SearchBox/>
    <!-- tab内容 -->
    <div class="content">
      <div v-if="num==0">推荐的内容</div>
      <div v-else-if="num==1">音乐现场的内容</div>
      <div v-else-if="num==2">MV的内容</div>
      <div v-else-if="num==3">THE live的内容</div>
      <div v-else-if="num==4">大牌直播的内容</div>
      <div v-else-if="num==5">说唱的内容</div>
      <div v-else-if="num==6">翻唱的内容</div>
      <div v-else-if="num==7">影视剧的内容</div>
      <div v-else-if="num==8">舞蹈的内容</div>
      <div v-else>二次元的内容</div>
    </div>
  </div>
</template>

<script>
import SearchBox from '../components/SearchBox.vue';
import BScroll from '@better-scroll/core';
export default {
  components: {
    SearchBox
  },
  data() {
    return {
      num: 0,  //存储tab选中的下标
      tabs: ['推荐','音乐现场','MV','THE live','大牌直播','说唱','翻唱','影视剧','舞蹈','二次元',]  //tab数据
    }
  },
  mounted() {
    let bs = new BScroll(this.$refs.tabWrapper, {
      scrollX: true,
      click: true
    })
  },
}
</script>
<style lang="less" scoped>
@import '../style/index.less';
.video {
  margin: 10/@rem 30/@rem 0 ;
}
.tab-wrapper {
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  .tab{
    // width: 200%; //动态绑定宽度
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
}
</style>