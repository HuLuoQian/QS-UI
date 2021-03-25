module.exports = class pageRootsObj {
	constructor(arg) {
		this.pageRoots = {};
		this.currentVm = null;
	}

	setCurrentVm(vm) {
		this.currentVm = vm;
	}
	
	getCurrentVm() {
		return this.currentVm;
	}

	setPageContext(vm, ContextType) {
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

	getCurrentPageContext(ContextType) {
		return this.getPage(this.getCurrentVm(), ContextType);
	}

	getPage(page, ContextType) {
		if(!page) return;
		const id = this.getId(page);
		const r = this.pageRoots[id] && this.pageRoots[id][ContextType];
		return r;
	}

	getParentId(vm) {
		// #ifdef APP-NVUE
		return vm.$parent.route;
		// #endif
		// #ifdef H5
		return vm.$parent.__page__.id;
		// #endif
		// #ifndef H5
		return vm.$parent._uid;
		// #endif
	}

	getId(page) {
		// #ifdef APP-NVUE
		return page.route;
		// #endif
		// #ifdef H5
		return page.__page__.id;
		// #endif
		// #ifndef H5
		return page.$vm._uid;
		// #endif
	}
}