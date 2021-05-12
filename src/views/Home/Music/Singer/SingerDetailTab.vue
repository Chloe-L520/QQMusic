<template>
  <div class="singerdetail-tab">
    <!-- 标签页 -->
    <div class="tab">
			<van-tabs v-model="active" color="#444" @change="handleChange()">
				<van-tab title="歌曲"></van-tab>
				<van-tab title="专辑"></van-tab>
				<van-tab title="视频"></van-tab>
				<van-tab title="关于TA"></van-tab>
			</van-tabs>
		</div>

    <!-- 歌曲列表 -->
		<div class="songlist" v-if="active==0">
			<div class="content">
				<ul>
					<li 
						v-for="(item,index) in singersongs" 
						:key="index"
					>
            <div class="left" @click="handlePlay(index)">
                <h4>{{item.name}}</h4>
                <p>
                  <span v-for="(itm,idx) in item.singer" :key="idx">
                    {{itm.name}}
                  </span>
                  · {{item.album.name}}
                </p>
            </div>
						<div class="right">
              <span class="iconfont icon-shipin"></span>
              <span class="iconfont icon-qita" @click="showFunc"></span>
            </div>
					</li>
				</ul>
			</div>
		</div>


		<!-- 专辑 -->
		<!-- <div class="singerAlbum" v-else-if="active==1">
			<div class="content">
				<ul>
					<li v-for="(item,index) in albumlist" :key="index">
						<img :src="item" alt="">
						<h4>{{item.album_name}}</h4>
						<span>{{item.pub_time}}</span>
						<span>{{item.latest_song.song_count}}首</span>
					</li>
				</ul>
			</div>
		</div> -->

		<!-- 视频 -->
		<!-- <div class="singerVedio" v-else-if="active==2">
			<div class="content">

			</div>
		</div> -->

		<!-- 关于 -->
		<!-- <div class="about" v-else>
			<div class="content">
				<div class="singer-data">
					<div class="tit">
						<h4>歌手资料</h4>
						<router-link to="/datail/singerDescMore">
							<span>
								更多 >
							</span>
						</router-link>
					</div>
					<div class="desc">{{}}</div>
				</div>
				
			</div>
		</div> -->
    
  <!-- 歌曲列表功能弹窗 -->
  <FuncPopup :myFunc="isFunc" @changeFunc="handleFunc(isFunc)"/>

  </div>
</template>

<script>
import FuncPopup from '@/components/Popup/FuncPopup.vue';
import {getSingerSongs} from '@/api/singer.js';
  export default {
    components: {
      FuncPopup,
    },
    data() {
      return {
        active: 0,  //存储标签页下标
        singersongs: [],  //存储歌手热门歌曲
        isFunc: false, //弹窗是否显示
      }
    },
    created () {
      let {id} = this.$route.query
      getSingerSongs(id).then(res=>{  //获取歌手热门歌曲
        // console.log(res)
        let {singer, list} = res.data.data
        this.singersongs = list
        this.singer = singer
      })
    },
    methods: {
      handleChange(ev) {  //tab切换
        // console.log(this.active)
      },
      showFunc() {  //显示功能弹窗
        this.isFunc = true
      },
      handleFunc(isFunc){
        if(isFunc === 'false'){
          this.isFunc = true
        }else{
          this.isFunc = false
        }
      },
      handleCancel() {
        this.isShow = false
      },
      handlePlay(idx) {
        this.$store.commit('player/curSongMut', idx)  //修改播放歌曲下标
        this.$store.commit('player/songListMut', this.singersongs)  //初始化歌曲列表
        this.$router.push('/player')
      }
    },
  }
</script>

<style lang="less" scoped>
@import '~@/style/index.less';
// 标签页
.tab {

}
// 歌曲
.songlist {
  padding: 20/@rem 30/@rem;
  li{
    margin-bottom: 45/@rem;
    #flex-between;
    .left {
      flex: 1;
      h4{
        .f_s(28);
        color: #000;
      }
      p {
        .f_s(20);
        color: #8B8B8B;
      }
    }
    .right {
      .iconfont {
        .f_s(40);
        color: #8B8B8B;
        margin-left: 35/@rem;
      }
      // 更多-弹窗
      .van-popup{
        .wrapper {
          width: 100%;
          margin-top: 60/@rem;
          .content{
            width: 200%;
            .sharelist {
              float: left;
              width: 12.5%;
              text-align: center;
              color: #000;
              .iconbox {
                .iconfont{
                  display: inline-block;
                  .w(100);
                  .h(100);
                  .f_s(60);
                  background: #fff;
                  line-height: 100/@rem;
                  border-radius: 18/@rem; 
                }
              }
              .title{
                .f_s(22);
                margin: 30/@rem 0 60/@rem;
              }
            }
          }
        }
        .cancel {
          width: 100%;
          color: #000;
          .f_s(30);
          text-align: center;
          margin: 40/@rem;
          position: fixed;
          bottom: 0;
          left: 0;
        }
      }
    }
  }
}
// 专辑
// 视频
// 关于ta
.about{
  .singer-data{
    .tit{
      #flex-between;
      padding: 26/@rem 28/@rem;
      h4{
        .f_s(28);
        font-weight: bold;
      }
      span{
        .f_s(20);
        color: #6e6e6e;
      }
    }
    .desc{
      .h(200);
      .f_s(24);
      .l_h(42);
      letter-spacing: 3/@rem;
      text-align: left;
      text-indent: 45/@rem;
      margin: 0 28/@rem;
      color: #787878;
    }
  }
}
</style>