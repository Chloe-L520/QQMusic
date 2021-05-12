<template>
  <div class="songlist">
    <h4>{{searchsong.name}}</h4>
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
        // console.log(res)
        // this.searchinfo = res.data.data
        let {album,mv,singer,song} = res.data.data
        // this.searchalbum = album
        // this.searchmv = mv
        // this.searchsinger = singer
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
  h4{
    .f_s(32);
    margin: 30/@rem 0;
  }
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