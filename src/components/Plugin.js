import React from 'react';
import { pluginType } from 'utils/types';

import {
	withStyles,
	Typography,
} from '@material-ui/core';

import { withStore } from 'utils/store';
import PluginForm from './PluginForm';

const styles = theme => ({
	
})

class Plugin extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			values: {}
		}
	}
	
	loadValues = (fields = []) => {
		let values = {};
		
		for(let field of fields) {
			let { name, defaultValue } = field;
			values[name] = defaultValue || '';
		}
		
		this.performReduce(values);
	}
	
	performReduce = (values) => {
		
		const { reducer, fields } = this.props.plugin;
		
		if(typeof reducer === 'function') {
			let reducedValues = reducer(values);
			let reducedOutputs = { };
			
			// Don't let the reducer change the inputs
			for(let key in reducedValues) {
				let field = fields.find(f => f.name === key);
				if(field && field.output) {
					reducedOutputs[key] = reducedValues[key];
				}
			}
			
			let combo = {
				...values,
				...reducedOutputs,
			}
			
			this.setState({
				values: combo,
			})
		}
		else {
			this.setState({
				values: values,
			})
		}
	}
	
	handleInputChange = (e) => {
		let { name, value } = e.target;
		
		let newValues = {
			...this.state.values,
			[name]: value,
		}
		
		this.performReduce(newValues);
	}
	
	handleInputClick = (buttonName) => {
		let buttonField = this.props.plugin.fields.find(f => f.name === buttonName);
		
		if(!buttonField) {
			console.error(`NO BUTTON WITH NAME '${buttonName}' FOUND`)
			return;
		}
		
		let updatedValues = buttonField.onClick({...this.state.values});
		updatedValues = this.cleanValues(updatedValues);
		this.performReduce(updatedValues);
	}
	
	/** Removes any keys that shouldn't exist in the state
	 * (kind of slow, n^2)
	 */
	cleanValues = (values) => {
		let cleanedValues = {};
		let { fields } = this.props.plugin;
		
		for(let key in values) {
			let field = fields.find(f => f.name === key);
			if(field && field !== 'button') {
				cleanedValues[key] = values[key];
			}
		}
		
		return {
			...this.state.values,
			...cleanedValues,
		};
	}
	
	componentDidMount() {
		if(this.props.plugin.fields) {
			this.loadValues(this.props.plugin.fields);
		}
	}
	
	// Re-fetch new plugin if selected plugin changed
	componentDidUpdate(prevProps) {
		if(this.props.plugin !== prevProps.plugin) {
			this.loadValues(this.props.plugin.fields);
		}
	}
	
	render() {
		
		let { plugin } = this.props;
		
		return(
			<div style={{ display: 'flex', flexDirection: 'column' }} >
				<Typography variant="headline" gutterBottom>{plugin.name}</Typography>
				<Typography variant="subheading" gutterBottom>{plugin.description}</Typography>
				<PluginForm
					fields={plugin.fields}
					values={this.state.values}
					handleChange={this.handleInputChange}
					handleClick={this.handleInputClick} />
			</div>
		)
	}
}

Plugin.propTypes = {
	plugin: pluginType.isRequired,
}

export default withStyles(styles)(withStore(Plugin));