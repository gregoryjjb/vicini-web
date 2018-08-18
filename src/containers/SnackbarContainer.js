import React, { Component } from 'react';

import { withStore } from 'utils/store';
import ColoredSnackbar from '../components/ColoredSnackbar';

class SnackbarContainer extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			current: null,
			open: false,
		}
	}
	
	handleClose = (event, reason) => {
		if(reason === 'clickaway') return;
		
		this.setState({
			open: false,
		})
	}
	
	handleExited = () => {
		this.setState({
			current: null,
		})
	}
	
	componentDidUpdate() {
		let { store } = this.props;
		
		let notifications = store.get('ui.notifications');
		let top = notifications[0];
		
		if(this.state.current === null && top) {
			this.setState({
				current: {
					...top,
					key: new Date().getTime(),
				},
				open: true,
			})
			
			notifications.shift();
			store.set('ui.notifications')(notifications);
		}
		
	}
	
	render() {
		let { open, current } = this.state;
		
		return(
			current &&
			<ColoredSnackbar
				key={current.key}
				open={open}
				duration={current.duration || 5000}
				onClose={this.handleClose}
				onExited={this.handleExited}
				message={current.message}
				variant={current.variant || 'default'}
				/>
		)
	}
	
}

export default withStore(SnackbarContainer);