import { store } from './store';
import api from './api';

const hw = (apiFunc, id) => {
	store.set('hardware.loading')(true);
	store.set('hardware.error')(false);
	
	apiFunc(id)
	.then(res => {
		store.setCopy('hardware.list')(res.data.hardware);
		refreshSerialChannels();
	})
	.catch(err => {
		console.error(err);
		store.set('hardware.error')(true);
	})
	.then(() => {
		store.set('hardware.loading')(false);
	})
}

export const refreshHardware = () => hw(api.getHardware);

export const openHardware = (id) => hw(api.openHardware, id);

export const closeHardware = (id) => hw(api.closeHardware, id);

export const addSerialChannel = ({ id }) => {
	let ports = store.getCopy('serial.ports');
	if(ports.find(p => p.id === id) !== undefined) return;
	
	let newPorts = [
		...ports,
		{
			id,
			disabled: false,
			lines: [],
		}
	]
	
	store.set('serial.ports')(newPorts);
}

export const addSerialLine = ({ channel, text, sent = false }) => {
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
	let ports = store.getCopy('serial.ports');
	let hardware = store.getCopy('hardware.list');
	
	for(let h of hardware) {
		// If a port for this hardware doesn't exist
		if(h.open === true && ports.find(p => p.id === h.id) === undefined) {
			console.log(h.id)
			ports.push({
				id: h.id,
				disabled: false,
				lines: [],
			});
		}
	}
	
	// Disabled closed ports
	for(let p of ports) {
		let h = hardware.find(h => h.id === p.id);
		p.disabled = (h === undefined || h.open === false);
	}
	
	store.set('serial.ports')(ports);
}