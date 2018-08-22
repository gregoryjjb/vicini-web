import React from 'react';

import {
	withStyles,
} from '@material-ui/core';

const styles = theme => ({
	root: {
		margin: 8,
		minHeight: 0,
	},
})

const PageGridItem = ({
	classes,
	children,
	column='auto',
	row='auto',
}) => (
	<div
		className={classes.root}
		style={{
			gridColumn: column,
			gridRow: row,
		}} >
		{children}
	</div>
);

export default withStyles(styles)(PageGridItem);