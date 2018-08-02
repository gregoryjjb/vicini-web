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
	root: {
		overflowY: 'auto',
	},
	error: {
		color: theme.palette.error.dark,
	}
})

const PluginWrapper = ({ className, classes, loading, error, plugin }) => {
	
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
				
				<code style={{ whiteSpace: 'pre-wrap' }} >{error}</code>
			</span>
		);
	}
	else if(plugin && plugin.name) {
		content = <Plugin plugin={plugin} />;
	}
	else {
		content = <Typography variant="headline">No plugin loaded</Typography>
	}
	
	return(
		<Card className={classes.root} >
			<CardContent>
				{content}
			</CardContent>
		</Card>
	)
};

PluginWrapper.propTypes = {
	loading: PropTypes.bool.isRequired,
	error: PropTypes.string,
	plugin: pluginType,
}

export default withStyles(styles)(PluginWrapper);