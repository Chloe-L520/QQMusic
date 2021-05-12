import {userLogin} from '@/api/user.js'
import {Toast} from 'vant'
import router from '@/router/index.js'
export default{
  namespaced: true,
  state:()=>({
    userInfo: null,  //存储用户信息
  }),
  mutations:{
    uInfoMut(state,data){  //状态机用户信息初始化
      state.userInfo = data
    }
  },
  actions:{
    userLoginAction(context,data){  //触发登录请求的异步action
      userLogin(data).then(res=>{ //发送登录请求
        console.log(res)
        if(res.status==200){
          context.commit('uInfoMut', res.data)  //在状态机存储用户信息
          Toast.success('登录成功')
          localStorage.setItem('userInfo',JSON.stringify(res.data))
          router.push('/')
        }
      }).catch(err=>{
        console.log(err)
        Toast.fail('用户名或密码错误')
      })
    }
  }
}