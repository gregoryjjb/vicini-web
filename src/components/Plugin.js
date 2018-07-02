import React from 'react';

import {
	withStyles,
	Typography,
	Card,
	CardContent,
	TextField,
} from '@material-ui/core';

import { withStore } from 'utils/store';
import PluginForm from './PluginForm';

const styles = theme => ({
	
})

class Plugin extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			plugin: null,
			error: "Please select a plugin",
		}
	}
	
	loadPlugin = (pluginId) => {
		import(`../plugins/${pluginId}`)
		.then(plugin => {
			this.setState({
				plugin: plugin.default,
				error: '',
			});
			
			console.log(plugin.default);
		})
		.catch(err => {
			
			let msg = `Plugin '${pluginId}' not found or failed to load`;
			console.error(msg);
			
			this.setState({
				plugin: null,
				error: msg,
			})
		})
	}
	
	// Fetch plugin if one is selected
	componentDidMount() {
		let pluginId = this.props.store.get('pluginId');
		
		console.log("ID", pluginId);
		
		if(pluginId && typeof pluginId == 'string') {
			this.loadPlugin(pluginId);
			console.log("Loading plugin")
		}
	}
	
	// Re-fetch new plugin if selected plugin changed
	componentDidUpdate(prevProps) {
		let newId = this.props.store.get('pluginId');
		let oldId = prevProps.store.get('pluginId');
		
		if(oldId !== newId) {
			this.loadPlugin(newId);
		}
	}
	
	render() {
		
		let { plugin } = this.state;
		
		return(
			<div style={{flex: 1}} >
				<Card>
					<CardContent>
						{plugin && plugin.name ? 
							<div style={{ display: 'flex', flexDirection: 'column' }} >
								<Typography variant="headline" gutterBottom>{plugin.name}</Typography>
								<Typography variant="subheading" gutterBottom>{plugin.description}</Typography>
								<PluginForm fields={plugin.fields} reducer={plugin.reducer} />
							</div>
							:
							<Typography variant="subheading">{this.state.error}</Typography>
						}
					</CardContent>
				</Card>
			</div>
		)
	}
}

export default withStyles(styles)(withStore(Plugin));