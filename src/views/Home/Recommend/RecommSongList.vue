<template>
  <div class="recomm-songlist">
    <!-- 宝藏歌单 -->
    <div class="song-supply">
      <div class="tit">
        <h4>发现更多宝藏歌单</h4>
        <span class="more" @click="handleMore">更多> </span>
      </div>
      <div class="wrapper" ref="wrapper">
        <div class="content" :style="{width:(238+16)*6/75 + 'rem'}">
          <ul>
            <li
              v-for="(item,index) in top"
              :key="item.content_id"
              @click="handleDetail(item.content_id)"
            >
              <img :src="item.cover" alt="">
              <div class="amount">
                <span class="iconfont icon-zanting"> {{item.listen_num | filterNum}}</span>
              </div>
              <p class="title">{{item.title}}</p>
            </li>
          </ul>
          <ul>
            <li
              v-for="(itm,idx) in bottom"
              :key="itm.content_id"
              @click="handleDetail(itm.content_id)"
            >
              <img :src="itm.cover" alt="">
              <div class="amount">
                <span class="iconfont icon-zanting"> {{itm.listen_num | filterNum}}</span>
              </div>
              <p class="title">{{itm.title}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getRecoPlayListU} from '@/api/songsheet.js';
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
      },
      bottom() {  //获取为你推荐歌单的后半部分
        return this.recommlist.slice(6, 12)
      }
    },
    created () {
      getRecoPlayListU().then(res=>{  //获取为你推荐歌单
          console.log(res)
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
      handleMore() {  //点击更多跳转至分类歌单
        this.$router.push('/songsheet')
      },
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
.recomm-songlist{
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