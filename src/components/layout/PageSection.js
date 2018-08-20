import React from 'react';

import {
	withStyles,
} from '@material-ui/core';

const styles = theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		minHeight: 0,
		maxHeight: '100%',
	},
})

const PageSection = ({ classes, children }) => (
	<div className={classes.root} >
		{children}
	</div>
);

export default withStyles(styles)(PageSection);