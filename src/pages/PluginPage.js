import React from 'react';

import {
	withStyles,
	AppBar,
	Toolbar,
	Typography,
	Button,
	Grid,
} from '@material-ui/core';

import Plugin from 'components/Plugin';
import SerialCard from 'components/SerialCard';

const styles = theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
	},
	toolbarSpacing: {
		...theme.mixins.toolbar,
	},
	content: {
		display: 'flex',
		flexDirection: 'row',
	},
	grid: {
		margin: 16,
	}
})

const PluginPage = ({ classes, match }) => (
	<div className={classes.root} >
		
		<div className={classes.content} >
			<Grid container spacing={16} className={classes.grid} >
				<Grid item xs={12}>
					<Typography variant="display1">Plugin ID is: {match.params.id}</Typography>
				</Grid>
				<Grid item xs={6} >
					<Plugin pluginId={match.params.id} />
				</Grid>
				<Grid item xs={6} >
					<SerialCard />
				</Grid>
			</Grid>
		</div>
	</div>
)

export default withStyles(styles)(PluginPage);