import React from 'react';

import {
	withStyles,
} from '@material-ui/core';

import PluginContainer from 'containers/PluginContainer';
import SerialMonitorContainer from 'containers/SerialMonitorContainer';
import PageGrid from 'components/layout/PageGrid';
import PageGridItem from '../components/layout/PageGridItem';
import TabbedGridItem from '../components/layout/TabbedGridItem';

const styles = theme => ({
	
})

const PluginPage = ({ classes, match }) => (
	<PageGrid columns='50% 50%' rows='auto' >
		<PageGridItem column='1 / 2' >
			<PluginContainer pluginId={match.params.id} port={match.params.port} />
		</PageGridItem>
		{/*<PageGridItem column='2 / 3' >
			<SerialContainer className={classes.serial} />
		</PageGridItem>*/}
		<TabbedGridItem 
			card
			labels={['Serial Monitor', 'Data Analysis']}
			contents={[
				<SerialMonitorContainer hardwareId={match.params.port} />,
				<h1>Analyze your data here... eventually</h1>,
			]} />
	</PageGrid>
)

export default withStyles(styles)(PluginPage);