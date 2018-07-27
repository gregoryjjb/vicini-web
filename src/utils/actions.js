import { store } from './store';

export const addSerialChannel = ({ id }) => {
	
	let ports = store.getCopy('serial.ports');
	
	if(ports.find(p => p.id === id) !== undefined) return;
	
	let newPorts = [
		...ports,
		{
			id,
			lines: [],
		}
	]
	
	store.set('serial.ports')(newPorts);
}

export const addSerialLine = ({ channel, text, sent = false }) => {
	
	//let ports = JSON.parse(JSON.stringify(store.get('serial.ports')));
	let ports = store.getCopy('serial.ports');
	let port = ports.find(p => p.id === channel);
	if(port === undefined) return;
	
	port.lines.push({
		text,
		sent,
	})
	
	store.set('serial.ports')(ports);
}