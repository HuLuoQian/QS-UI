

module.exports = {
	agilityDemoTest(data) {
		return uni.$qs.request({
				urlField: 'demo.testApi', //请查看QS-UI-CONFIG/config/apis.js
				sendData: {
					data: data
				},
				loading: true
		})
	}
}