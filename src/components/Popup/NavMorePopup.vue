<template>
  <div>
    <van-popup 
      v-model="more" 
      :style="{ height: '25%' }" 
      position="bottom"
      closeable
      close-icon="cross"
      close-icon-position="top-right"
      @click="handleClose"
    >
      <div class="iconlist" v-for="(tem,idx) in iconlist" :key="idx">
        <div :class="['iconfont','icon', tem.icon]"></div>
        <div class="title">{{tem.tit}}</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
  export default {
    props: {
      myMore: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        more: this.myMore,
        iconlist: [  //弹窗数据
          {icon: 'icon-fenxiang', tit: '分享'},
          {icon: 'icon-shoucang2', tit: '收藏歌单'},
          {icon: 'icon-tianjiazengjiajia', tit: '加到歌单'},
          {icon: 'icon-paixu01', tit: '排序方式'},
          {icon: 'icon-jubao', tit: '举报'},
        ],
      }
    },
    watch: {
      myMore(newValue, oldValue) {
        this.more = this.myMore
      }
    },
    methods: {
      handleClose() {
        this.$emit('changeMore', false)
      }
    },
  }
</script>

<style lang="less" scoped>
@import '~@/style/index.less';
.van-popup {
      #flex-around;
      .iconlist {
        display: block;
        .icon {
          .w(100);
          .h(100);
          line-height: 100/@rem;
          text-align: center;
          border-radius: 14/@rem;
          .f_s(58);
          background: #fff;
          color: #5F5F5F;
          margin: 25/@rem;
        }
        .title {
          color: #5F5F5F;
          .f_s(22);
          text-align: center;
        }
      }
    }
</style>