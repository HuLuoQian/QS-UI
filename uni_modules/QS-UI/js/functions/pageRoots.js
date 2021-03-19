module.exports = class pageRootsObj {
	constructor(arg) {
		this.pageRoots = {};
	}

	setPageContext(vm, ContextType) {
		if(ContextType === 'QS-Global-Canvas') {
			this.pageRoots['QS-Global-Canvas'] = vm;
			return;
		}
		const id = this.getParentId(vm);
		if (!this.pageRoots[id]) this.pageRoots[id] = {};
		this.pageRoots[id][ContextType] = vm;
	}

	clearPageContext(vm, ContextType) {
		const id = this.getParentId(vm);
		if (this.pageRoots[id]) {
			if (this.pageRoots[id][ContextType]) this.pageRoots[id][ContextType] = null;
			if (!Object.keys(this.pageRoots[id]).length) this.pageRoots[id] = null;
		}
	}

	getPage(page, ContextType) {
		if(ContextType === 'QS-Global-Canvas') {
			return this.pageRoots['QS-Global-Canvas'];
		}
		const id = this.getId(page);
		return this.pageRoots[id] && this.pageRoots[id][ContextType];
	}

	getParentId(vm) {
		// #ifdef H5
		return vm.$parent.__page__.id;
		// #endif
		// #ifndef H5
		return vm.$parent._uid;
		// #endif
	}

	getId(page) {
		// #ifdef H5
		return page.__page__.id;
		// #endif
		// #ifndef H5
		return page.$vm._uid;
		// #endif
	}
}