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

const styles = theme => ({
	card: {
		minWidth: 300,
		//margin: 16,
	},
	tabs: {
		background: theme.palette.primary.main,
		color: theme.palette.getContrastText(theme.palette.primary.light),
	},
	content: {
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
		marginLeft: 16,
	}
})

const SerialArea = ({ classes, ports, selectedTab, onTabChange }) => (
	<div style={{flex: 1}} >
		<Card className={classes.card}>
			<Tabs className={classes.tabs} value={selectedTab} onChange={onTabChange} >
				{ports.map(port => (
					<Tab label={port.id} key={port.id} />
				))}
			</Tabs>
			<CardContent className={classes.content}>
				{ports[selectedTab] &&
					<div>
						{ports[selectedTab].lines.map((l, key) => (
							<p key={key}>{l.text}</p>
						))}
					</div>
				}
				{/*<div className={classes.textArea} >
					{testLines.map(l => (
						<Typography variant="body2" key={l} >{l}</Typography>
					))}
				</div>
				<div className={classes.inputArea} >
					<TextField className={classes.input} placeholder="Send serial..." />
					<Button variant="contained" color="secondary" size='small' className={classes.sendButton} >
						Send
					</Button>
				</div>*/}
			</CardContent>
		</Card>
	</div>
)

SerialArea.propTypes = {
	ports: PropTypes.arrayOf(PropTypes.shape(serialPortShape)).isRequired,
}

export default withStyles(styles)(SerialArea);