<template>
  <div class="songlist">
    <ul class="song-info">
      <li
        v-for="(item,index) in searchsong.itemlist"
        :key="index"
      >
        <div class="info">
          <div class="song">{{item.name}}</div>
          <div class="singer">{{item.singer}}</div>
        </div>
        <div class="icon">
          <span class="iconfont icon-shipin1"></span>
          <span class="iconfont icon-qita"></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {getSearchQuick} from '@/api/singer.js';
  export default {
    data() {
      return {
        searchsong: {},
      }
    },
    created() {
      let {key} = this.$route.query
      // console.log(vid)
      // console.log(key)
      getSearchQuick(key).then(res=>{  //获取热搜词搜索信息
        let {song} = res.data.data
        this.searchsong = song
      })
      // getMVUrl(vid).then(res=>{
      //   console.log(res)
      // })
    },
  }
</script>

<style lang="less" scoped>
@import '~@/style/index.less';
.songlist {
  .song-info {
    li{
      #flex-between;
      margin-bottom: 50/@rem;
      .iconfont{
        .f_s(40);
        color: @base-grey;
        margin-left: 40/@rem;
      }
      .info{
        .song{
          .f_s(28);
          color: @primary;
          font-weight: bold;
        }
        .singer{
          .f_s(22);
          color: @base-grey;
          margin-top: 10/@rem;
        }
      }
    }
  }
}
</style>