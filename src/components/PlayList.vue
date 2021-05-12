<template>
  <div class="playlist">
    <!-- <van-cell-group> -->
      <div class="wrapper" ref="wrapper">
        <div class="content">
          <van-cell 
            v-for="(item,index) in songList"
            :key="index"
            :title="item.name + ' - ' + item.singer[0].name" 
            @click="curSongMut(index)"
            value="" 
          />
          <!-- <div class="song" v-for="(item,index) in songList" :key="index">
            {{item.name}}
             - {{item.singer[0].name}}
          </div> -->
        </div>
      </div>
    <!-- </van-cell-group> -->
  </div>
</template>

<script>
import BScroll from '@better-scroll/core';
import { mapState,mapMutations } from 'vuex'
  export default {
    computed: {
      ...mapState({
        songList: state=>state.player.songList
      })
    },
    created () {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {})
          console.log(this.scroll)
        }
      });
    },
    mounted() {
      var bs = new BScroll(this.$refs.wrapper, {
        scrollY: true,
        click: true
      })
    },
    methods: {
      ...mapMutations({
        curSongMut: 'player/curSongMut'
      })
    },
  }
</script>

<style lang="less" scoped>
@import '~@/style/index.less';
.playlist{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  .wrapper{
    width: 100%;
    .h(800);
    background: rgba(0,0,0,0.3);
    // filter: blur(2px);
    .content{
      width: 100%;
      .h(1600);
      .song {
        .h(90);
        line-height: 90/@rem;
        color: #fff;
        .f_s(28);
        padding-left: 30/@rem;
      }
    }
  }
}
</style>