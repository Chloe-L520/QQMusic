<template>
  <div class="playbar">
    <!-- 音乐播放条 -->
    <div class="content">
      <div class="left">
        <span class="iconfont icon-weibiaoti-8_huaban1"></span>
        <span class="name">大风吹 - 王赫野</span>
      </div>
      <div class="right">
        <span class="iconfont icon-bofang"></span>  
        <!-- 播放icon-icon_bofang -->
        <span class="iconfont list-icon icon-yinleliebiao"></span>
      </div>
      <!-- 定位图片 -->
      <div class="fixed-img">
        <img src="http://y.gtimg.cn/music/photo_new/T001R150x150M0000025NhlN2yWrP4.webp" alt="">
      </div>
    </div>
    
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="less" scoped>
@import '~@/style/index.less';
.content {
  height: 90/@rem;
  border-radius: 45/@rem;
  #flex-between;
  background: @primary;
  color: #fff;
  margin: 0 30/@rem;
  padding: 0 35/@rem;
  position: relative;
  .left {
    .icon-weibiaoti-8_huaban1 {
      color: #000;
      .f_s(80);
    }
    .name {
      .f_s(26);
      vertical-align: 60%;
      margin-left: 20/@rem;
    }
  }
  .right {
    display: flex;
    align-items: center;
    span {
      .f_s(58);
      margin-left: 36/@rem;
    }
    .list-icon {
      .f_s(42);
    }
  }
  .fixed-img {
  .w(100);
  .h(100);
  position: absolute;
  left: 0;
  bottom: 0;
  img {
    width: 100%;
    border-radius: 10/@rem;
  }
}
}

</style>