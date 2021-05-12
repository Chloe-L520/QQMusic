const path = require('path')
const vantTheme = path.resolve(__dirname, "./src/style/less/theme.less")

module.exports = {
  devServer: {
    proxy: {  //本地代理配置
      '/music': {
        target: 'http://localhost:3300',
        pathRewrite: {
          '^/music': '' //将请求路径中多余的music剔除
        }
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 可在此编写样式变量
          // 'search-background-color': 'red',
          // 'search-content-background-color':'#ECEDF1',
          // 'search-label-font-size': '50px',
          // 'tabbar-height': '100px',
          // 'tabbar-background-color': '@blue'
          // 也可以引入我们创建好的theme.less文件
          hack: `true; @import "${vantTheme}";`,
        },
      },
    },
  }

}

function resolve(dir) {
  return path.join(__dirname, dir)
}

 
