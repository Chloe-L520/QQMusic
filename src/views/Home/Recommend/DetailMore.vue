<template>
  <div class="detailmore">
    <div class="more">
      <!-- 背景图 -->
      <div class="bg">
        <img :src="songlistInfo.logo" alt="">
      </div>
      <!-- 导航 -->
      <div class="nav">
        <span class="iconfont icon-zuo" @click="handleBack"></span>
      </div>
      <!-- 内容区域 -->
      <div class="content">
        <div class="center">
          <img :src="songlistInfo.logo" alt="">
          <p>
            <img :src="songlistInfo.headurl" alt="">
            <span>{{songlistInfo.nickname}}</span>
          </p>
          <div class="icon">
            <span v-for="(item,index) in songlistTag" :key="index">{{item.name}}</span>
          </div>
        </div>
        <div class="desc" v-html="songlistInfo.desc"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {getRecoSongList} from '@/api/songsheet.js';
  export default {
    data() {
      return {
        songlistInfo: [],  //记录歌单详情
        songlistTag: [],  //记录歌单标签
      }
    },
    created () {
      let {listid} = this.$route.query;
      getRecoSongList(listid).then(res=>{
        console.log(res)
        this.songlistInfo = res.data.data
        this.songlistTag = res.data.data.tags
      })
    },
    methods: {
      handleBack() {
        this.$router.go(-1)
      }
    },
  }
</script>

<style lang="less" scoped>
@import '~@/style/index.less';
.more {
  width: 100%;
  height: 100%;
  .bg {
    position: absolute;
    z-index: -99;
    width: 100%;
    height: 100%;
    filter: blur(20px);
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .nav {
    padding: 30/@rem 30/@rem 0;
    span {
      color: #fff;
      .f_s(40);
    }
  }
  .content {
    padding: 0 30/@rem;
    color: #fff;
    .center {
      text-align: center;
      img {
        .w(388);
        .h(388);
      }
      p {
        img {
          .w(44);
          .h(44);
          border-radius: 100%;
          margin-right: 10/@rem;
          vertical-align: bottom;
        }
        span {
          .f_s(22);
        }
      }
      .icon {
        .f_s(26);
        span {
        margin: 0 12/@rem;
        padding: 10/@rem 20/@rem;
        border: 1/@rem solid #fff;
        border-radius: 24/@rem;
        }
      }
    }
    .desc {
      width: 100%;
      .h(500);
      .f_s(24);
      line-height: 40/@rem;
      margin-top: 30/@rem;
      color: #F5F5F5;
      overflow: hidden;
      text-overflow:ellipsis;
      display: -webkit-box;			
      /*必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。*/
      -webkit-line-clamp: 12;			
      /*用来限制在一个块元素显示的文本的行数。*/
      -webkit-box-orient: vertical;
    }
  }
}

</style>