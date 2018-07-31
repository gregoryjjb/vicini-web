import React from 'react';

import {
	withStyles,
	Typography,
	Grid,
} from '@material-ui/core';

import PluginContainer from 'containers/PluginContainer';
import SerialContainer from 'containers/SerialContainer';
import PageLayout from '../components/PageLayout';

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
	plugin: {
		...theme.mixins.verticalSlice,
	},
	serial: theme.mixins.verticalSlice,
})

const PluginPage = ({ classes, match }) => (
	<PageLayout>
		<div className={classes.plugin}>
			<PluginContainer pluginId={match.params.id} />
		</div>
		<SerialContainer className={classes.serial} />
		{/*<div className={classes.content} >
			<Grid container spacing={16} className={classes.grid} >
				<Grid item xs={12}>
					<Typography variant="display1">Plugin ID is: {match.params.id}</Typography>
				</Grid>
				<Grid item xs={6} >
					<PluginContainer pluginId={match.params.id} />
				</Grid>
				<Grid item xs={6} >
					<SerialContainer />
				</Grid>
			</Grid>
		</div>*/}
	</PageLayout>
)

export default withStyles(styles)(PluginPage);