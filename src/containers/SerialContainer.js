import React, { Component } from 'react';
import { withStore } from 'utils/store';

import SerialCard from 'components/serial/SerialCard';

import { sendSerialLine } from 'utils/actions';

class SerialContainer extends Component {
	
	handleTabChange = (event, value) => {
		let { store } = this.props;
		store.set('serial.selectedTab')(value);
	}
	
	handleSend = (text, channel) => {
		if(text) {
			sendSerialLine({ port: channel, line: text, });
		}
	}
	
	render() {
		let { store } = this.props;
		
		let ports = store.get('serial.ports');
		let tab = store.get('serial.selectedTab');
		
		return(
			<SerialCard
				className={this.props.className}
				ports={ports}
				selectedTab={tab}
				onTabChange={this.handleTabChange}
				onSend={this.handleSend} />
		)
	}
}

export default withStore(SerialContainer);