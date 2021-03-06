import React from "react";
import PropTypes from 'prop-types';
import { pluginType } from 'utils/types';

import {
	withStyles,
	CircularProgress,
	Typography,
} from "@material-ui/core";

import Plugin from 'components/Plugin';

const styles = theme => ({
	root: {
		//overflowY: 'auto',
	},
	error: {
		color: theme.palette.error.dark,
	},
	errorMsg: {
		...theme.typography.mono,
		whiteSpace: 'pre-wrap',
		paddingBottom: 24,
	}
})

const PluginWrapper = ({ classes, loading, error, hardwareConnected, plugin }) => {
	
	let content;
	
	if(loading) {
		content = (
			<div style={{ textAlign: 'center' }} >
				<CircularProgress />
			</div>
		)
	}
	else if(error) {
		content = (
			<span>
				<Typography variant="headline" className={classes.error} gutterBottom>Error loading plugin</Typography>
				
				<code className={classes.errorMsg} >{error}</code>
			</span>
		);
	}
	else if(plugin && plugin.name) {
		content = <Plugin plugin={plugin} hardwareConnected={hardwareConnected} />;
	}
	else {
		content = <Typography variant="headline">No plugin loaded</Typography>
	}
	
	return(content
	)
};

PluginWrapper.propTypes = {
	loading: PropTypes.bool.isRequired,
	error: PropTypes.string,
	plugin: pluginType,
}

export default withStyles(styles)(PluginWrapper);