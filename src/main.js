import Vue from 'vue'
import router from './router/index.js' //路由
// import Vant from 'vant'
import 'vant/lib/index.css'
import 'vant/lib/index.less'
import App from './App.vue'
import store from './store'  //状态机
import 'amfe-flexible/index.js' //设置rem基准值

import './style/less/reset.less'  //全局样式
import './style/iconfont/iconfont.css'  //iconfont字体
import './style/iconfont/iconfont.js'  //iconfont字体symbol
import IconSvg from './components/icon-component'  //全局注册icon-components
Vue.component('icon-svg', IconSvg)

//按需引入 vant
import {Button,RadioGroup, Radio, Tab, Tabs, Tabbar, TabbarItem, Search,Icon, NavBar,Swipe, SwipeItem,Popup,Cell, CellGroup, Overlay,Field,Form} from 'vant'  
[Button,RadioGroup,Radio,Tab,Tabs,Tabbar,TabbarItem,Search,Icon,NavBar,Swipe, SwipeItem,Popup,Cell,CellGroup,Overlay,Field,Form].forEach(v=>{
  Vue.use(v)
})

// elementUI组件
import {Carousel,CarouselItem} from 'element-ui'
[Carousel,CarouselItem].forEach(e=>{
  Vue.use(e)
})

// 全局注册过滤器
import filters from '@/utils/filters.js'
for (let key in filters) {
  Vue.filter(key, filters[key])
}



import Video from 'video.js'
import 'video.js/dist/video-js.css'
Vue.prototype.$video = Video


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.config.productionTip = false

// 全局的事件总线对象
// Vue.prototype.bus = new Vue()