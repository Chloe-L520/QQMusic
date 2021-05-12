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
        <van-button round block type="primary" native-type="submit">登录</van-button>
      </div>
    </van-form>

  </div>
</template>

<script>
import {mapActions} from 'vuex';
  export default {
    data() {
      return {
        username: '大脸猫',
        password: '520520',
      }
    },
    methods: {
      ...mapActions({  //通过辅助函数的方式，提取异步action
        userLoginAction:'userx/userLoginAction'
      }),
      onSubmit(val) {
        console.log(val);
        this.userLoginAction(val)
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