import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
	withStyles,
	Typography,
	TextField,
	Button,
	Divider,
} from '@material-ui/core';

import { serialPortShape } from 'utils/types';
import SerialChip from './SerialChip';

const styles = theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		minHeight: 0, // Firefox
	},
	chipArea: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		overflowY: 'auto',
		padding: '6px 0',
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
	emptyCommMessage: {
		color: theme.palette.text.disabled,
		padding: '16px 0',
		fontStyle: 'italic',
	},
})

class SerialMonitor extends Component {
	
	constructor(props) {
		super(props);
		
		this.scrollRef = null;
		
		this.state = {
			inputValue: '',
		}
	}
	
	componentDidMount() {
		setTimeout(() => this.forceScrollDown(), 500); // This is hacky but if we call it right away it's too soon
	}
	
	componentDidUpdate(prevProps) {
		
		let oldPort = prevProps.port;
		let newPort = this.props.port;
		
		if(!newPort) return;
		
		if(!oldPort && newPort) {
			this.forceScrollDown();
			return;
		}
		
		if(oldPort.lines.length !== newPort.lines.length) {
			this.forceScrollDown();
			return;
		}
	}
	
	forceScrollDown = () => {
		//console.log("FORCING SCROLL")
		this.scrollRef.scrollIntoView({ behavior: 'smooth' });
	}
	
	handleSend = () => {
		let { onSend, port } = this.props;
		let { inputValue } = this.state;
		
		if(onSend && inputValue) {
			onSend(inputValue, port.id);
			this.setState({ inputValue: '' });
		}
	}
	
	render() {
		let { classes, port, } = this.props;
		
		return (
			<div className={classes.root} >
				<Divider />
				<div className={classes.chipArea} >
					{port.lines.map((line, key) => (
						<SerialChip text={line.text} sent={line.sent} key={key} />
					))}
					{port.lines.length === 0 &&
						<Typography
							className={classes.emptyCommMessage}
							variant="body1" >
							NO COMMUNICATION TO SHOW
						</Typography>
					}
					<div ref={el => { this.scrollRef = el; }} />
				</div>
				<Divider />
				<div className={classes.inputArea} >
					<TextField
						className={classes.input}
						placeholder="Send serial..."
						value={this.state.inputValue}
						disabled={port.disabled}
						onChange={e => this.setState({ inputValue: e.target.value })}
						onKeyDown={e => { if(e.keyCode === 13) this.handleSend() }} />
					<Button
						variant="contained"
						color="secondary"
						size='small'
						disabled={port.disabled}
						className={classes.sendButton}
						onClick={this.handleSend} >
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