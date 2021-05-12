<template>
    <div class="search-box">
        <router-link to="/search">
            <!-- <van-search
                v-model="value"
                disabled
                shape="round"
                background="none"
                placeholder="请输入搜索关键词"
            /> -->
            <div class="search">
                <b class="iconfont icon-sousuo"></b>
                <span class="keyword">请输入搜索歌曲</span>
            </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value: '' //搜索框内容
            }
        },
    }
</script>

<style lang="less" scoped>
  @import '../style/index.less';
  .search-box {
    margin: 16/@rem 0 36/@rem;
    .search {
      height: 64/@rem;
      line-height: 60/@rem;
      background: #ECEDF1;
      border-radius: 32/@rem;
      .icon-sousuo {
        .f_s(40);
        display: inline-block;
        padding: 0 20/@rem;
        color: #B2B1B7;
        vertical-align: middle;
      }
      .keyword {
        .f_s(24);
        display: inline-block;
        color: #B1B2B6;
        vertical-align: middle;
      }
    }
  }
</style>