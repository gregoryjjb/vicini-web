import React from 'react';

import {
	withStyles,
} from '@material-ui/core';

import PluginContainer from 'containers/PluginContainer';
import SerialContainer from 'containers/SerialContainer';
import PageGrid from 'components/layout/PageGrid';
import PageGridItem from '../components/layout/PageGridItem';

const styles = theme => ({
	
})

const PluginPage = ({ classes, match }) => (
	<PageGrid columns='50% 50%' rows='auto' >
		<PageGridItem column='1 / 2' >
			<PluginContainer pluginId={match.params.id} port={match.params.port} />
		</PageGridItem>
		<PageGridItem column='2 / 3' >
			<SerialContainer className={classes.serial} />
		</PageGridItem>
	</PageGrid>
)

export default withStyles(styles)(PluginPage);