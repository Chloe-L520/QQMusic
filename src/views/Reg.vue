<template>
  <div class="reg">
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">注册</van-button>
      </div>
    </van-form>

  </div>
</template>

<script>
import {Toast} from 'vant';
import {userReg} from '@/api/user.js';
  export default {
    data() {
      return {
        username: '大脸猫',
        password: '520520',
      }
    },
    methods: {
      onSubmit(val) {
        console.log(val)
        userReg(val).then(res=>{
          // console.log(res)
          if(res.status==201){
            Toast.success('注册成功')
          }
        }).catch(err=>{
          Toast.fail('用户名已存在')
        })
      }
    },
  }
</script>

<style lang="less" scoped>
@import '~@/style/index.less';
.reg {
  margin: 100/@rem 0;
}
</style>