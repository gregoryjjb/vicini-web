import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { withStyles } from '@material-ui/core';

import Header from 'components/Header';
import HomePage from 'pages/HomePage';
import PluginPage from 'pages/PluginPage';

const styles = theme => ({
	root: {},
	pageArea: {
		margin: 0, // Should this be here or on each page?
	}
})

class App extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			input: '',
			data: '',
		}
	}
	
	render() {
		const { classes } = this.props;
		
		return (
			<BrowserRouter>
				<div className="App">
					<Header />
					<div className={classes.pageArea} >
						<Route exact path="/" component={HomePage} />
						<Route path="/plugin/:id" component={PluginPage} />
					</div>
				</div>
			</BrowserRouter>
		);
	}
}

export default withStyles(styles)(App);
