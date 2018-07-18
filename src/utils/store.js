import { connect, createStore, withLogger } from 'undux';

// Create a store with an initial value.
export let store = createStore({
	pluginId: '',
	
	'ui.lightMode': true,
	
	'hardware.loading': false,
	'hardware.error': false,
	'hardware.list': [],
	
	'plugin.id': '',
})

export let withStore = connect(withLogger(store));