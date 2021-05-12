<template>
    <div class="progress">
        
        <div 
            class="wrapper" 
            ref="wrapper"
            @touchstart="touchStart"
            @touchmove="touchMove"
            @touchend="touchEnd"
        >
            <div class="content" ref="content">
                <div class="dot" ref="dot"></div>
            </div>
        </div>
        <div class="time">
          <span>{{startTime | filterTime}}</span>
          <span>{{endTime | filterTime}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            startTime: {  //当前播放时间
                type: Number,  
                default: 0
            },
            endTime: {  //歌曲总时长
                type: Number,
                dafault: 0
            }
        },
        data() {
            return {
                percent: 0 //存放进度条的百分比
            }
        },
        watch:{
            startTime(){
                // console.log(this.startTime)
                let { startTime,endTime } = this //this等同于this.$props
                let percent = (startTime/endTime)*100
                this.$refs.content.style.width = `${percent}%`
            }
        },
        methods: {
            touchStart() {
                // console.log('按下')
                this.$store.commit('player/isPlayMut',false)
            },
            touchMove(ev) {
                // console.log(ev)
                let { wrapper,content } = this.$refs  ///获取进度条容器，进度条DOM节点
                let offsetX = wrapper.getBoundingClientRect().left //获取进度条容器距离屏幕左边缘距离
                let max = wrapper.getBoundingClientRect().width //获取进度条容器宽度
                let { clientX } = ev.targetTouches[0] //手指距离屏幕左边缘距离
                let distance = clientX - offsetX
                if(distance<=max&&distance>0){  //限制进度条宽度不要超过容器宽度
                    let percent = (distance/max)*100
                    content.style.width = `${percent}%` //为进度条设置百分比宽度
                    this.percent = percent
                }
                ev.preventDefault() //保证页面不会随拖拽晃动
            },
            touchEnd() {  //告知父组件应该设置的播放时间点
                // console.log('抬起')
                let { percent,endTime } = this //获取进度条百分比，歌曲总时长
                let time = percent*endTime/100
                // console.log('新的时间',time)
                this.$emit('trans-time',time)
            }
        },
        

    }
</script>

<style lang="less" scoped>
@import '~@/style/index.less';
.progress{
  .wrapper{
    .w(620);
    .h(4);
    background: @white4;
    border-radius: 2/@rem;
    position: relative;
    .content{
      .w(0);
      .h(4);
      border-radius: 2/@rem;
      background: @white;
      position: relative;
      .dot{
        .w(18);
        .h(18);
        background: @white;
        border-radius: 50%;
        position: absolute;
        top: -7/@rem;
        right: -7/@rem;
      }
    }
  }
  .time {
    #flex-between;
    span{
      margin: 16/@rem 0;
      .f_s(22);
      color: @white4;
    }
  }
}

</style>