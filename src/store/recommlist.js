export default{
  namespaced: true,  //模块化
  state:()=>({
    recommlist: []  //为你推荐歌单
  }),
  mutations: {
    recommListMut(state,list){  //初始化推荐歌单数据
      state.recommlist = list
    }
  }
}