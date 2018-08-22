import React from 'react';

import {
	withStyles,
} from '@material-ui/core';

const styles = theme => ({
	root: {
		height: '100%',
		margin: -8,
		display: 'grid',
	},
})

const PageGrid = ({ children, classes, columns='auto', rows='auto', }) => (
	<div
		className={classes.root}
		style={{
			gridTemplateColumns: columns,
			gridTemplateRows: rows,
		}} >
		{children}
	</div>
);

export default withStyles(styles)(PageGrid);