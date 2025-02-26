import io from 'socket.io-client';
import { url } from '../../app/env';

class SocketTestProcess {
	private readonly _instance: SocketIOClient.Socket;
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
		console.log('Connected to test-process socket: ', this._instance.id);
	}

	disconnect() {
		this._instance.disconnect();
		this._hasConnected = false;
		console.log('Disconnected from test-process socket: ', this._instance.id);
	}

	onSync(callback: (data: number) => void) {
		this._instance.on('sync', callback);
	}

	onTimeout(callback: () => void) {
		this._instance.on('timeout', callback);
	}

	onAnswered(callback: (data: { questionId: number, optionId: number }[]) => void) {
		this._instance.on('answered', callback);
	}
}

export const socketTestProcess = new SocketTestProcess();