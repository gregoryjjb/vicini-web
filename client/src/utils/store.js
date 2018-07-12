import { connect, createStore, withLogger } from 'undux';

// Create a store with an initial value.
export let store = createStore({
	pluginId: '',
})

export let withStore = connect(withLogger(store));