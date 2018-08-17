import { sendSerialCommand } from './actions';

export const send = (port, command, args = [], callback) => {
	
	sendSerialCommand({ port, command, args })
	.then(response => {
		callback(response)
	})
}

export const getSend = (port) => (command, args, callback) => send(port, command, args, callback);