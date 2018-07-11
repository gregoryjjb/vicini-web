import React, { Component } from 'react';

import Header from 'components/Header';
import Body from './Body';
import HomePage from 'pages/HomePage';

class App extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			input: '',
			data: '',
		}
	}
	
	render() {
		return (
			<div className="App">
				<Header />
				<HomePage />
			</div>
		);
	}
}

export default App;
