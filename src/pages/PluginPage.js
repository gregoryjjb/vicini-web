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
})

const PluginPage = ({ classes, match }) => (
	<PageLayout>
		<VerticalSliceCard noBottom >
			<PluginContainer pluginId={match.params.id} port={match.params.port} />
		</VerticalSliceCard>
		<VerticalSliceCard>
			<SerialContainer className={classes.serial} />
		</VerticalSliceCard>
	</PageLayout>
)

export default withStyles(styles)(PluginPage);