import React from 'react';

import {
	withStyles,
	Card,
	CardContent,
	Button,
	TextField,
	Typography,
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

const SerialArea = ({ classes }) => (
	<div style={{flex: 1}} >
		<Card className={classes.card}>
			<CardContent className={classes.content}>
				<div className={classes.textArea} >
					{testLines.map(l => (
						<Typography variant="body2" >{l}</Typography>
					))}
				</div>
				<div className={classes.inputArea} >
					<TextField className={classes.input} placeholder="Send serial..." />
					<Button variant="contained" color="secondary" size='small' className={classes.sendButton} >
						Send
					</Button>
				</div>
			</CardContent>
		</Card>
	</div>
)

export default withStyles(styles)(SerialArea);