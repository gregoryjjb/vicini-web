import api from './api';
import { addSerialLine } from './actions';

export const send = (port, command, args = [], callback) => {
	
	//let newData = Math.floor(Math.random() * 100);
	
	addSerialLine({
		channel: port,
		text: command,
		sent: true,
	})
	
	api.sendCommand('COM4', command, args)
	.then(response => {
		addSerialLine({
			channel: 'COM4',
			text: response,
			sent: false,
		})
		callback(response)
	})
}

export const getSend = (port) => (command, args, callback) => send(port, command, args, callback);