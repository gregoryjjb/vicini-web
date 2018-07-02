import React, { Component } from 'react';

import Header from 'components/Header';
import Body from './Body';

class App extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			input: '',
			data: '',
		}
	}
	
	loadPlugin = (filename) => {
		import(`../plugins/${this.state.input}`)
		.then(plugin => {
			this.setState({
				data: plugin.default,
			})
		})
		.catch(error => {
			this.setState({
				data: "Couldn't find a plugin by that name",
			})
		})
	}
	
	render() {
		return (
			<div className="App">
				<Header />
				<Body />
			</div>
		);
	}
}

export default App;
