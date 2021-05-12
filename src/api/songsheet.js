import {request} from '../utils/request';

export const getRecoPlayListU = ()=>{  //获取为你推荐歌单
    return request.get('/music/recommend/playlist/u')
}

export const getRecoPlayList = (id,pageNo=1,pageSize=15)=>{  //获取按分类推荐歌单
    return request.get('/music/recommend/playlist',{
        params:{
            id,
            pageNo,
            pageSize
        }
    })
}

export const getSongListCategory = ()=>{  //获取歌单分类
    return request.get('/music/songlist/category')
}

// /songlist?id=7782574989
export const getRecoSongList = (id)=>{  //获取为你推荐歌单列表
    return request.get(`/music/songlist?id=${id}`)
}