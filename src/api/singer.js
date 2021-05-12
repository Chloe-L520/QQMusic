// 集中存放并管理api请求
import {request} from '@/utils/request.js'

export const getBanner = ()=>{  //获取轮播图
    return request.get('/music/recommend/banner')
}

export const getCategory = ()=>{  //请求歌手分类
    return request.get('/music/singer/category')
}

export const getSingerList = (area=-100, genre=-100, sex=-100)=>{  //请求歌手列表
    // let url = `/music/singer/list?area=${area}&genre=${genre}&sex=${sex}`
    // return http.get(url)
    return request.get('/music/singer/list',{
        params:{
            area,
            genre,
            sex
        }
    })
}

export const getSingerSongs = (id,page=1,num=15)=> {  //获取歌手热门歌曲
    return request.get('/music/singer/songs',{
        params: {
            singermid: id,
            page,
            num
        }
    })
}

export const getSongUrl = (songmid)=> {  //获取歌曲播放链接
    return request.get('/music/song/urls',{
        params: {
            id: songmid,
        }
    })
}

export const getLyric = (songmid)=> {  //获取歌曲歌词
    return request.get('/music/lyric',{
        params: {
            songmid
        }
    })
}




export const getSearchHot = ()=>{  //获取热搜词
    return request.get('/music/search/hot')
}

export const getSearchQuick = (key)=>{  //快速搜索
    return request.get(`/music/search/quick?key=${key}`)
}

export const getMV = (id)=>{  //获取mv信息
    return request.get(`/music/mv?id=${id}`)
}

export const getMVUrl = (vid)=>{  //获取mv播放链接
    return request.get(`/music/mv/url?id=${vid}`)
}