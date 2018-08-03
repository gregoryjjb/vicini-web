import React from 'react';

import {
	withStyles,
	Card,
	CardContent,
} from '@material-ui/core';

const styles = theme => ({
	root: {
		margin: '0 8px',
		flex: 1,
		maxHeight: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	content: {
		display: 'flex',
		flexDirection: 'column',
	}
})

const VerticalSliceCard = ({ classes, children, noBottom, }) => (
	<Card className={classes.root} >
		<CardContent
			className={classes.content}
			style={{
				paddingBottom: noBottom ? 0 : 24,
			}} >
			{children}
		</CardContent>
	</Card>
);

export default withStyles(styles)(VerticalSliceCard);