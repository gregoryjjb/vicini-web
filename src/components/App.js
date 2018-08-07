import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { withStyles } from '@material-ui/core';

import Header from 'components/Header';
import HomePage from 'pages/HomePage';
import PluginPage from 'pages/PluginPage';
import PageArea from './PageArea';
import TestPage from '../pages/TestPage';

const styles = theme => ({
	root: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
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
				<div className={classes.root} >
					<Header />
					<PageArea>
						<Route exact path="/" component={HomePage} />
						<Route path="/plugin/:port/:id" component={PluginPage} />
						<Route path="/test" component={TestPage} />
					</PageArea>
				</div>
			</BrowserRouter>
		);
	}
}

export default withStyles(styles)(App);
