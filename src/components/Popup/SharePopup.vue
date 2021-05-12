<template>
  <div class="sharepopup">
    <van-popup 
      v-model="share"
      :style="{ height: '40%' }"
      position="bottom"
      overlay
      closeable
      close-icon="cross"
      close-icon-position="top-right"
      @click="handleClose"
    > 
      <div class="sharelist">
        <div class="share" v-for="(t,i) in sharelist" :key="i">
          <div class="icon-bg">
            <icon-svg :icon-class="t.icon"></icon-svg>
          </div>
          <div class="title">{{t.tit}}</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
  export default {
    props: {
      myShare: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        share: this.myShare,
        sharelist: [  //底部弹窗分享数据
          {icon: 'weixin', tit: '微信好友'},
          {icon: 'shejiaotubiao-02', tit: '朋友圈'},
          {icon: '-', tit: '扑通动态'},
          {icon: 'QQ', tit: 'QQ好友'},
          {icon: 'QQkongjian', tit: 'QQ空间'},
          {icon: '28', tit: '新浪微博'},
          {icon: 'xiaoxisixin', tit: '私信'},
          {icon: 'kapian-01', tit: '音乐卡片'},
        ]
      }
    },
    watch: {
      myShare(newValue, oldValue) {
        this.share = this.myShare
      }
    },
    methods: {
      handleClose() {
        this.$emit('changeShare', false)
      }
    },
  }
</script>

<style lang="less" scoped>
@import '~@/style/index.less';
.sharelist {
  padding: 100/@rem 30/@rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .share {
    width: 20%;
    text-align: center;
    .icon-bg {
      .w(90);
      .h(90);
      background: #fff;
      border-radius: 20/@rem;
      line-height: 90/@rem;
      margin-left: 18%;
    }
    .title {
      margin: 20/@rem 0 50/@rem;
      color: #000;
      .f_s(22);
    }
  }
}
</style>