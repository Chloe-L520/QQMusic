<template>
  <div class="player">
    <div class="content">
      <!-- 头部 -->
      <div class="top">
        <span class="iconfont down icon-zhcc_xiangxiajiantou"></span>
        <ul>
          <li>推荐</li>
          <i></i>
          <li class="active">歌曲</li>
          <i></i>
          <li>歌词</li>
        </ul>
        <div class="share">
          <div class="live-box">
            <div class="live-broadcase"></div>
            <div class="live-img"></div>
          </div>
          <span class="iconfont icon-fenxiang"></span>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="conbox">
        <!-- 背景 --> 
        <div class="bg">
          <img :src="`https://y.gtimg.cn/music/photo_new/T002R300x300M000${song.albummid}.jpg`" alt="">
        </div>

        <!-- 专辑图片 -->
        <div class="img">
          <img :class="['cd',isPlay?'':'paused']" :src="`https://y.gtimg.cn/music/photo_new/T002R300x300M000${song.albummid}.jpg`" alt="">
        </div>

        <!--歌手  -->
        <div class="info">
          <h4 class="songname">{{song.name}}</h4>
          <span class="singername">{{song.singer[0].name}}</span> 
          <span class="follow">+ 关注</span>
        </div>

        <!-- 歌词 -->
        <lyric :songmid="song.songmid" :seektime="starttime"/>

        <!-- 进度条 -->
        <MyProgress
          :startTime='starttime'
          :endTime='endtime'
          @trans-time="handleSeekTime"
        ></MyProgress>

        <!-- 播放 -->
        <div class="control">
          <span 
            class="iconfont playmode" 
            :class="playMode.loopMode[playMode.loop].icon"
            @click="loopMut"
          ></span>

          <div class="play">
            <span 
              class="iconfont icon-shangyishou-yuanshijituantubiao"
              @click="handlePrev()"
            ></span>
            <span 
              class="iconfont" 
              :class="isPlay?'icon-icon_bofang':' icon-bofang'" 
              @click="handleToggle()"
                
            ></span>
            <span 
              class="iconfont icon-xiayishou-yuanshijituantubiao"
              @click="handleNext()"
            ></span>
          </div>
          <span 
              class="iconfont list icon-icon-1"
              @click="show=true"
          ></span>
        </div>

      <!-- 播放器 -->
      <audio 
        autoplay
        :src="songurl" 
        ref="mAudio"
        @canplay="canplay"
        @timeupdate="timeupdate"
        @ended="ended"
      >播放器</audio>

      </div>

      <!-- 弹出的歌曲列表 -->
      <van-overlay :show="show" @click="show=false">
        <PlayList />
      </van-overlay>

    </div>
  </div>
</template>

<script>
import MyProgress from '@/components/MyProgress.vue';
import Lyric from '@/components/Lyric.vue';
import PlayList from '@/components/PlayList.vue';
import {getSongUrl} from '@/api/singer.js';
import { mapMutations } from 'vuex';
  export default {
    components: {
      MyProgress,
      Lyric,
      PlayList
    },
    data() {
      return {
        songurl: '',  //存储歌曲播放地址
        starttime: 0,  //存储当前歌曲的当前播放时间
        endtime: 0,  //存储当前歌曲总时长
        show: false,  //歌曲列表弹出层
      }
    },
    computed: {
      isPlay() {
        return this.$store.state.player.isPlay
      },
      song() {  //从状态机中提取歌曲信息
        console.log(this.$store.state.player)
        let {songList, currentSong} = this.$store.state.player
        return songList[currentSong]
      },
      songInfo(){
        let {songList, currentSong} = this.$store.state.player
        return{
          songList,
          currentSong
        }
      },
      playMode(){
        let {loop, loopMode} = this.$store.state.player
        return {
          loop,
          loopMode
        }
      }
    },
    watch: {
      isPlay() {
        let mAudio = this.$refs.mAudio
        this.isPlay ? mAudio.play():mAudio.pause()
      },
      songInfo(){  //监听列表歌曲的切换，重新获取播放链接
        this.setAudioUrl()
      }
    },
    created () {
      this.setAudioUrl()
    },
    methods: {
      ...mapMutations({
        loopMut:'player/loopMut',
        isPlayMut: 'player/isPlayMut',
        curSongMut: 'player/curSongMut'
      }),
      canplay() {  //监听音频文件准备好后，直接触发
        let mAudio = this.$refs.mAudio
        let start = mAudio.currentTime
        let end = mAudio.duration
        this.starttime = start
        this.endtime = end
        mAudio.play()
        this.$store.commit('player/isPlayMut',true)        
      },
      timeupdate() {  //audio的播放时间发生变化时，会触发，每秒4-66次
        let mAudio = this.$refs.mAudio
        let start = mAudio.currentTime
        this.starttime = start
      },
      handleToggle() {  //控制播放暂停
        this.$store.commit('player/isPlayMut',!this.isPlay)        
      },
      handlePrev(){  //上一曲
        let {songList,currentSong} = this.songInfo
        let n = currentSong - 1
        if(n<0){
          n = songList.length - 1
        }
        this.$store.commit('player/curSongMut',n)
        this.setAudioUrl()
      },
      setAudioUrl() {  //获取歌曲mid,获取并设置歌曲地址
        let songmid = this.song.songmid
        getSongUrl(songmid).then(res=>{  //获取歌曲mid获取播放地址
        // console.log(res)
          this.songurl = res.data.data[songmid]
        })
      },
      handleNext(){  //下一曲
        let {songList,currentSong} = this.songInfo
        let n = currentSong + 1
        if(n>=songList.length){
          n = 0
        }
        this.$store.commit('player/curSongMut',n)
        this.setAudioUrl()
      },
      ended() {
        this.isPlayMut(false)
        switch(this.playMode.loop){
          case 1://顺序播放
            this.handleNext()
            break;
          case 2: //随机播放
            let {songList} = this.songInfo
            let num = Math.floor(Math.random()*songList.length)
            this.curSongMut(num)
            this.setAudioUrl()
            break
          default://单曲循环
            this.$refs.mAudio.currentTime = 0
            break;
        }
      },
      handleSeekTime(t) {
        // console.log(t)
        this.$refs.mAudio.currentTime = t
      }
    },
  }
</script>

<style lang="less" scoped>
@import '../style/index.less';
.iconfont{
  color: @white;
}
.player{
  .content{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .top{
      font-size: 26/@rem;
      #flex-between;
      padding: 48/@rem 44/@rem;
      .down{
        .f_s(40);
      } 
      ul {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 88/@rem;
        li{
          padding: 0 20/@rem;
          color: @white6;
        }
        li.active{
          color: @white;
        }
        i{
          .w(1);
          .h(10);
          background: @white6;
        }
      }
      .share{
        .live-box{
          // .w(60);
          // .h(60);
          display: inline-block;
          vertical-align: middle;
          .live-broadcase{
            .w(60);
            .h(60);
            border: 1/@rem solid @white;
            border-radius: 50%;
            position: relative;
            .live-img{
              .w(42);
              .h(42);
              border: 1/@rem solid @white;
              border-radius: 50%;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%,-50%);
              // margin: -21/@rem 0 0 -21/@rem;
            }
          }
          
        }
        .icon-fenxiang{
          text-align: center;
          .f_s(50);
          vertical-align: middle;
          margin-left: 28/@rem;
        }
      }
    }
    // 内容区域
    .conbox{
      padding: 0 65/@rem;
      .bg{
        position: absolute;
        z-index: -9;
        top: 0px;
        right: 0;
        left: 0;
        width: 100%;
        height: 100%;
        filter: blur(15px);
        img{
            width: 100%;
            height: 100%;
        }
      }
      .img{
        text-align: center;
        .w(580);
        box-sizing: border-box;
        img{
          .w(580);
          border-radius:50%;
          border: 10px solid #ccc; 
        }
        & .cd{
          animation: rotate 10s linear infinite;
        }
        & .paused{
          animation-play-state: paused;
        }
          
      }
      .info{
        .songname {
          .f_s(50);
          color: @white;
        }
        .singername {
          .f_s(26);
          color: @white6;
        }
        .follow {
          .f_s(20);
          color: @white6;
          border: 1/@rem solid @white6;
          border-radius: 32/@rem;
          padding: 6/@rem 12/@rem;
          margin-left: 15/@rem;
        }
      }
      .control{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 40/@rem;
        .playmode{
          margin: 0 10/@rem;
        }
        .iconfont{
          .f_s(80);
        }
        .play{
          display: flex;
          justify-content: center;
          align-items: center;
          span{
            margin: 0 10/@rem;
          }
          .ctrl{
            margin: 0 30/@rem;
          }
        }
        .list{
          .f_s(60)
        }
      }
    }
  }
}
@keyframes rotate {
  0% {
  transform: rotate(0deg)
  }
  100%{
  transform: rotate(360deg)
  }
}
</style>