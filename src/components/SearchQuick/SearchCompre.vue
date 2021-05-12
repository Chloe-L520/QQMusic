<template>
  <div>
    <!-- 为你推荐 -->
    <div class="recommend" v-show="singerlist!=undefined ||singerlist.length>0">
      <div class="title">为你推荐</div>
      <div class="singer-info">
        <div class="info-left" v-if="singerlist[0].pic">
          <img :src="singerlist[0].pic" alt="">
          <div class="info">
            <div>{{searchsinger.name}}</div>
            <h4>{{singerlist[0].singer}}</h4>
            <div class="num">歌曲:<span>{{searchsong.count}}</span> 专辑:<span>{{searchalbum.count}}</span> 视频:<span>{{searchmv.count}}</span></div>
          </div>
        </div>
        <div class="info-right">
          <button>+ 关注</button>
        </div>
      </div>
    </div>
    <!-- mv -->
    <div class="mv">
      <div class="video">
        <!-- 使用组件video-player -->
        <video-player
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
        ></video-player>
      </div>
      <div class="mv-info"></div>
    </div>
    <!-- 单曲 -->
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
    
  </div>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
import {getSearchQuick,getMVUrl} from '@/api/singer.js';
  export default {
    components:{
      videoPlayer
    },
    data() {
      return {
        searchinfo: {},  //存储搜索歌曲信息
        searchalbum: {},
        searchmv: {},
        searchsinger: {},
        searchsong: {},
        singerlist: [],
        mvlist: [],
        playerOptions: {  //视频播放组件
          playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
          autoplay: false, // 如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '4:3', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          // sources: [
          //   {
          //     src: '', // 路径
          //     type: 'video/mp4' // 类型
          //   },
          //   {
          //     src: '//path/to/video.webm',
          //     type: 'video/webm'
          //   }
          // ],
          // poster: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3612873308,1721476889&fm=26&gp=0.jpg', // 你的封面地址
          // // width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true // 全屏按钮
          }
        }
      }
    },
    created() {
      let {key} = this.$route.query
      // let {vid} = this.mvlist[0]
      // console.log(vid)
      // console.log(key)
      getSearchQuick(key).then(res=>{  //获取热搜词搜索信息
        // console.log(res)
        this.searchinfo = res.data.data
        this.singerlist = res.data.data.singer.itemlist
        this.mvlist = res.data.data.mv.itemlist
        let {album,mv,singer,song} = res.data.data
        this.searchalbum = album
        this.searchmv = mv
        this.searchsinger = singer
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
#info-style{
  #flex-between;
  .h(170);
  background: @white;
  padding: 0 20/@rem;
  margin-bottom: 20/@rem;
  border-radius: 10/@rem;
}
.title {
  .f_s(22);
  color: @base-grey;
  margin-bottom: 15/@rem;
}
// 为你推荐
.singer-info {
  #info-style;
  .info-left {
    display: flex;
    img {
      .w(120);
      .h(120);
      margin-right: 20/@rem;
      border-radius: 10/@rem;
    }
    .info{
      div{
        color: @base-grey;
        .f_s(20);
      }
      h4 {
        .f_s(24);
        margin: 10/@rem 0;
      }
    }
  }
  .info-right {
    button {
      #button;
    }
  }
}
// mv
.mv-info {
  #info-style;
  .video{
    .w(240);
    .h(130);
  }
}
// 单曲
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
// 视频video
.content_video .video-js .vjs-big-play-button {
    font-size: 1.5em ;
    width: 2.5em;
    border-radius: 50%;
    top: 40%;
    left: 45%;
  }
.content_video {
  text-align: left;
  padding: 0 7%;
}
</style>