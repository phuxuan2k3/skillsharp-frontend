import io, { Socket } from 'socket.io-client';
import { url } from '../../app/env';

class SocketTestProcess {
	private readonly _instance: Socket;
	private _hasConnected: boolean = false;

	constructor() {
		this._instance = io(url.thresh.socket + '/test-process', {
			autoConnect: false,
		});
		this._hasConnected = false;
	}

	connect(testId: string) {
		if (this._hasConnected) return;
		this._instance.connect();
		this._instance.emit('register-process', testId);
		this._hasConnected = true;
	}

	disconnect() {
		this._instance.disconnect();
	}

	onSync(callback: (data: number) => void) {
		this._instance.on('sync', callback);
	}

	onTimeout(callback: () => void) {
		this._instance.on('timeout', callback);
	}
}

export const socketTestProcess = new SocketTestProcess();