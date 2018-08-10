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

export const refreshSerialChannels = () => {
	
	console.log("REFRESH SERIAL CHANNELS")
	
	let ports = store.getCopy('serial.ports');
	let hardware = store.getCopy('hardware.list');
	
	for(let h of hardware) {
		console.log('Checking', h.id)
		// If a port for this hardware doesn't exist
		if(h.open === true && ports.find(p => p.id === h.id) === undefined) {
			console.log(h.id)
			ports.push({
				id: h.id,
				lines: [],
			});
		}
	}
	
	store.set('serial.ports')(ports);
}