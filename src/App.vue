<template>
  <div id="app">
    <router-view/>
    <router-view name="tabbar"></router-view>
  </div>
</template>

<script>
import {mapMutations} from 'vuex';
export default {
  created () {
    //提取取本地存储列表
    let list = localStorage.getItem('songList')  //提取本地存储歌曲列表字符串
    list = list ? JSON.parse(list) : []
    this.songListMut(list)

    let currentSong = localStorage.getItem('currentSong')  
    this.curSongMut(Number(currentSong))

    // 提取本地用户信息
    let uInfo = localStorage.getItem('userInfo')
    this.uInfoMut(JSON.parse(uInfo))
  },
  methods: {
    ...mapMutations({
      songListMut: 'player/songListMut',
      curSongMut: 'player/curSongMut',
      uInfoMut: 'userx/uInfoMut'
    })
  }
}
</script>

<style lang="less">


</style>
