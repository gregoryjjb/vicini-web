import React from 'react';
import PropTypes from 'prop-types';

import {
	withStyles,
	Chip,
	TextField,
	Button,
} from '@material-ui/core';

import { serialPortShape } from 'utils/types';
import { addSerialLine } from 'utils/actions';

const styles = theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
	},
	chipArea: {
		display: 'flex',
		flexDirection: 'column',
	},
	chip: {
		marginBottom: 8,
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
		display: 'flex',
		flexDirection: 'row',
	},
	input: {
		flex: 1,
	},
	sendButton: {
		borderRadius: 100,
		marginLeft: 16,
	},
})

const SerialMonitor = ({ classes, port }) => (
	<div className={classes.root} >
		<div className={classes.chipArea} >
			{port.lines.map(line => (
				<Chip className={classes.chip + " " + (line.sent ? classes.sentChip : classes.receivedChip)} label={line.text} />
			))}
		</div>
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

SerialMonitor.propTypes = {
	port: PropTypes.shape(serialPortShape).isRequired,
}

export default withStyles(styles)(SerialMonitor);