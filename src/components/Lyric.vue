<template>
  <div class="lyric">
    {{text}}
  </div>
</template>

<script>
import { getLyric } from '@/api/singer.js';
import LrcParser from 'lyric-parser';
import {mapState} from 'vuex';
  export default {
    props:['songmid', 'seektime'],  //seektime是音乐当前的播放时间
    data() {
      return {
        text: '暂无歌词',  //记录歌词
      }
    },
    computed: {
      ...mapState({
        isPlay:state=>state.player.isPlay,
        currentSong:state=>state.player.currentSong
      })
    },
    watch: {
      isPlay(newPlay, oldPlay) {  //监听歌曲状态，同步改变歌词的播放。newPlay为当前检测到的isPlay最新的值
        if(!this.lrcObj) {return false}
        if(newPlay){
          this.lrcObj.play(this.seektime*1000) //如果play不传时间则会从头播放一次
        }else{
          this.lrcObj.stop()
        }
      },
      currentSong(){  //监听歌曲下标的变化
        this.playLrc()
      }
    },
    created () {
      this.playLrc()
    },
    methods: {
      playLrc() {//获取并加载歌曲歌词的方法
        getLyric(this.songmid).then(res=>{  
          // console.log(res)
          let lrc = res.data.data.lyric
          if(this.lrcObj) {//如果已经有歌词在播放，先关闭正在播放的歌词
            this.lrcObj.stop()
          }
          this.lrcObj = new LrcParser(lrc,(obj)=>{ //将字符串歌词，转换为歌词对象
            // console.log(obj)
            this.text = obj.txt
          })
          this.lrcObj.play()  //播放歌词
        })
      }
    },
  }
</script>

<style lang="less" scoped>
@import '~@/style/index.less';
.lyric{
  .h(100);
  .f_s(26);
  text-align: left;
  margin: 40/@rem 0 80/@rem;
  color: @white6;
}
</style>