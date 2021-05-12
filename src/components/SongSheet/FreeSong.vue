<template>
  <div class="freesong">
    <ul class="freesonglist">
      <li
        v-for="item in freesonglist"
        :key="item.tid"
        @click="handleDetail(item.tid)"
      >
        <div class="pic">
          <img :src="item.cover_url_small" alt="">
          <div class="num">
            <span class="iconfont icon-kefuzhongxin"></span>
            {{item.access_num | filterNum}}
          </div>
          <span class="iconfont icon-ziyuan"></span>
        </div>
        <div class="title">{{item.title}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import {getRecoPlayList} from '@/api/songsheet.js';
  export default {
    data() {
      return {
        freesonglist: [],  //存储官方推荐歌单
      }
    },
    created () {
      let id = 3056
      getRecoPlayList(id).then(res=>{  //获取官方推荐歌单，默认id为3317官方推荐歌单id
        // console.log(res)
        this.freesonglist = res.data.data.list
      })
    },
    methods: {
      handleDetail(id) {  //跳转至歌单详情
        this.$router.push({
          path: '/songsheetdetail',
          query:{
            id
          }
        })
      }
    },
  }
</script>

<style lang="less" scoped>
@import '~@/style/index.less';
.freesong{
  margin: 180/@rem 30/@rem 0;
  .freesonglist{
    display: flex;
    flex-wrap: wrap;
    li{
      box-sizing: border-box;
      width: 31%;
      margin: 0 8/@rem;
      .pic{
        position: relative;
        img{
          width: 100%;
          height: 100%;
          border-radius: 15/@rem;
        }
        // 播放量
        .num{
          position: absolute;
          bottom: 18/@rem;
          left: 12/@rem;
          color: @white;
          .f_s(24);
          vertical-align: center;
          span {
            vertical-align: center;
          }
        }
        // 播放键
        .icon-ziyuan{
          position: absolute;
          right: 10/@rem;
          bottom: 20/@rem;
          color: @white;

        }
      }
      .title{
        .f_s(24);
        margin: 22/@rem 0 60/@rem;
        // 文字超出两行部分显示省略号
        overflow:hidden; 
        text-overflow:ellipsis;
        display:-webkit-box; 
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2; 
      }
    }
  }
}

</style>