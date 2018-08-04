import React from 'react';
import PropTypes from 'prop-types';

import { serialPortShape } from 'utils/types';

import {
	withStyles,
	Card,
	CardContent,
	Button,
	TextField,
	Typography,
	Tabs,
	Tab,
	TabContainer,
} from '@material-ui/core';
import SerialMonitor from './SerialMonitor';

const styles = theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		minHeight: 0, // Firefox
	},
	tabs: {
		//background: theme.palette.primary.main,
		color: theme.palette.text.primary,
		flexShrink: 0,
	},
	content: {
		flexShrink: 1,
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
	},
	textArea: {
		flex: '1 1 0%',
		minHeight: 500,
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
		marginLeft: theme.spacing.unit * 2,
	}
})

const SerialCard = ({ className, classes, ports, selectedTab, onTabChange, onSend }) => (
	<div className={classes.root}>
		<Typography variant="headline">Serial Monitor</Typography>
		<Tabs className={classes.tabs} value={selectedTab} onChange={onTabChange} >
			{ports.map(port => (
				<Tab label={port.id} key={port.id} />
			))}
		</Tabs>
		{ports[selectedTab] &&
			<SerialMonitor port={ports[selectedTab]} onSend={onSend} />
		}
	</div>
)

SerialCard.propTypes = {
	ports: PropTypes.arrayOf(PropTypes.shape(serialPortShape)).isRequired,
}

export default withStyles(styles)(SerialCard);