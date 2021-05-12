<template>
  <div class="songsheetdetail">
    <!-- 头部 -->
    <SongSheetInfo/>
    <!-- 内容区域-->
    <SongSheetList/>
  </div>
</template>

<script>
import SongSheetInfo from '@/views/Home/Recommend/SongSheetInfo';
import SongSheetList from '@/views/Home/Recommend/SongSheetList';
  export default {
    components: {
      SongSheetInfo,
      SongSheetList
    },
    
    
    mounted () {
      window.addEventListener('scroll', this.scrollLength);  //监听scroll
    },
    
  }
</script>

<style lang="less" scoped>
// 歌曲列表

</style>