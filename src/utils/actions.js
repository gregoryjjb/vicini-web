import { store } from './store';

export const addSerialChannel = ({ id }) => {
	
	let ports = store.get('serial.ports');
	
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

export const addSerialLine = ({ channel, text }) => {
	
	let ports = store.get('serial.ports');
	let port = ports.find(p => p.id === channel);
	if(port === undefined) return;
	
	port.lines.push({
		text,
	})
}