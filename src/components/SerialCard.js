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
		minWidth: 300,
		display: 'flex',
		flexDirection: 'column',
	},
	tabs: {
		//background: theme.palette.primary.main,
		//color: theme.palette.getContrastText(theme.palette.primary.light),
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
	<Card className={classes.root + " " + className}>
		<CardContent>
			<Typography variant="headline">Serial Monitor</Typography>
		</CardContent>
		<Tabs className={classes.tabs} value={selectedTab} onChange={onTabChange} >
			{ports.map(port => (
				<Tab label={port.id} key={port.id} />
			))}
		</Tabs>
		<CardContent className={classes.content}>
			{ports[selectedTab] &&
				<SerialMonitor port={ports[selectedTab]} onSend={onSend} />
			}
		</CardContent>
	</Card>
)

SerialCard.propTypes = {
	ports: PropTypes.arrayOf(PropTypes.shape(serialPortShape)).isRequired,
}

export default withStyles(styles)(SerialCard);