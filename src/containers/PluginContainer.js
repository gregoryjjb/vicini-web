import React, { Component } from 'react';
import PropTypes from 'prop-types';

import checkTypes from 'utils/check-types';

import PluginWrapper from 'components/PluginWrapper';
import { pluginShape } from '../utils/types';
import { getSend } from 'utils/linduino';

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
            let plugin = pluginModule.default(getSend(this.props.port));
            
            let typeErrors = checkTypes(pluginShape, plugin, 'PluginContainer-loader');
            
            if(typeErrors.length > 0) {
                let msg = 'Plugin validation failed: \n' + typeErrors.join('\n');
                console.error(msg);
                this.setState({ error: msg });
            }
            else {
                // Validate plugin with proptypes
                checkTypes(pluginShape, plugin, 'PluginContainer-loader');
                
                // Put plugin somewhere
                this.setState({ plugin });
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
        
        return <PluginWrapper loading={loading} error={error} plugin={plugin} className={this.props.className} />
    }
}

PluginContainer.propTypes = {
    pluginId: PropTypes.string,
    port: PropTypes.string,
}

export default PluginContainer;