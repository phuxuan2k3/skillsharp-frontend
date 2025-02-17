import io, { Socket } from 'socket.io-client';
import { url } from '../../app/env';

const threshUrl = url.thresh.base;

class SocketTestProcess {
	private readonly _instance: Socket;

	constructor() {
		this._instance = io(threshUrl + '/test-process', {
			autoConnect: false,
		});
	}

	connect() {
		this._instance.connect();
	}

	disconnect() {
		this._instance.disconnect();
	}

	emitRegisterProcess(testId: string) {
		this._instance.emit('register-process', testId);
	}

	onSync(callback: (data: number) => void) {
		this._instance.on('sync', callback);
	}

	onTimeout(callback: () => void) {
		this._instance.on('timeout', callback);
	}
}

export const socketTestProcess = new SocketTestProcess();