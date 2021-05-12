<template>
  <div class="search-quick">
    <!-- 搜索框 -->
    <div class="search-box">
      <div class="search-input">
        <input 
          ref="input"
          type="text"
          placeholder= "搜索歌曲"
          @keyup.enter="handleSend"
        />
        <span class="iconfont icon-sousuo"></span>
        <span class="iconfont icon-cha"></span>
      </div>
      <span class="cancel" @click="handleBack">取消</span>
    </div>
    <!-- 导航栏 -->
    <ul>
      <li 
        v-for="(item,index) in tablist"
        :key="index"
        :class="index==num? 'active': ''"
        @click="handleTab(num=index)"
      >
        {{item}}
      </li>
    </ul>
    <!-- tab内容区域 -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import {getSearchQuick} from '@/api/singer.js';

  export default {
    data() {
      return {
        num: 0, //tab下标
        valuelist: [], //输入框输入值
        tablist:['综合','歌曲','MV','专辑','歌手'], 
        taburl:['searchcompre','searchsong','searchmv','searchalbum','searchsinger'],
        searchalbum: {},
        searchmv: {},
        searchsinger: {},
        searchsong: {},
        singerlist: [],
        mvlist: [],
      }
    },
    computed: {
    },
    // created() {
    //   let {key} = this.$route.query
    //   // let {vid} = this.mvlist[0]
    //   // console.log(vid)
    //   // console.log(key)
    //   getSearchQuick(key).then(res=>{  //获取热搜词搜索信息
    //     // console.log(res)
    //     this.searchinfo = res.data.data
    //     this.singerlist = res.data.data.singer.itemlist
    //     this.mvlist = res.data.data.mv.itemlist
    //     let {album,mv,singer,song} = res.data.data
    //     this.searchalbum = album
    //     this.searchmv = mv
    //     this.searchsinger = singer
    //     this.searchsong = song
    //   })
    //   // getMVUrl(vid).then(res=>{
    //   //   console.log(res)
    //   // })
    // },
    methods: {
      handleBack(){  //返回上一层
        this.$router.go(-1)
      },
      handleTab(){  //tab切换
        this.$router.push(`${this.taburl[this.num]}`)
      },
      handleSend() {  //搜索框输入验证
        let inp = this.$refs.input
        let reg = "^[ ]+$"  //正则匹配一个或多个空格
        let r = new RegExp(reg)
        let is_null = r.test(inp.value)
        if(is_null||inp.value == '') {
          return false
        } else {
          this.valuelist.push(this.value)
        }
        // this.value = ''  
      },
    },
  }
</script>

<style lang="less" scoped>
@import '~@/style/index.less';
// 搜索框
.search-box{
    z-index: 99999;
    background: @bg-c;
    height: 50/@rem;
    padding: 30/@rem;
    #flex-between;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    .search-input {
      width: 100%;
      #flex-between;
      flex: 1;
      position: relative;
      input{
        display: inline-block;
        width: 90%;
        height: 50/@rem;
        outline: none;
        border: none;
        background: #ECEDF1;
        border-radius: 32/@rem;
        .f_s(24);
        padding: 0 10/@rem 0 60/@rem;
      }
      .iconfont {
        position: absolute;
      }
      .icon-sousuo {
        .f_s(40);
        top: 4/@rem;
        left: -20/@rem;
      }
      .icon-cha {
        .f_s(30);
        top: 10/@rem;
        right: 10/@rem;
      }
    }
    span{
      margin-left: 34/@rem;
      display: inline-block;
      .f_s(30);
    }
}
// 导航栏
ul{
  display: flex;
  margin: 110/@rem 30/@rem 0;
  li{
    .f_s(28);
    margin-right: 70/@rem;
    color: @base-grey;
  }
  li.active{
    color: @primary;
    border-bottom: 6/@rem solid @primary;
    padding-bottom: 10/@rem;
  }
}
// 内容区域
.content{
  margin: 30/@rem 30/@rem 0;
}
</style>