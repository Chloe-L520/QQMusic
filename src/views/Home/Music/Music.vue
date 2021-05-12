<template>
  <div class="music">
    <!-- 搜索框 -->
    <SearchBox/>
    <!-- banner轮播图 -->
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="5000" indicator-color="white">
        <van-swipe-item
          v-for="item in banner"
          :key="item.id"
        >
          <img :src="item.picUrl" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 图标列表 -->
    <ul class="iconlist">
      <li
        v-for="(itm,idx) in iconlist"
        :key="idx"
        @click="handleChange(idx)"
      >
        <span :class="['iconfont',itm.icon]"></span>
        <div>{{itm.tit}}</div>
      </li>
    </ul>


  </div>
</template>

<script>
import SearchBox from '@/components/SearchBox.vue';
import {getBanner} from '@/api/singer.js';
  export default {
    components: {
      SearchBox,
    },
    data() {
      return {
        id: 0,  //存储icon图标的下标
        banner: [],  //存储bannner数据
        iconlist: [  // 图标列表数据
          {icon: 'icon-geshou', tit: '歌手'},
          {icon: 'icon-biaoqiankuozhan_paihang-123', tit: '排行'},
          {icon: 'icon-fenleibeifen', tit: '分类歌单'},
          {icon: 'icon-xinhao', tit: '音乐电台'},
          {icon: 'icon-shipin1', tit: '直播'}
        ],
        iconUrl: ['/singer','','/songsheet','','',]
      }
    },
    created () {
      getBanner().then(res=>{  //获取banner轮播图
        console.log(res)
        this.banner = res.data.data
      });
    },
    methods: {
      handleChange(idx) {
        this.id = idx
        this.$router.push(this.iconUrl[this.id])
      }
    },
  }
</script>

<style lang="less" scoped>
@import '~@/style/index.less';
.music{
  margin-top: 90/@rem;
}
// 轮播
.my-swipe{
  border-radius: 20/@rem;
  // 解决swiper圆角变直角的问题
  overflow: hidden;
  transform: translateY(0);
  // will-change: transform;
}
.my-swipe .van-swipe-item {
  width: 100%;
  color: #fff;
  font-size: 20/@rem;
  text-align: center;
  background-color: #39a9ed;
}
.van-swipe-item img {
  display: inline-block;
  width: 100%;
  vertical-align: bottom;
  border-radius: 20/@rem;
}
// 图标列表
.iconlist {
  #flex-around;
  margin-top: 50/@rem; 
  li {
    text-align: center;
    span.iconfont{
      color: @primary;
      .f_s(60);
    }
    div {
      .f_s(24);
      margin: 18/@rem 0;
    }
  }
}
</style>