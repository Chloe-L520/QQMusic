<template>
  <div class="singer">
    <!-- 顶部导航栏 -->
    <van-nav-bar 
      title="标题"
      left-text="返回" 
      left-arrow 
      fixed
      @click-left="clickLeft"
      @click-right="clickRight"
    >
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <!-- 内容区域 -->
    <div class="content">
      <!-- 关注歌手 -->
      <div class="follow">关注歌手 ></div>
      <!-- 歌手分类 -->
      <div 
        class="category"
        v-for="(item,name,i) in category"
        :key="i"
      >
        <van-button
          v-for="(itm,idx) in item"
          :key="idx"
          v-show="name!='index'&&idx<7"
          :type="idx==numArr[i]?'primary' : 'default'"
          size="mini"
          :round="true"
          @click="handleCfy(i,idx,itm.id)"
        >
          {{itm.name}}
        </van-button>
      </div>
      <!-- 歌手 -->
      <div class="singer-list">
        <div class="hot">热</div>
        <div 
          class="singer" 
          v-for="item in singer_list"
          :key="item.singer_mid"
        >
          <div 
            class="info" 
            @click="handleSingerDetail(item.singer_mid)"
          >
            <img :src="item.singer_pic" alt="">
            <div class="name">
              <h4>{{item.singer_name}}</h4>
              <span>粉丝 520万</span>
            </div>
          </div>
          <div class="btn">+ 关注</div>
        </div>
      </div>

    </div>


  </div>
</template>

<script>
import {getCategory,getSingerList} from '@/api/singer.js';
export default {
  data() {
    return {
      singer_list: [],  //存储歌手列表
      category: [],  //存储歌手分类
      numArr: [0,0,0,0],  //记录每一个分类按钮被选中的下标
      cfyArr: [-100,-100,-100,-100],  // 记录用户选中的分类id
    }
  },
  created () {
    getCategory().then(res=>{  //获取歌手分类
      //   console.log(res)
      this.category = res.data.data
    });
    getSingerList().then(res=>{  //获取歌手列表
      console.log(res)
      this.singer_list = res.data.data.list
    })
  },
  methods: {
    handleCfy(i,idx,id) {  //分类列表切换功能
      let numArr = this.numArr
      numArr[i] = idx  //数据劫持
      this.numArr = [...numArr]
      this.cfyArr[i] = id //根据用户点击，设置不同分类id
      let [area,genre,xxx,sex] = this.cfyArr
      getSingerList(area,genre,sex).then(res=>{  //重新加载分类的列表
        // console.log(res)
        this.singer_list = res.data.data.list
      })
    },
    handleSingerDetail(id) {  //跳转歌手详情
      this.$router.push({
        path: '/singerdetail',
        query: {
          id: id
        }
      })
    },
    clickLeft(){  //点击narbar导航栏返回按钮
      this.$router.back('/')
    },
    clickRight(){  //点击narbar导航栏右侧
      this.$router.push('/search')
    }
  },
}
</script>

<style lang="less" scoped>
@import '~@/style/index.less';
.content {
  position: absolute;
  top: 90/@rem;
  margin: 0 30/@rem;
  .follow {
    text-align: right;
    .f_s(20);
    color: #727272;
    margin: 20/@rem 0 0;
  }
  .category {
    .van-button {
      margin-right: 15/@rem;
      padding: 12/@rem;
    }
  }
  .singer-list {
    .hot {
      .f_s(24);
      color: #8F8F8F;
      margin: 40/@rem 0 30/@rem;
    }
    .singer {
      #flex-between;
      margin-bottom: 20/@rem;
      .info {
        .w(560);
        display: flex;
        align-items: center;
        img {
          .w(120);
          .h(120);
          border-radius: 100%;
          margin-right: 20/@rem;
        }
        .name {
          h4 {
            .f_s(28);
          }
          span {
            .f_s(20);
            color: #8F8F8F;
          }
        }
      }
      .btn {
        .f_s(22);
        padding: 10/@rem 16/@rem;
        border: 1px solid #D2D2D2;
        border-radius: 40/@rem;
      }
    }
  }
}
</style>