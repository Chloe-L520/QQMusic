import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Video from '../views/Video.vue'
import Plop from '../views/Plop.vue'
import My from '../views/My.vue'
import Reg from '../views/Reg.vue'
import Login from '../views/Login.vue'

// 全局子组件
import Search from '@/components/Search.vue'
import SearchBox from '@/components/SearchBox.vue'
import SearchQuick from '@/components/SearchQuick/SearchQuick.vue'
import TabBar from '@/components/TabBar.vue'
import Player from '@/components/Player.vue'
import PlayerSheet from '@/components/PlayerSheet.vue'
import PlayBar from '@/components/PlayBar.vue'
import SharePopup from '@/components/Popup/SharePopup.vue'
import SetCookie from '@/components/SetCookie.vue'

// 歌单分类
import SongSheet from '@/components/SongSheet.vue'
import Recomm from '@/components/SongSheet/Recomm.vue'
import Official from '@/components/SongSheet/Official.vue'
import Classic from '@/components/SongSheet/Classic.vue'
import LoveSong from '@/components/SongSheet/LoveSong.vue'
import KtvSong from '@/components/SongSheet/KtvSong.vue'
import FreeSong from '@/components/SongSheet/FreeSong.vue'

import SongSheetSort from '@/components/SongSheet/SongSheetSort.vue'


// 首页
import Recommend from '@/views/Home/Recommend/Recommend'
import RecommSongList from '@/views/Home/Recommend/RecommSongList.vue' 
import RecommForYou from '@/views/Home/Recommend/RecommForYou.vue' 
import SongSheetDetail from '@/views/Home/Recommend/SongSheetDetail.vue' 
import SongSheetInfo from '@/views/Home/Recommend/SongSheetInfo.vue' 
import SongSheetList from '@/views/Home/Recommend/SongSheetList.vue' 
import DetailMore from '@/views/Home/Recommend/DetailMore.vue' 

// 快速搜索
import SearchCompre from '@/components/SearchQuick/SearchCompre.vue'
import SearchSong from '@/components/SearchQuick/SearchSong.vue'
import SearchMV from '@/components/SearchQuick/SearchMV.vue'
import SearchAlbum from '@/components/SearchQuick/SearchAlbum.vue'
import SearchSinger from '@/components/SearchQuick/SearchSinger.vue'

import Music from '@/views/Home/Music/Music.vue'
import Radio from '@/views/Home/Radio/Radio.vue'
import Podcast from '@/views/Home/Podcast/Podcast.vue'


import Singer from '@/views/Home/Music/Singer.vue'
import SingerDetail from '@/views/Home/Music/Singer/SingerDetail.vue'
import SingerDetailTab from '@/views/Home/Music/Singer/SingerDetailTab.vue'




Vue.use(VueRouter)

const routes = [
  {
    path: '/reg',
    name: 'reg',
    component: Reg
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },

  // 首页
  {
    path: '/',
    redirect: '/home/recommend',  //重定向
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/home/recommend',
    components: {
      // default: () => import('@/views/Home.vue'),
      default: Home,
      // playbar: PlayBar,
      tabbar: TabBar
    },
    children: [
      {
        path: 'recommend',
        name: 'recommend',
        components: {
          default: Recommend
        },
        children: [
          {
            path: 'recommsonglist',
            name: 'recommsonglist',
            component: RecommSongList
          },
          {
            path: 'recommforyou',
            name: 'recommforyou',
            component: RecommForYou
          },
        ]
      },
      {
        path: 'music',
        name: 'music',
        components: {
          default: Music
        },
        // props: {default: true, searchbox: false}
      },
      {
        path: 'radio',
        name: 'radio',
        components: {
          default: Radio
        }
      },
      {
        path: 'podcast',
        name: 'podcast',
        components: {
          default: Podcast
        }
      },
    ]
  },

  // 为你推荐歌单
  {
    path: '/songsheetdetail',
    name: 'songsheetdetail',
    component: SongSheetDetail
  },
  {
    path: '/songsheetinfo',
    name: 'songsheetinfo',
    component: SongSheetInfo
  },
  {
    path: '/songsheetlist',
    name: 'songsheetlist',
    component: SongSheetList
  },
  {
    path: '/detailmore',
    name: 'detailmore',
    component: DetailMore
  },

  {
    path: '/video',
    name: 'video',
    components: {
      default: Video,
      tabbar: TabBar
    }
    // component: () => import(/* webpackChunkName: "about" */ '../views/Video.vue')
  },
  {
    path: '/plop',
    name: 'plop',
    components: {
      default: Plop,
      tabbar: TabBar
    }
  },
  {
    path: '/my',
    name: 'my',
    components: {
      default: My,
      tabbar: TabBar
    }
    // children: [
    //   {
    //     path: 'search',
    //     component: Search
    //   }
    // ]
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/searchquick',
    redirect: '/searchquick/searchcompre',
    name: 'searchquick',
    component: SearchQuick,
    children:[
      {
        path: 'searchcompre',
        name: 'searchcompre',
        component: SearchCompre
      },
      {
        path: 'searchsong',
        name: 'searchsong',
        component: SearchSong
      },
      {
        path: 'searchmv',
        name: 'searchmv',
        component: SearchMV
      },
      {
        path: 'searchalbum',
        name: 'searchalbum',
        component: SearchAlbum
      },
      {
        path: 'searchsinger',
        name: 'searchsinger',
        component: SearchSinger
      }
    ]
  },
  {
    path: '/player',
    name: 'player',
    component: Player
  },
  {
    path: '/playersheet',
    name: 'playersheet',
    component: PlayerSheet
  },
  {
    path: '/sharepopup',
    name: 'sharepopup',
    component: SharePopup
  },
  {
    path: '/cookie',
    name: 'cookie',
    component: SetCookie
  },
  // 歌手
  {
    path: '/singer',
    name: 'singer',
    component: Singer
  },
  {
    path: '/singerdetail',
    name: 'singerdetail',
    component: SingerDetail
  },
  {
    path: '/singerdetailtab',
    name: 'singerdetailtab',
    component: SingerDetailTab
  },
  
  // 歌单
  {
    path: '/songsheet',
    // name: 'SongSheet',
    component: SongSheet,
    children: [
      {
        path: '/',
        name: 'recomm',
        component: Recomm
      },
      {
        path: 'official',
        name: 'official',
        component: Official
      },
      {
        path: 'classic',
        name: 'classic',
        component: Classic
      },
      {
        path: 'lovesong',
        name: 'lovesong',
        component: LoveSong
      },
      {
        path: 'ktvsong',
        name: 'ktvsong',
        component: KtvSong
      },
      {
        path: 'freesong',
        name: 'freesong',
        component: FreeSong
      },
    ]
  },
  {
    path: '/songsheetsort',
    name: 'songsheetsort',
    component: SongSheetSort
  },
  
]

const router = new VueRouter({
  mode: 'history',
  routes
})

//解决再一次点击当前活跃组件的报错问题！
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
