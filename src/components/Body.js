import React from 'react';

import {
	withStyles,
	AppBar,
	Toolbar,
	Typography,
	Button,
	Grid,
} from '@material-ui/core';

import PluginList from './PluginList';
import Plugin from './Plugin';
import SerialCard from './SerialCard';

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

const Body = ({ classes }) => (
	<div className={classes.root} >
		
		<div className={classes.content} >
			<PluginList />
			<Grid container spacing={16} className={classes.grid} >
				<Grid item xs={6} >
					<Plugin pluginId="LTC1234" />
				</Grid>
				<Grid item xs={6} >
					<SerialCard />
				</Grid>
			</Grid>
		</div>
	</div>
)

export default withStyles(styles)(Body);