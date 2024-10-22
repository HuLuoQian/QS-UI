function dateObj (props) {
	this.showDefaultValue = props.showDefaultValue;
	this.startYear = props.startYear || new Date().getFullYear() - 5;
	this.endYear = props.endYear || new Date().getFullYear() + 5;
	this.defaultValue = props.defaultValue?new Date(props.defaultValue):new Date();
	this.dateMode = Number(props.dateMode) || 3;
	this.dateFormatArray = props.dateFormatArray || ['/', '/', ' ', ':', ':'];
	this.includeNext = props.includeNext;
}
function customObj (props) {
	this.itemArray = props.itemArray || [];
	this.linkage = props.linkage || false;
	this.linkageNum = props.linkageNum || 2;
	this.defaultValue = props.defaultValue || null;
	this.steps = props.steps || {};
}
function custom2Obj (props) {
	this.itemArray = props.itemArray || [];
	this.itemObject = props.itemObject || {};
	this.linkage = props.linkage || false;
	this.linkageNum = props.linkageNum || 2;
	this.defaultValue = props.defaultValue || null;
	this.steps = props.steps || {};
}
function cityObj (props) {
	this.defaultValue = props.defaultValue || [0, 0, 0];
}
const _app = {
	getCustomDefaultValue({defaultValue, linkage, linkageNum, itemArrayLen}) {
		if(defaultValue && defaultValue instanceof Array) {
			return defaultValue;
		}else{
			if(linkage) {
				return Array(linkageNum).fill(0);
			}else{
				return Array(itemArrayLen).fill(0);
			}
		}
	},
	num2Array(num, zeroStart) {
		const arr = [];
		if(typeof num === 'number') {
			if(zeroStart) {
				for(let i = 0; i < num; i++) {
					arr.push(i > 9?(i + ''):('0' + i));
				}
			}else{
				for(let i = 1; i <= num; i++) {
					arr.push(i);
				}
			}
		}
		return arr;
	},
	showToast(msg) {
		uni.showToast({
			title: msg,
			icon: 'none'
		})
	},
	showLoading(msg, ifmask) {
		uni.showLoading({
			title: msg,
			mask: ifmask || false
		})
	},
	hideLoading() {
		uni.hideLoading();
	},
	//date
	countDays(Y, val) {
		let days = new Date(Y,(val[1]+1),0).getDate();
		if (val) {
			val[2] = val[2] < days - 1? val[2] : days - 1;
		}
		days = this.num2Array(days);
		return {
			days,
			val
		};
	},
	countYears(sy, ey) {
		let _this = this;
		let y = [];
		let c = ey - sy;
		for (let i = 0; i <= c; i++) {
			y.push(sy + i);
		}
		return y;
	},
	creatDateObj(props) {
		return new dateObj(props || {});
	},
	creatCustomObj(props) {
		return new customObj(props || {});
	},
	creatCustom2Obj(props) {
		return new custom2Obj(props || {});
	}
}
export default _app;
