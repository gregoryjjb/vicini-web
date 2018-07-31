import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
	withStyles,
	Chip,
	TextField,
	Button,
	Divider,
} from '@material-ui/core';

import { serialPortShape } from 'utils/types';
import { addSerialLine } from 'utils/actions';

const styles = theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
	},
	chipArea: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		overflowY: 'auto',
		padding: '8px 0',
	},
	chip: {
		marginBottom: 8,
		flexShrink: 0,
	},
	sentChip: {
		backgroundColor: 'unset',
		border: '1px solid ' + theme.palette.text.secondary,
		alignSelf: 'flex-end',
	},
	receivedChip: {
		alignSelf: 'flex-start',
	},
	inputArea: {
		flexShrink: 0,
		display: 'flex',
		flexDirection: 'row',
		marginTop: 16,
	},
	input: {
		flex: 1,
	},
	sendButton: {
		borderRadius: 100,
		marginLeft: 16,
	},
})

class SerialMonitor extends Component {
	
	constructor(props) {
		super(props);
		
		this.scrollRef = null;
	}
	
	componentDidMount() {
		//this.scrollRef.scrollIntoView({ behavior: 'smooth' });
	}
	
	render() {
		let { classes, port } = this.props;
		
		return (
			<div className={classes.root} >
				<div className={classes.chipArea} >
					{port.lines.map(line => (
						<Chip className={classes.chip + " " + (line.sent ? classes.sentChip : classes.receivedChip)} label={line.text} />
					))}
					<div ref={el => { this.scrollRef = el; }} />
				</div>
				<Divider />
				<div className={classes.inputArea} >
					<TextField className={classes.input} placeholder="Send serial..." />
					<Button
						variant="contained"
						color="secondary"
						size='small'
						className={classes.sendButton}
						onClick={() => addSerialLine({ channel: port.id, text: "I can't read your input yet", sent: true })} >
						Send
					</Button>
				</div>
			</div>
		);
	}
}

SerialMonitor.propTypes = {
	port: PropTypes.shape(serialPortShape).isRequired,
}

export default withStyles(styles)(SerialMonitor);