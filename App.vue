<script>
	export default {
		globalData: {
			isLogin: false 	//示例所需
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
