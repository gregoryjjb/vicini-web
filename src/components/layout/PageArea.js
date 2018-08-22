import React from 'react';

import {
	withStyles,
} from '@material-ui/core';

const styles = theme => ({
	root: {
		position: 'absolute',
		top: 64,
		bottom: 0,
		left: 0,
		right: 0,
		margin: 16,
		display: 'flex',
		flexDirection: 'column',
	},
	spacer: theme.mixins.toolbar,
	page: {
		flex: 1,
		margin: 16,
	}
})

const PageArea = ({ classes, children }) => (
	<div className={classes.root} >
		{children}
	</div>
);

export default withStyles(styles)(PageArea);