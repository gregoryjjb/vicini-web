import React from "react";
import PropTypes from 'prop-types';
import { pluginType } from 'utils/types';

import {
	withStyles,
	CircularProgress,
	Typography,
	Card,
	CardContent,
} from "@material-ui/core";

import Plugin from 'components/Plugin';

const styles = theme => ({
	root: {},
})

const PluginWrapper = ({ classes, loading, error, plugin }) => {
	
	let content;
	
	if(loading) {
		content = (
			<div style={{ textAlign: 'center' }} >
				<CircularProgress />
			</div>
		)
	}
	else if(error) {
		content = <Typography variant="headline">{error}</Typography>;
	}
	else if(plugin && plugin.name) {
		content = <Plugin plugin={plugin} />;
	}
	else {
		content = <Typography variant="headline">No plugin loaded</Typography>
	}
	
	return(
		<div style={{flex: 1}} >
			<Card>
				<CardContent>
					{content}
				</CardContent>
			</Card>
		</div>
	)
};

PluginWrapper.propTypes = {
	loading: PropTypes.bool.isRequired,
	error: PropTypes.string,
	plugin: pluginType,
}

export default withStyles(styles)(PluginWrapper);