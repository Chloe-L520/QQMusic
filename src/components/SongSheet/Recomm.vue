<template>
  <div class="recomm">
       
    <!-- 走马灯播放歌单 -->
    <div class="playlist">
      <el-carousel 
        :interval="4000"
        type="card"
        indicator-position="none"
      >
        
        <el-carousel-item 
          :class="carousel_item"
          v-for="item in recomm" 
          :key="item.content_id" 
          @click="handleDetail(item.content_id)"
        >
          <div class="pic">
            <img :src="item.cover" alt="">
            <span :class="['iconfont']"></span>
            <!-- isShow?'icon-bofang1':'icon-bofang_huaban1' -->
          </div>
        </el-carousel-item>
      </el-carousel>
      <!-- <h4 :class="idx=num" v-for="(itm,idx) in recomm" :key="idx">{{itm.title}}</h4> -->
    </div>

    <!-- 推荐歌单列表 -->
    <div class="recommlist">
      <ul>
        <li
          v-for="(item,index) in recolist"
          :key="index"
          @click="handleDetail(item.content_id)"
        >
          <div class="pic">
            <img :src="item.cover" alt="">
            <span class="recently"><i class="iconfont icon-dian1"></i>最近更新</span>
            <span class="iconfont icon-ziyuan"></span>
          </div>
          <p>{{item.title}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {getRecoPlayListU} from '@/api/songsheet.js';
import {} from '@/api/songsheet.js';
  export default {
    data() {
      return {
        num: 0,  //存储图片下标
        banner: [],  //存储banner图
        recommlist: [],  //存储轮播图信息
        carousel_container: "carousel__container",
        carousel_item: "carousel_item"
      }
    },
    computed: {
      recomm(){
        return this.recommlist.slice(0,6)
      },
      recolist(){
        return this.recommlist.slice(0,11)
      }
    },
    created () {
      getRecoPlayListU().then(res=>{  //获取为你推荐歌单
        // console.log(res)
        this.recommlist = res.data.data.list
      })
    },
    methods: {
      handleDetail(id) {  //跳转至歌单详情
        this.$router.push({
          path: '/songsheetdetail',
          query:{
            id
          }
        })
      }
    },
  }
</script>

<style lang="less" scoped>
@import '~@/style/index.less';
  //走马灯
  .playlist{
    margin: 180/@rem 30/@rem 0;
    .el-carousel{
      overflow: hidden;
      height: 400/@rem;
    }
    .carousel_item {
      height: 352/@rem;
      border-radius: 20/@rem;
      overflow: hidden;
      border-radius: 20/@rem;
      .pic{
        width: 100%;
        height: 100%;
        border-radius: 20/@rem;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          border-radius: 20/@rem;
        }
        button{
          position: absolute;
          top: 0;
          left: 0;
          border: none;
          color: @white;
          background: rgba(0,0,0,0.5);
        }
        .iconfont{
          position: absolute;
          top: 50%;
          left: 50%;
          .f_s(60);
          transform: translate(-50%,-50%);
          color: @white;
          z-index: 99999;
        }
      }
    }
    .carousel_item:nth-child(2n) {
      background-color: #99a9bf;
    }
    
    .carousel_item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
  }
  // 歌单列表
  .recommlist{
    ul{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
      margin: 0 22/@rem;
      li{
        width: 29%;
        margin: 0 8/@rem;
        overflow: hidden;
        .pic{
          overflow: hidden;
          position: relative;
          img{
            width: 100%;
            border-radius: 15/@rem;
          }
          .iconfont{
            .f_s(40);
            color: @white;
            position: absolute;
            bottom: 26/@rem;
            right: 10/@rem;
          }
          .recently{
            display: inline-block;
            // .w(126);
            .f_s(24);
            text-align: center;
            border-radius: 30/@rem;
            padding: 8/@rem 20/@rem;
            color: @white;
            background: rgba(0,0,0,0.5);
            position: absolute;
            bottom: 22/@rem;
            left: 12/@rem;
            .icon-dian1{
              top: 6/@rem;
              left: -105/@rem;
              color: red;
            }
          }
          .icon-ziyuan{
            color: @white;
            bottom: 26/@rem;
            right: 10/@rem;
          }
        }
        p {
          .f_s(24);
        }
    }
    }
  }

</style>