<template>
  <div class="container">
    <div class="content_video">
      <div class="content_video">
        <!-- 使用组件video-player -->
        <video-player
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
        ></video-player>
      </div>
    </div>
  </div>
</template>

<script>
// 组件内引用vue-video-player插件
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
export default {
  name: 'HomeVideo',
  data () {
    return {
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '4:3', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            src: 'https://www.sicau.edu.cn/__local/A/1E/52/E8093449CF93AF4E8960C131C04_09BD5DD1_1F12F030.mp4?e=.mp4', // 路径
            type: 'video/mp4' // 类型
          },
          {
            src: '//path/to/video.webm',
            type: 'video/webm'
          }
        ],
        poster: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3612873308,1721476889&fm=26&gp=0.jpg', // 你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      }
    }
  },
  components: {
    videoPlayer,
    HeadTitle
  }
}
</script>
<style>
.content_video .video-js .vjs-big-play-button {
    font-size: 1.5em ;
    width: 2.5em;
    border-radius: 50%;
    top: 40%;
    left: 45%;
  }
.content_video {
  text-align: left;
  padding: 0 7%;
}
</style>
