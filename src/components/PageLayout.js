import React from 'react';

import {
	withStyles,
} from '@material-ui/core';

const styles = theme => ({
	root: {
		height: '100%',
		margin: '0 -8px',
		
		//display: 'flex',
		//flexDirection: 'row',
		//alignItems: 'flex-start',
		display: 'grid',
		gridTemplateColumns: '50% 50%',
		gridTemplateRows: 'auto',
	},
})

const PageLayout = ({ children, classes }) => (
	<div className={classes.root} >
		{children}
	</div>
);

export default withStyles(styles)(PageLayout);