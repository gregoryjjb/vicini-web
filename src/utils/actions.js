import { store } from './store';
import api from './api';
import { setSettings } from './storage';

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
			console.info('Creating new serial monitor window:', h.id);
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

export const sendSerialCommand = async ({ port, command, args }) => {
	
	let body = {
        command: {
            name: command,
            args: args,
        },
        timeout: null,
	}
	
	try {
		let result = await api.sendCommand(port, body);
		let { send, receive } = result.data.serial;
		
		addSerialLine({
            channel: port,
            text: send,
            sent: true,
        });
        
        addSerialLine({
            channel: port,
            text: receive,
            sent: false,
		});
		
		return receive;
	}
	catch(error) {
		console.error(error);
	}
}

export const sendSerialLine = async ({ port, line, wait = 500, }) => {
	
	let body = {
		command: {
			name: line,
			args: [],
		},
		timeout: null,
		wait,
	}
	
	addSerialLine({
		channel: port,
		text: line,
		sent: true,
	})
	
	try {
		let result = await api.sendCommand(port, body);
		let { previous, receive } = result.data.serial;
		
		if(previous) {
			addSerialLine({
				channel: port,
				text: previous,
				send: false,
			})
		}
		
		addSerialLine({
			channel: port,
			text: receive,
			send: false,
		})
	}
	catch(error) {
		console.error(error);
	}
}

export const showNotification = (message, variant='default') => {
	
	let n = { message, variant };
	let list = store.getCopy('ui.notifications');
	
	list.push(n);
	
	store.set('ui.notifications')(list);
}

window.SN = showNotification;

export const setLightMode = (yesNo) => {
	store.set('ui.lightMode')(yesNo);
	setSettings({ lightMode: yesNo });
}