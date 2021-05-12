<template>
  <div class="songsheet-list">
    <div class="content">
      <div class="con-top">
        <div class="top-left">
          <span class="iconfont paused icon-bofang"></span>
          <span class="word">全部播放</span>
          <span class="num">(520)</span>
        </div>
        <div class="top-right">
          <span class="iconfont icon-xiazai"></span>
          <span class="iconfont icon-yinleliebiao"></span>
        </div>
      </div>
      <!-- 歌曲列表 -->
      <div 
        class="song"
        v-for="(item,index) in songlist"
        :key="index"  
      >
        <span class="index">{{index}}</span>
        <div class="song-info" @click="handlePlay(index)">
          <h4>{{item.albumname}}</h4>
          <div class="song-intro">
            {{item.singer[0].name}}
          </div>
        </div>
        <div class="song-icon">
          <span class="iconfont icon-shipin"></span> 
          <!-- 播放icon-icon_bofang -->
          <span class="iconfont icon-qita" @click="showFunc"></span>
          
        </div>
      
      </div>
    </div>

    <!-- 功能弹窗 -->
    <FuncPopup :myFunc="isFunc" @changeFunc="handleFunc(isFunc)"/>
    
  </div>
</template>

<script>
import FuncPopup from '@/components/Popup/FuncPopup.vue'
import {getRecoSongList} from '@/api/songsheet.js';
  export default {
    components: {
      FuncPopup
    },
    data() {
      return {
        songlist: [], //记录歌单列表
        isFunc: false,  //弹窗的显示隐藏
        
      }
    },
    created () {
      let {id} = this.$route.query  //接收上一页传递的歌单id,content_id
      getRecoSongList(id).then(res=>{  //获取为你推荐歌单列表
        this.songlist = res.data.data.songlist
      })
    },
    methods: {
      handlePlay(idx) {  //点击跳转至页面播放歌曲
        this.$store.commit('player/curSongMut', idx)  //修改播放歌曲下标
        this.$store.commit('player/songListMut', this.songlist)  //初始化歌曲列表
        this.$router.push('/playersheet')
      },
      showFunc(){  //点击显示功能弹窗
        this.isFunc = true
      },
      handleFunc(isFunc){
        if(isFunc === 'false'){
          this.isFunc = true
        }else{
          this.isFunc = false
        }
      },
      
    },
  }
</script>

<style lang="less" scoped>
@import '~@/style/index.less';
.content {
  height: 100%;
  background: #fff;
  // color: #A9A9A9;
  padding: 0 30/@rem;
  .con-top {
    #flex-between;
    padding: 40/@rem 0 20/@rem;
    .top-left{
      .paused {
        .f_s(50);
        color: @primary;
        vertical-align: -20%;
      }
      .word{
        .f_s(28);
        margin: 0 12/@rem;
      }
      .num {
        .f_s(22);
      }
    }
    .top-right{
      color: @base-grey;
      .iconfont {
        .f_s(40);
        margin-left: 44/@rem;
      }
    }
  }
  .song {
    .h(124);
    #flex-between;
    .index{
      .f_s(28);
      color: #000;
      margin-right: 50/@rem;
    }
    .song-info{
      .w(490);
      h4 {
        .w(420);
        .f_s(30);
        text-overflow:ellipsis; 
        white-space:nowrap; 
        overflow:hidden;
      }
      .song-intro{
        color: @base-grey;
        .f_s(22);
        text-overflow:ellipsis; 
        white-space:nowrap; 
        overflow:hidden;
      }
    }
    .song-icon{
      .iconfont{
        .f_s(40);
        color: @base-grey;
        padding: 10/@rem;
      }
    }
  }
}
</style>