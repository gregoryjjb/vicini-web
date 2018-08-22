import React from 'react';

import SerialMonitor from 'components/serial/SerialMonitor';

import { withStore } from 'utils/store';
import { sendSerialLine } from 'utils/actions';

class SerialMonitorContainer extends React.Component {
	constructor(props) {
		super(props);
	}
	
	handleSend = (text, channel) => {
		if(text) {
			sendSerialLine({ port: channel, line: text, });
		}
	}
	
	render() {
		let { store, hardwareId, } = this.props;
		
		let ports = store.get('serial.ports');
		let port = ports.find(p => p.id === hardwareId);
		
		return port ? <SerialMonitor port={port} onSend={this.handleSend} /> : null;
	}
}

export default withStore(SerialMonitorContainer);