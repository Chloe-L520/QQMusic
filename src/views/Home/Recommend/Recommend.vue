<template>
  <div class="recommend">
    <SearchBox/>
    <RecommSongList/>
    <RecommForYou/>
  </div>
</template>

<script>
import SearchBox from '@/components/SearchBox.vue';
import RecommSongList from '@/views/Home/Recommend/RecommSongList.vue' 
import RecommForYou from '@/views/Home/Recommend/RecommForYou.vue'
export default {
  components: {
    SearchBox,
    RecommSongList,
    RecommForYou
  },
}
</script>

<style lang="less" scoped>
@import '~@/style/index.less';
.recommend{
  margin: 90/@rem 0 100/@rem;
}
</style>