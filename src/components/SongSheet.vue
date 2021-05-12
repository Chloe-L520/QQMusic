<template>
  <div class="song-sheet">
    <!-- 顶部导航栏 -->
    <van-nav-bar 
      title="分类歌单" 
      left-text="" 
      left-arrow
      fixed
      z-index="999999"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <!-- 内容区域 -->
    <div class="content">
      <!-- 歌单分类 -->
      <div class="classify-box">
        <div class="classify">
          <div class="wrapper" ref="wrapper">
            <ul class="con" :style="{width: 155*6/75 + 'rem'}">
              <li 
                v-for="(item,index) in tabs" 
                :key="index"
                :class="index==idx?'active':''"
                @click="handleTab(idx=index)"
              >{{item}}</li>
            </ul>
          </div>
          <span class="iconfont icon-gengduo" @click="handleSort"></span>
        </div>
      </div>
      <!--歌单分类内容 -->
      <router-view></router-view>
    </div>
    


  </div>
</template>

<script>
import BScroll from '@better-scroll/core';
  export default {
    data() {
      return {
        idx: 0, //存储tabs的下标
        tabs: ['推荐','官方','经典','情歌','KTV热歌','免费热歌'],
        urls: ['','official','classic','lovesong','ktvsong','freesong',]  //分类歌单路径
      }
    },
    created () {
      this.$emit('tabbar', false);
    },
    mounted () {
      let bs = new BScroll(this.$refs.wrapper, {
        scrollX: true,
        click: true
      });
    },
    methods: {
      onClickLeft() {
        this.$router.back()
        console.log('点击了')
      },
      onClickRight() {  //点击导航栏搜索框跳转至搜索页
        this.$router.push('/search')
      },
      handleTab() {
        this.$router.push(`/songsheet/${this.urls[this.idx]}`)
      },
      handleSort() {
        this.$router.push('/songsheetsort')
      }
    },
  }
</script>

<style lang="less" scoped>
@import '~@/style/index.less';
.song-sheet {
  overflow:hidden;
  .van-nav-bar__content{
    z-index: 999999;
  }
  .content {
    .classify-box{
      width: 100%;
      z-index: 999999;
      position: fixed;
      top: 92/@rem;
      background: @bg-c;
      .classify {
        #flex-between;
        margin: 0 30/@rem;
        position: relative;
        .wrapper {
          width: 100%;
          .con {
            display: flex;
            .f_s(30);
            li {
              margin-right: 62/@rem;
              padding-bottom: 20/@rem;
              color: #808080;
              // position: relative;
            }
            li.active {
              color: @primary;
              border-bottom: 4/@rem solid @primary;
            }
          }
        }
        span {
          position: absolute;
          background: @bg-c;
          top: 4/@rem;
          right: -31/@rem;
          padding: 0 30/@rem 0 16/@rem;
        }
      }
    }
  }
}
</style>