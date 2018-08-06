import React, { Component } from 'react';
import { withStore } from 'utils/store';

import SerialCard from 'components/serial/SerialCard';

import { addSerialLine } from 'utils/actions';
import api from 'utils/api';

class SerialContainer extends Component {
	
	handleTabChange = (event, value) => {
		let { store } = this.props;
		store.set('serial.selectedTab')(value);
	}
	
	handleSend = (text, channel) => {
		if(text) {
			//addSerialLine({ channel, text, sent: true });
			api.sendCommand(channel, text, [""])
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