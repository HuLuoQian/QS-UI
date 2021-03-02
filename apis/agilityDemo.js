

module.exports = {
	agilityDemoTest(data) {
		return uni.$qs.request({
				name: '更灵活的访问方式',
				urlField: 'demo.testApi', //请查看QS-UI-CONFIG/config/apis.js
				sendData: {
					data: data
				},
				loading: true,
				contentType: 'form'
		})
	}
}