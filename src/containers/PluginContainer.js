import React, { Component } from 'react';
import PropTypes from 'prop-types';

import checkTypes from 'utils/check-types';
import { pluginType } from 'utils/types';

import PluginWrapper from 'components/PluginWrapper';

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
            
            console.log(plugin);
            
            
            // Validate plugin with proptypes
            //PropTypes.checkPropTypes({ plugin: pluginType }, { plugin }, 'prop', 'PluginContainer-loader');
            try {
                checkTypes({ plugin: pluginType }, { plugin }, 'prop', 'PluginContainer-loader');
                
                console.log("Setting state with plugin")
            
                // Put plugin somewhere
                this.setState({ plugin });
            }
            catch(e) {
                
                console.log("Caught an error")
                
                this.setState({ error: e.message });
            }
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
		
		if(pluginId && typeof pluginId === 'string') {
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
        
        return <PluginWrapper loading={loading} error={error} plugin={plugin} />
    }
}

PluginContainer.propTypes = {
    pluginId: PropTypes.string,
}

export default PluginContainer;