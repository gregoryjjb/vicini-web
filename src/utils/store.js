import { connect, createStore, withLogger } from 'undux';

// Create a store with an initial value.
export let store = createStore({
	pluginId: '',
	
	'ui.lightMode': true,
	
	'hardware.loading': false,
	'hardware.error': false,
	'hardware.list': [],
	
	'plugin.id': '',
	
	'serial.ports': [{
		id: 'TEST',
		disabled: true,
		lines: [{
			text: 'Hello there Linduino',
			sent: true,
		}, {
			text: 'Why hello customer',
			sent: false,
		}, {
			text: 'How are you on this fine day?',
			sent: false,
		}, {
			text: 'Well, and you?',
			sent: true,
		}, {
			text: 'Well as well',
			sent: false,
		}, {
			text: 'It is good to be a Linduino',
			sent: false,
		}, {
			text: 'I concur',
			sent: true,
		}]
	}],
	'serial.selectedTab': 0,
});

store.getCopy = (key) => JSON.parse(JSON.stringify(store.get(key)));

store.setCopy = (key) => (value) => store.set(key)(JSON.parse(JSON.stringify(value)));

export let withStore = connect(withLogger(store));