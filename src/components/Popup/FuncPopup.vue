<template>
  <div class="morepopup">
    <van-popup 
            v-model="func" 
            :style="{ height: '45%' }"
            position="bottom"
            overlay
            close-icon="cross"
            close-icon-position="top-right"
            @click="handleClose"
          > 
            <div class="wrapper">
              <div class="content">
                <div class="sharelist" v-for="(t,i) in funclist" :key="i">
                  <div class="iconbox">
                    <span :class="['iconfont',t.icon]"></span>
                  </div>
                  <div class="title">{{t.tit}}</div>
                </div>
              </div>
            </div>
            <div class="cancel" @click="handleCancel">取消</div>
          </van-popup>
  </div>
</template>

<script>
  export default {
    props: {
      myFunc: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        func: false,
        funclist: [  
          {icon: 'icon-xiayishou-yuanshijituantubiao',tit: '下一首播放'},
          {icon: 'icon-shoucang2',tit: '收藏'},
          {icon: 'icon-tianjiazengjiajia',tit: '加到歌单'},
          {icon: 'icon-fenxiang',tit: '分享'},
          {icon: 'icon-xiazai1',tit: '会员下载'},
          {icon: 'icon-gouwuche',tit: '单曲购买'},
          {icon: 'icon-liuyan',tit: '评论'},
          {icon: 'icon-maikefeng1',tit: '唱这首歌'},
          {icon: 'icon-wode-01',tit: '查看歌手'},
          {icon: 'icon-zhuanjiguangpan',tit: '查看专辑'},
          {icon: 'icon-shipin2',tit: '播放视频'},
          {icon: 'icon-lingsheng',tit: '设置铃声'},
          {icon: 'icon-shengchenghaibao',tit: '歌词海报'},
          {icon: 'icon-qqkongjian',tit: '背景音乐'},
          {icon: 'icon-buxihuan',tit: '不喜欢'},
          {icon: 'icon-jubao',tit: '举报'},
        ]
      }
    },
    watch: {
      myFunc(){
        this.func = this.myFunc
      }
    },
    methods: {
      handleClose(){
        this.$emit('changeFunc', false)
      },
      handleCancel() {
        this.func = false
      }
    },
  }
</script>

<style lang="less" scoped>
@import '~@/style/index.less';
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
</style>