<template>
    <div class="search">
      <!-- 搜索框 -->
      <div class="search-box">
        <div class="search-input">
          <input 
            ref="input"
            type="tel"
            placeholder="请输入搜索歌曲"
            @keyup.enter="handleSend"
            v-model="value"/>
          <span class="iconfont icon-sousuo"></span>
          <span class="iconfont icon-weibiaoti-8_huaban1"></span>
        </div>
        <span class="cancel" @click="handleBack">取消</span>
      </div>
      <!-- 内容区 -->
      <div class="wrapper" ref="wrapper">
        <div class="content" :style="{height: 90*15/75 + 'rem'}">
          <!-- 搜索历史 -->
          <div class="history">
            <h4>搜索历史</h4>
            <i class="iconfont icon-shanchu"></i>
          </div>
          <div class="hty-content">
            <li v-for="(itm,idx) in valuelist" :key="idx">{{itm}}</li>
          </div>
          <!-- 热门搜索 -->
          <div class="tit">
            <h4>热门搜索</h4>
            <span><i class="iconfont icon-zanting"></i>播放</span>
          </div>
          <div class="search-list-content">
            <!-- 左侧热搜词 -->
            <ul>
              <li
                v-for="(item, index) in search"
                :key="index"
                @click="handleSearch(item.k)"
                v-if="index%2==0"
              >
                <span>{{index+1}}.</span>
                {{item.k}}
              </li>
            </ul>
            <!-- 右侧热搜词 -->
            <ul>
              <li
                v-for="(itm, idx) in search"
                :key="idx"
                @click="handleSearch(itm.k)"
                v-if="idx%2!=0"
              >
                <span>{{idx + 1}}.</span>
                {{itm.k}}
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
import Bus from '@/assets/js/bus'
import BScroll from '@better-scroll/core';
import {getSearchHot} from '../api/singer.js';
    export default {
        data() {
          return {
            value: '',  //搜索框输入值
            valuelist: [],  //存储input输入值
            search: [],  //存储搜索热词
            key: ''

          }
        },
        created () {
          // let {key} = this.$route.query
          
            getSearchHot().then(res=>{  //获取搜索热词
              // console.log(res)
              this.search = res.data.data
            })
        },
        computed: {
            
        },
        mounted() {  //纵向滚动
          this.$nextTick(()=>{
            this.$refs.input.focus();
          })
          // let bs = new BScroll(this.$refs.wrapper, {
          //   scrollY: true,
          //   click: true
          // })
          
        },
        methods: {
            handleBack(){  //返回上一层
              window.history.go(-1)
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
              this.value = ''
            },
            handleSearch(key){  //跳转播放页
              this.$router.push({
                path: '/searchquick'
              }),
              this.key = key
              // console.log(key)
              console.log(this.key)
              Bus.$emit('msg', this.key);
            }
        },
    }
</script>

<style lang="less" scoped>
@import '../style/index.less';
.search {
  .search-box{
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
      .icon-weibiaoti-8_huaban1 {
        .f_s(50);
        color: @primary;
        top: -2/@rem;
        right: 0;
      }
    }
    span{
      margin-left: 34/@rem;
      display: inline-block;
      .f_s(30);
    }
  }
    
}
// 内容区
.wrapper{
  height: 100%;
  z-index: -999;
  position: absolute;
  top: 110/@rem;
  bottom: 200/@rem;
  left: 30/@rem;
  right: 30/@rem;
  .content {
    height: 200%;
    // 搜索历史
    .history {
      #flex-between;
      margin-bottom: 20/@rem;
      h4 {
        .f_s(30);
      }
      i {
        color: #BDBDBD;
      }
    }
    .hty-content {
      li {
        display: inline-block;
        .f_s(22);
        margin-right: 20/@rem;
        padding: 16/@rem 24/@rem;
        border-radius: 54/@rem;
        list-style: none;
        background: #fff;
      }
    }
    // 热门搜索
    .tit {
        display: flex;
        align-items: center;
        margin: 30/@rem 0 60/@rem;
        h4 {
          .f_s(30);
        }
        span {
          display: inline-block;
          background: #E1F5EF;
          padding: 10/@rem 20/@rem;
          margin-left: 40/@rem;
          border-radius: 48/@rem;
          .f_s(20);
          color: #000;
        }
        span .iconfont {
          color: #5DD1A0;
          .f_s(20);
          padding-right: 5/@rem;
        }
      }
    .search-list-content{
      #flex-between;
      li {
          margin-bottom: 58/@rem;
          font-size: 30/@rem;
          span {
            color: #8A8A8A;
          }
      }
    }
  }
}
</style>