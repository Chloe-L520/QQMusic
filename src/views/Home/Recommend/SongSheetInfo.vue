<template>
  <div class="songsheet-info">
    <div class="top">
      <!-- 头部背景 -->
      <div class="bg">
        <img :src="songlistInfo.logo" :key="songlistInfo.disstid" alt="">
      </div>
      <!-- 顶部导航 -->
      <div class="tab" v-show="showNav" >
        <span class="iconfont icon-zuo" @click="handleBack"></span>
        <span class="tit">歌单</span>
        <div>
          <van-cell @click="MorePopup" :border="false">
            <span class="iconfont icon-dian"></span>
          </van-cell>
        </div>
      </div>
      <!-- 隐藏导航 -->
      <div class="tab-wrapper" v-show="!showNav">
        <div class="bg-wrapper">
          <img :src="songlistInfo.logo" alt="">
        </div>
        <span class="iconfont icon-zuo" @click="handleBack"></span>
        <span class="tit">歌单</span>
        <div>
          <van-cell @click="MorePopup" :border="false">
            <span class="iconfont dot icon-dian"></span>
          </van-cell>
        </div>
      </div>
      <!-- 详情 -->
      <div class="detail">
        <div class="left">
          <img :src="songlistInfo.logo" alt="">
          <span class="iconfont icon-kefuzhongxin">
            {{songlistInfo.dissid | filterNum}}
          </span> 
          <!-- filterNum过滤器全局注册 -->
          <div class="line"></div>
        </div>
        <div class="right">
          <div class="tit">
            {{songlistInfo.dissname}}
          </div>
          <div class="info">
            <img :src="songlistInfo.headurl" alt="">
            <span class="name">{{songlistInfo.nickname}}</span>
            <button v-if="isShow">+ 关注</button>
            <button v-else>已关注</button>
          </div>
          <div class="intro" @click="handleIntro(songlistInfo.disstid)">
            简介: {{songlistInfo.desc}}
            <span class="iconfont icon-weibiaoti34"></span>
          </div>
        </div>
      </div>
      <!-- 图标区 -->
      <div class="iconlist">
        <span>
          <i class="iconfont icon-shoucang2"></i>
          {{songlistInfo.visitnum| filterNum}}
        </span>
        <span>
          <i class="iconfont icon-icon_huabanfuben"></i>
          {{songlistInfo.cur_song_num}}
        </span>
        <span class="share">
          <i class="iconfont icon-fenxiang" @click="showPopShare"></i>
          分享
        </span>
        
      </div>

    </div>

    <!-- 导航栏更多弹窗 -->
    <NavMorePopup :myMore="isMore" @changeMore="handleMore(isMore)"/>
    <!-- 分享弹窗 -->
    <SharePopup :myShare="isShare" @changeShare="handleShare(isShare)"/>

  </div>
</template>

<script>
import NavMorePopup from '@/components/Popup/NavMorePopup.vue';
import SharePopup from '@/components/Popup/SharePopup.vue';
import {getRecoSongList} from '@/api/songsheet.js';
  export default {
    components: {
      NavMorePopup,
      SharePopup,
    },
    data() {
      return {
        songlistInfo: [],  //记录歌单信息
        listid: '',  //记录歌单id
        showNav: true,  //记录导航栏的变化
        isMore: false,  //导航栏弹窗是否显示
        isShare: false,  // 分享弹窗是否显示
        isShow: true,  //关注按钮
        
      }
    },
    created () {
      let {id} = this.$route.query  //接收上一页传递的歌单id,content_id
      this.listid = id
      getRecoSongList(id).then(res=>{  //获取为你推荐歌单详情
      // console.log(res)
        this.songlistInfo = res.data.data
      })
    },
    mounted () {
      window.addEventListener('scroll', this.scrollLength);  //监听scroll
    },
   
    methods: {
      handleBack() {  //点击返回上一层
        this.$router.go(-1)
      },
      MorePopup() { //导航栏弹窗
        this.isMore = true;
      },
      showPopShare() { //分享弹窗
        this.isShare = true;
      },
      handleIntro(listid) {  //跳转至简介详情页
        this.$router.push({
          path: '/detailmore',
          query: {
            listid
          }
        })
      },
      handleMore(isMore){  //导航栏弹窗的显示和隐藏
        if(isMore === 'false'){
          this.isMore = true
        }else{
          this.isMore = false
        }
      },
      handleShare(isShare){  //分享弹窗的显示和隐藏
        if(isShare === 'false'){
          this.isShare = true
        }else{
          this.isShare = false
        }
      },
      scrollLength () {  //滚动显示隐藏导航栏
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop  
        //时刻检测窗口滚动的高度 scrollTop
        // const top = document.documentElement.scrollTop  
        //导航栏在页面中距离窗口顶部的高度 top
        if (scrollTop > 180) {
          this.showNav = false
        }
        if (scrollTop < 240) {
          this.showNav = true
        }
      }
    },
    beforeDestroy() {
    window.removeEventListener('scroll', this.scrollLength);  //销毁scroll
    },
  }
</script>

<style lang="less" scoped>
@import '~@/style/index.less';
.top {
  overflow: hidden;
  color: #F0F0F0;
  position: relative;
  .h(550);
  .bg{
    position: absolute;
    z-index: -9;
    width: 100%;
    height: 100%;
    filter: blur(5px);
    img{
      width: 100%;
      height: 130%;
    }
  }
  // 导航栏
  .tab {
    overflow: hidden;
    .h(50);
    padding: 30/@rem;
    #flex-between;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    .icon-zuo {
      .f_s(28);
    }
    .tit {
      .f_s(32);
    }
    .icon-dian {
      .f_s(40);
      color: #F0F0F0;
    }
    
  }
  // 隐藏导航栏
  .tab-wrapper {
    overflow: hidden;
    z-index: 999;
    .h(50);
    padding: 30/@rem;
    #flex-between;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    .bg-wrapper{
      position: absolute;
      left: -30/@rem;
      z-index: -9;
      overflow: hidden;
      width: 110%;
      height: 100%;
      filter: blur(1px);
      img{
        width: 100%;
        height: 100%;
        object-fit: cover
      }
    }
    .icon-zuo {
      .f_s(28);
    }
    .tit {
      .f_s(32);
    }
    .icon-dian {
      .f_s(40);
      color: #F0F0F0;
    }
    .van-popup {
      #flex-around;
      .iconlist {
        display: block;
        .icon {
          .w(100);
          .h(100);
          line-height: 100/@rem;
          text-align: center;
          border-radius: 14/@rem;
          .f_s(58);
          background: #fff;
          color: #F0F0F0;
          margin: 25/@rem;
        }
        .title {
          color: #5F5F5F;
          .f_s(22);
          text-align: center;
        }
      }
    }
  }
  // 歌单详情
  .detail {
    #flex-between;
    padding: 140/@rem 30/@rem 50/@rem;
    .left {
      .w(236);
      .h(236);
      margin-left: 20/@rem;
      position: relative;
      img {
        width: 100%;
        border-radius: 10/@rem;
      }
      .iconfont {
        .f_s(18);
        position: absolute;
        bottom: 10/@rem;
        right: 15/@rem;
      }
      .line {
        display: inline-block;
        .w(16);
        .h(200);
        border-radius: 5/@rem;
        background: @white4;
        position: absolute;
        top: 18/@rem;
        right: -16/@rem;
      }
    }
    .right {
      .w(400);
      .h(236);
      .tit {
        .w(350);
        .h(85);
        .f_s(30);
      }
      .info {
        display: flex;
        align-items: center;
        margin: 18/@rem 0 40/@rem;
        img {
          .w(50);
          .h(50);
          border-radius: 100%;
        }
        .name {
          .w(180);
          .f_s(24);
          margin: 0 20/@rem 0 12/@rem;
        }
        button {
          #button;
        }
      }
      .intro {
        .w(390);
        text-overflow:ellipsis; 
        white-space:nowrap; 
        overflow:hidden;
        .f_s(22);
        padding-right: 4/@rem;
        color: @white9;
        position: relative;
        span {
          display: inline-block;
          position: absolute;
          top: 6/@rem;
          right: 0;
          .f_s(12);
        }
      }
    }
  }
  // 图标区
  .iconlist {
    #flex-between;
    padding: 0 30/@rem;
    span {
      .f_s(26);
      width: 30%;
      text-align: center;
    }
    i {
      .f_s(50);
      padding-right: 18/@rem;
      vertical-align: -20%;
    }
    // 分享图标
    .share {
      .iconfont {
        .f_s(50);
        padding-right: 18/@rem;
      }
    }
  }
}
</style>