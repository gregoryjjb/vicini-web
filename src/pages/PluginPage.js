import React from 'react';

import {
	withStyles,
} from '@material-ui/core';

import PluginContainer from 'containers/PluginContainer';
import SerialContainer from 'containers/SerialContainer';
import PageLayout from '../components/PageLayout';
import VerticalSliceCard from 'components/layout/VerticalSliceCard';

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
	
	column: {
		margin: '0 8px',
		//height: '100%',
		minHeight: 0,
	}
})

const PluginPage = ({ classes, match }) => (
	<PageLayout>
		<div className={classes.column} >
			<PluginContainer pluginId={match.params.id} port={match.params.port} />
		</div>
		<div className={classes.column}>
			<SerialContainer className={classes.serial} />
		</div>
	</PageLayout>
)

export default withStyles(styles)(PluginPage);