import { connect, createStore, withLogger } from 'undux';

// Create a store with an initial value.
export let store = createStore({
	pluginId: '',
	'hardware.loading': false,
	'hardware.error': false,
	'hardware.list': [],
})

export let withStore = connect(withLogger(store));