import axios from 'axios'

// 请求QQ服务器接口
export const request = axios.create({
    // baseURL: 'http://localhost:3300',  //开发服务器地址
    // baseURL: 'http://vip.com',  //生产服务器地址
    headers: {  //根据接口需求，按需配置请求头，携带一些验证信息
        token:'asdfasdfasdfasdfasdf'
    }
})

// 请求LeanCloud服务器接口
export const http = axios.create({
    baseURL: 'https://6o4bq6uh.lc-cn-n1-shared.com',
    headers: {  
        'X-LC-Id':'6O4BQ6uHp91nQwbyiiPYoAX8-gzGzoHsz',  //自己的LeanCloud应用ID
        'X-LC-Key': 'XfChfkUIQOMFIqTViFhv4qi5',
        'Content-Type': 'application/json'
    }
})