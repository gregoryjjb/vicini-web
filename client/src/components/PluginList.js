import React from 'react';

import {
	withStyles,
	List,
	ListItem,
	ListItemText,
} from '@material-ui/core';

import plugins from 'plugins';
import { store } from 'utils/store';

const styles = theme => ({
	root: {
		width: 280,
		background: theme.palette.background.paper,
	},
})

const PluginList = ({ classes, pluginClicked }) => (
	<div className={classes.root} >
		<List>
			<ListItem>
				<ListItemText primary="Plugins" />
			</ListItem>
			{plugins.map(plugin => (
				<ListItem button onClick={() => store.set('pluginId')(plugin.name)} >
					<ListItemText primary={plugin.name} />
				</ListItem>
			))}
			
		</List>
	</div>
)

export default withStyles(styles)(PluginList);