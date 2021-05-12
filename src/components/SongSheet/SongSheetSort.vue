<template>
  <div class="songlist-category">
    <!-- 导航栏 -->
    <van-nav-bar
      title="全部分类"
      left-arrow
      fixed
      @click-left="onClickLeft"
    />
    <!-- 分类列表 -->
    <div class="category-list">
      <ul class="category" 
        v-for="(item,index) in songlistCategory"
        :key="index">
        <div>
          {{item.type}}
        </div>
        <button
          v-for="itm in item.list"
          :key="itm.id"
        >{{itm.name}}</button>
      </ul>
    </div>
  </div>
</template>

<script>
import {getSongListCategory} from '@/api/songsheet.js';
  export default {
    data() {
      return {
        songlistCategory: [],  //存储歌单分类
      }
    },
    created () {
      getSongListCategory().then(res=>{  //获取歌单分类信息
        // console.log(res)
        this.songlistCategory = res.data.data
      })
    },
    methods: {
      onClickLeft() {  //导航栏点击返回
        this.$router.back()
      }
    },
  }
</script>

<style lang="less" scoped>
@import '~@/style/index.less';
.songlist-category{

}
.category-list{
  margin: 100/@rem 30/@rem 0;
  .category {
    div {
      .f_s(36);
      margin-top: 30/@rem;
    }
    button{
      .w(150);
      .h(60);
      .f_s(26);
      border: none;
      line-height: 60/@rem;
      text-align: center;
      margin: 10/@rem;
      background: @white;
      border-radius: 43/@rem;
    }
  }
}
</style>