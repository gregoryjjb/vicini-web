import React, { Component } from 'react';
import { withStore } from 'utils/store';

import SerialArea from 'components/SerialCard';

class SerialContainer extends Component {
	
	handleTabChange = (event, value) => {
		let { store } = this.props;
		store.set('serial.selectedTab')(value);
	}
	
	render() {
		let { store } = this.props;
		
		let ports = store.get('serial.ports');
		let tab = store.get('serial.selectedTab');
		
		return(
			<SerialArea
				className={this.props.className}
				ports={ports}
				selectedTab={tab}
				onTabChange={this.handleTabChange} />
		)
	}
}

export default withStore(SerialContainer);