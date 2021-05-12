import {http} from '@/utils/request.js'

export const userReg = (data)=>{  //注册请求
  return http.post('/1.1/users',data)
}

export const userLogin = (data)=>{  //登录请求
  return http.post('/1.1/login',data)
}

