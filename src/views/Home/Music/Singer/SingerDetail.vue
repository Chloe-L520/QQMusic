<template>
  <div class=“singerdetail>
    <!-- 头部 -->
    
    <div class="top">
			<div class="nav" id="nav" :style="{background:color}">
        <span class="iconfont icon-zuo" @click="handleBack"></span>
        <h4 v-show="isShow">{{singer.name}}</h4>
        <div class="nav-right">
          <span 
            class="iconfont shareicon icon-fenxiang"
            @click="clickShare"
          ></span>
          <span class="iconfont icon-qita" @click="handleMore"></span>
          <!-- 导航栏更多 -->
          <van-popup 
            v-model="isMore"
            :style="{ height: '40%' }"
            position="bottom"
            closeable
            close-icon="cross"
            close-icon-position="top-right"
          > 
          <div class="more">
            <div class="moreicon">
              <span class="iconfont icon-jubao"></span>
            </div>
            <div class="title">举报</div>
          </div>
          </van-popup>
        </div>
      </div>

      <!-- 背景图片 -->
      <div class="bg" :style="{'background-image': `url(https://y.gtimg.cn/music/photo_new/T001R300x300M000${singermid}.jpg?max_age=2592000)`}" ref="'img'">

      <!-- 歌手基础信息 -->
      <div class="singerbase">
        <div class="left">
          <h4>{{singer.name}}</h4>
          <span>{{singer.fans | filterNum}}</span>
        </div>
        <div class="right">
          <button>+ 关注</button>
        </div>
      </div>

		</div>

		</div>

    
    
    <!-- 标签页 -->
    <SingerDetailTab/>

    <!-- 分享弹窗 -->
    <SharePopup :myShare="isShare" @changeShare="handleShare(isShare)"/>

  </div>
</template>

<script>
import SharePopup from '@/components/Popup/SharePopup.vue';
import SingerDetailTab from '@/views/Home/Music/Singer/SingerDetailTab';
import {getSingerSongs} from '@/api/singer.js';
  export default {
    components: {
      SingerDetailTab,
      SharePopup
    },
    data() {
      return {
        singermid: '',  //存储歌手mid
        singer: {},  //存储歌手基本信息
        color: "rgba(0,0,0,0)",  //头部导航初始背景色
        isShow: false, //导航栏歌手名字
        isShare: false,  //分享弹窗
        isMore: false,  // 导航栏更多
      }
    },
    created () {
      let {id} = this.$route.query;
      this.singermid = id
      getSingerSongs(id).then(res=>{
        this.singer = res.data.data.singer
      })
    },
    mounted() {
      //首先，在mounted钩子window添加一个滚动滚动监听事件
      window.addEventListener("scroll", this.handleScroll);
    },
    methods: {
      handleBack(){
        this.$router.go(-1)
      },
      clickShare() {
        this.isShare = true
      },
      handleMore() {
        this.isMore = true
      },
      handleShare(isShare){
        if(isShare === 'false'){
          this.isShare = true
        }else{
          this.isShare = false
        }
      },
      //在方法中，添加这个handleScroll方法来获取滚动的位置
      handleScroll() {
        let scrollTop =
          window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        // let offsetTop = document.querySelector("#top").offsetTop;
        //设置背景颜色的透明度
        if (scrollTop) {
          this.color = `rgba(0, 0, 0,${scrollTop / (scrollTop + 40)})`;
          this.isShow = true
          this.isShare= false
        } else if (scrollTop == 0) {
          this.color = "transparent";
          this.isShow = false
          this.isShare= false
        }
      }
    },
    //由于是在整个window中添加的事件，所以要在页面离开时摧毁掉，否则会报错
    beforeDestroy() {
      window.removeEventListener("scroll", this.handleScroll);
    }
  }
</script>

<style lang="less" scoped>
@import '~@/style/index.less';
// 头部
.top {
  .h(670);
  border-radius: 0 0 10% 10%;
  position: relative;
  overflow: hidden;
  .nav {
    .h(100);
    #flex-between;
    padding: 0 30/@rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    h4 {
      color: #fff;
      .f_s(34);
      margin-left: 90/@rem;
    }
    .iconfont{
      .f_s(40);
      color:#fff;
    }
    .nav-right {
      display: flex;
      .shareicon {
        margin: 0 35/@rem;
      }
      // 分享弹窗
      .sharelist {
        padding: 100/@rem 30/@rem;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .share {
          width: 20%;
          text-align: center;
          .icon-bg {
            .w(90);
            .h(90);
            background: #fff;
            border-radius: 20/@rem;
            line-height: 90/@rem;
            margin-left: 18%;
          }
          .title {
            margin: 20/@rem 0 50/@rem;
            color: #000;
            .f_s(22);
          }
        }
      }
      .more {
        z-index: 1;
        padding: 100/@rem 30/@rem;
        .moreicon {
          .w(90);
          .h(90);
          line-height: 90/@rem;
          background:#fff;
          text-align: center;
          border-radius: 20/@rem;
          .iconfont{
            color: #000;
            .f_s(50);
          }
        }
        .title{
          .w(90);
          .f_s(22);
          text-align: center;
          margin: 30/@rem 0 50/@rem;
        }
      }
    }
  }
  // 背景图片
  .bg{
    width: 100%;
    background: none center center;
    background-size: cover;
    .h(670);
  }

  // 歌手基础信息
  .singerbase{
    #flex-between;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 60/@rem;
    padding: 0 30/@rem;
    .left {
      color:#fff;
      .f_s(36);
      span {
        .f_s(22);
        margin-top: 100/@rem;
        color: #EBEAF2;
      }
    }
    .right {
      color: #000;
      button {
        padding: 12/@rem 24/@rem;
        border-radius: 50/@rem;
        border: none;
        background: #fff;
        .f_s(26);
      }
    }
  }
}

</style>