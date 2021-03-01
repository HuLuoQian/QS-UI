<script>
	export default {
		globalData: {
			isLogin: false 	,//演示跳转页面拦截登录
			requestLogin: false ,//演示访问接口拦截登录
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "QS-UI/css/index.scss";
	
	page{
		min-height: 100vh;
		background-color: #EEEEEE;
	}
</style>
