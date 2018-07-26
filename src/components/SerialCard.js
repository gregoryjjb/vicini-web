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

const testLines = [
	"Hi there",
	"This is some test serial lines",
	"One",
	"Two",
	"Three",
	"Four",
]

const SerialArea = ({ classes, ports, selectedTab, onTabChange }) => (
	<div style={{flex: 1}} >
		<Card className={classes.card}>
			<CardContent className={classes.content}>
				<Tabs value={selectedTab} onChange={onTabChange}>
					{ports.map(port => (
						<Tab label={port.id} />
					))}
				</Tabs>
				{ports[selectedTab] &&
					<div>
						{ports[selectedTab].lines.map(l => (
							<p>{l.text}</p>
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