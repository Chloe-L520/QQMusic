import { Toast } from "vant"
export default{
  namespaced: true,
  state: ()=>({
    isPlay: false,  //true为播放，false为暂停
    songList: [],  //待播放的歌曲列表数据
    currentSong: 0,  //正在播放的歌曲下标
    loop: 0,  //播放模式 0单曲 1顺序 2随机
    loopMode: [
      {title: '单曲循环',icon:'icon-xunhuan'},
      {title: '顺序循环',icon:'icon-icon-11'},
      {title: '随机播放',icon:'icon-icon-12'}
    ]
  }),
  mutations: {
    isPlayMut(state,bool){ //修改isPlay的mutation
      state.isPlay = bool
      
    },
    songListMut(state,list) {  //初始化歌曲列表数据
      state.songList = list
      localStorage.setItem('songList',JSON.stringify(list))//本地存储存放歌曲列表
    },
    curSongMut(state,idx){  //修改正在播放的歌曲下标（上一曲，下一曲，顺序，随机）
      state.currentSong = idx
      localStorage.setItem('currentSong',idx)
    },
    loopMut(state) {  //改变播放模式
      let {loop, loopMode} = state
      loop = loop < 2 ? ++loop : 0
      Toast({
        message: loopMode[loop].title,
        icon: 'like-o'
      })
      state.loop = loop
    }
  }
}