<template>
    <div class="tabbar">
        <van-tabbar 
            v-model="active" 
            active-color="#4FCC92" 
            inactive-color="#8B8B8B"
            :route="true"
        >
            <van-tabbar-item to="/home/recommend">
                <span>首页</span>
                <van-icon
                    class="iconfont"
                    class-prefix="icon"
                    slot="icon"
                    slot-scope="props"
                    :name='props.active ? icon.home_active:icon.home_normal'
                ></van-icon>
            </van-tabbar-item>
            <van-tabbar-item to="/video">
                <span>视频</span>
                <van-icon
                    class="iconfont"
                    class-prefix="icon"
                    slot="icon"
                    slot-scope="props"
                    :name='props.active ? icon.vedio_active:icon.vedio_normal'
                ></van-icon>
            </van-tabbar-item>
            <van-tabbar-item to="/plop">
                <span>扑通</span>
                <van-icon
                    class="iconfont"
                    class-prefix="icon"
                    slot="icon"
                    slot-scope="props"
                    :name='props.active ? icon.plop_active:icon.plop_normal'
                ></van-icon>
            </van-tabbar-item>
            <van-tabbar-item to="/my">
                <span>我的</span>
                <van-icon
                    class="iconfont"
                    class-prefix="icon"
                    slot="icon"
                    slot-scope="props"
                    :name='props.active ? icon.my_active:icon.my_normal'
                ></van-icon>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
	data() {
		return {
			active: 0,
			icon: {
				home_normal: 'yinle1',
				home_active: 'yinle',
				vedio_normal: 'shipin',
				vedio_active: 'shipin1',
				plop_normal: 'xintiao',
				plop_active: '-',
				my_normal: 'wode',
				my_active: 'wode1'
			},
		}
	},
	methods: {
    

  },
}
</script>

<style lang="less" scoped>
    @import '../style/index.less';
    .tabbar{
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 9999;
			.iconfont{
				.f_s(45);
			}
			span{
				.f_s(18);
			}
    }
</style>