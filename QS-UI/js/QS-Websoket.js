module.exports = class QSWebSoket {
	constructor(arg) {
		if(!arg) return;
		if(!arg.connectSocket.complete) arg.connectSocket.complete = ()=>{};
		console.log(JSON.stringify(arg.connectSocket));
	    const socket = uni.connectSocket(arg.connectSocket);
		socket.onOpen((res)=>{
			console.log('websoket-onOpen: ' + JSON.stringify(res));
			if(arg.onOpen && typeof arg.onOpen === 'function') {
				arg.onOpen(res);
			}
		});
		socket.onMessage((res)=>{
			// console.log('websoket-onMessage: ' + JSON.stringify(res));
			if(arg.onMessage && typeof arg.onMessage === 'function') {
				arg.onMessage(res);
			}
		});
		socket.onClose((res)=>{
			this.stopHeartbeat();
			console.log('websoket-onClose: ' + JSON.stringify(res));
			if(arg.onClose && typeof arg.onClose === 'function') {
				arg.onClose(res);
			}
		});
		socket.onError((res)=>{
			this.stopHeartbeat();
			console.log('websoket-onError: ' + JSON.stringify(res));
			if(arg.onError && typeof arg.onError === 'function') {
				arg.onError(res);
			}
		});
		this.socketTask = socket;
		if(arg.heart) {
			this.startHeartbeat(arg);
		}
	}
	startHeartbeat(arg) {
		this.heartData = typeof arg.heartData !== 'string'?JSON.stringify(arg.heartData) : arg.heartData;
		this.heartFn = setInterval(()=>{
			this.heartbeatCmd();
		}, this.heartTime || 3000);
	}
	stopHeartbeat() {
		if(this.heartFn) clearInterval(this.heartFn);
	}
	heartbeatCmd() {
		if(!this.socketTask) return;
		// console.log('心跳指令:' + this.heartData)
		this.socketTask.send({
			data: this.heartData
		})
	}
	send(arg) {
		if(!this.socketTask) return;
		console.log('send:' + JSON.stringify(arg))
		this.socketTask.send(arg);
	}
	close(arg) {
		if(!this.socketTask) return;
		console.log('close')
		this.socketTask.close(arg);
	}
}