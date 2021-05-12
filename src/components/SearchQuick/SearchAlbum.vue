<template>
  <div class="search-album">
    <ul class="album">
      <li
        v-for="(item,index) in searchalbum.itemlist"
        :key="index"
      >
        <div class="info">
          <img :src="item.pic" alt="">
          <div class="name">
            <h4>{{item.name}}</h4>
            <div>{{item.singer}}</div>
          </div>
        </div>
        <span class="iconfont icon-weibiaoti34"></span>
      </li>
    </ul>
  </div>
</template>

<script>
import {getSearchQuick} from '@/api/singer.js';
import Bus from '@/assets/js/bus'
  export default {
    data() {
      return {
        searchalbum: {},
        key: '',
      }
    },
    created() {
      // let {key} = this.$route.query
      // getSearchQuick(this.key).then(res=>{  //获取热搜词搜索信息
      //   // console.log(res)
      //   this.searchalbum = res.data.data.album
      // })
    },
    mounted () {
      // 用$on监听事件并接收数据
      Bus.$on('msg', (e) => {
        this.key = e
        console.log(e)
        console.log(this.key)
      })
    },
  }
</script>

<style lang="less" scoped>
@import '~@/style/index.less';

</style>