import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { pluginType } from 'utils/types';

import Plugin from 'components/Plugin';

class PluginContainer extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            loading: false,
            error: '',
            plugin: null,
        }
    }
    
    loadPlugin = (pluginId) => {
        this.setState({ loading: true });
        
		import(`../plugins/${pluginId}`)
		.then(pluginModule => {
            let plugin = pluginModule.default;
            
            // Validate plugin with proptypes
            PropTypes.checkPropTypes(pluginType, plugin, 'prop', 'PluginContainer');
            
            console.log("Setting state with plugin")
            
            // Put plugin somewhere
            this.setState({ plugin });
		})
		.catch(err => {
			let msg = `Plugin '${pluginId}' not found or failed to load`;
			this.setState({ error: msg });
        })
        .finally(() => {
            this.setState({ loading: false });
        })
    }
    
    // @TODO put pluginId in the store and have the page matcher set the store THEN this will get updated
    componentDidMount() {
		let pluginId = this.props.pluginId;// store.get('pluginId');
		
		if(pluginId && typeof pluginId == 'string') {
			this.loadPlugin(pluginId);
		}
	}
	
	// Re-fetch new plugin if selected plugin changed
	componentDidUpdate(prevProps) {
		let newId = this.props.pluginId; //store.get('pluginId');
		let oldId = prevProps.pluginId; //store.get('pluginId');
		
		if(oldId !== newId) {
			this.loadPlugin(newId);
		}
	}
    
    render() {
        let { loading, error, plugin } = this.state;
        
        if(loading) return(
            <p>Loading...</p>
        )
        
        if(error) return(
            <p>{error}</p>
        )
        
        if(plugin !== null && plugin !== undefined) return (
            <Plugin plugin={plugin} />
        )
        
        return(
            <p>No plugin loaded</p>
        )
    }
}

PluginContainer.propTypes = {
    pluginId: PropTypes.string,
}

export default PluginContainer;