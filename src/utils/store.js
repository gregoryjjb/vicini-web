import { connect, createStore, withLogger } from 'undux';

// Create a store with an initial value.
export let store = createStore({
	pluginId: '',
	
	'ui.lightMode': true,
	
	'hardware.loading': false,
	'hardware.error': false,
	'hardware.list': [],
	
	'plugin.id': '',
	
	'serial.ports': [],
	'serial.selectedTab': 0,
});

store.getCopy = (key) => JSON.parse(JSON.stringify(store.get(key)));

store.setCopy = (key) => (value) => store.set(key)(JSON.parse(JSON.stringify(value)));

export let withStore = connect(withLogger(store));