import getField from '../js/functions/getField.js';
import VALUES from '@/QS-UI-CONFIG/config/values.js';
import config from '@/QS-UI-CONFIG/config/index.js';
module.exports = {
	data() {
		return {
			[VALUES.data.QSBackTop.QS_backTopShow]: false
		}
	},
	onPageScroll(e) {
		if(this.$refs.QSNodeNav && typeof this.$refs.QSNodeNav.setScrollTop === 'function') this.$refs.QSNodeNav.setScrollTop(e.scrollTop); 
		
		if(this[VALUES.data.QSBackTop.QSBackTopType] && this[VALUES.data.QSBackTop.QSBackTopType] !== 'page') return;
		this[VALUES.mixinsName.QSBackTopScroll_checkShow](e.scrollTop);
	},
	methods: {
		[VALUES.mixinsName.QSBackTopScroll]: (e, name = 'QSBackTop') => {
			this[VALUES.mixinsName.QSBackTopScroll_checkShow](e.detail.scrollTop, name);
		},
		[VALUES.mixinsName.QSBackTopScroll_checkShow]: function (scrollTop, name = 'QSBackTop') {
			let ref = getField(this.$refs, name);
			if(ref) {
				if(scrollTop > config.backTopShowScrollTop) {
					if(!this[VALUES.data.QSBackTop.QS_backTopShow]) {
						this[VALUES.data.QSBackTop.QS_backTopShow] = true;
						ref.show();
					};
				}else{
					if(this[VALUES.data.QSBackTop.QS_backTopShow]) {
						this[VALUES.data.QSBackTop.QS_backTopShow] = false;
						ref.hide()
					}
				}
			}
		}
	}
}
