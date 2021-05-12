<template>
  <div>
    <van-button type="danger">为本地浏览器设置真实cookie</van-button>
  </div>
</template>

<script>
import {getSetCookie} from '@/api/cookie.js'
  export default {
    created () {
      getSetCookie().then(res=>{
        console.log(res)
      });
    },
  }
</script>

<style lang="less" scoped>

</style>