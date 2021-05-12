const filters = {
  //将播放量转化为指定格式 5520.3万/1.2亿
  filterNum:(value)=>{  
    let num = value
    let m1 = /^\d{1}|\d{2}|\d{3}|\d{4}$/.test(num) //1/2/3/4位
    let m2 = /^\d{5}|\d{6}|\d{7}|\d{8}$/.test(num) //5位或者6位或者7位或者8位
    let m3 = /^\d{9}|\d{10}$/.test(num) //9位或者以上
    if(m3) {
      return (num/10000000).toFixed(1) + '亿'
    }else if(m2) {
      return (num/10000).toFixed(1) + '万'
    }else{
      return num
    }
  },
  //将时间转换为指定格式00：00
  filterTime:(value)=>{  
      let time = parseInt(value)
      let m = parseInt(time/60) //分钟数
      let s = time%60  //秒钟数
      m = m<10 ? `0${m}` : m
      s = s<10 ? `0${s}` : s    
      return m + ':' + s        
  }
}
export default filters