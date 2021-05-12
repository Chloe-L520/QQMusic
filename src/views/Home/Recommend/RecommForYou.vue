<template>
  <div class="recommen-foryou">
    <div class="song-supply">
      <div class="tit">
        <h4>为你推荐经典歌单</h4>
      </div>
      <div class="wrapper" ref="wrapper">
        <div class="content" :style="{width:(238+16)*6/75 + 'rem'}">
          <ul>
            <li
              v-for="item in top"
              :key="item.content_tid"
              @click="handleDetail(item.tid)"
            >
              <img :src="item.cover_url_small" alt="">
              <div class="amount">
                <span class="iconfont icon-zanting"> {{item.access_num | filterNum}}</span>
              </div>
              <p class="title">{{item.title}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getRecoPlayList} from '@/api/songsheet.js';
import BScroll from '@better-scroll/core';
export default {
  data() {
    return {
        recommlist: [],  //保存为你推荐歌单列表
    }
  },
  computed: {
    top() { //获取为你推荐歌单的前半部分
      return this.recommlist.slice(0, 6)
    }
  },
  created () {
    let id = 59
    getRecoPlayList(id).then(res=>{  //获取为你推荐经典歌单
        // console.log(res)
        this.recommlist = res.data.data.list
    });
  },
  mounted() {
    var bs = new BScroll(this.$refs.wrapper, {
      scrollX: true,
      click: true
    })
  },
  methods: {
    handleDetail(id) {
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
.recommen-foryou{
  .tit {
    #flex-between;
    h4 {
      .f_s(30);
    }
    .more {
      .f_s(24);
    }
  }
  .wrapper{
    width: 100%;
    .content{
      ul {
        display: flex;
        margin-top: 20/@rem;
        li {
          position: relative;
          margin-right: 16/@rem;
          img {
            .w(238);
            .h(238);
            border-radius: 10/@rem;
          }
          .amount {
            padding: 15/@rem 20/@rem;
            text-align: center;
            .f_s(18);
            border-radius: 48/@rem;
            background: #D5D0CD;
            z-index: 999;
            position: absolute;
            top: 200/@rem;
            left: 0;
            span {
              .f_s(18);
              color: #fff;
              vertical-align: middle;
            }
          }
          .title {
            .f_s(24);
            text-align: left;
          }
        }
      }
    }
  }
    
}
</style>