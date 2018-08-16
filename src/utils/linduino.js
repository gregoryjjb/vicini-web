import api from './api';

export const send = (port, command, args = [], callback) => {
	
	//let newData = Math.floor(Math.random() * 100);
	
	//addSerialLine({
	//	channel: port,
	//	text: command,
	//	sent: true,
	//})
	
	api.sendCommand(port, command, args)
	.then(response => {
		//addSerialLine({
		//	channel: port,
		//	text: response,
		//	sent: false,
		//})
		callback(response)
	})
}

export const getSend = (port) => (command, args, callback) => send(port, command, args, callback);