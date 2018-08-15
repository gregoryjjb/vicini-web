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
			values: {},
			errors: {},
		}
	}
	
	loadValues = (fields = []) => {
		let values = {};
		let errors = {};
		
		for(let field of fields) {
			let { name, defaultValue } = field;
			values[name] = defaultValue !== undefined ? defaultValue : '';
			
			if(typeof field.error === 'function') {
				errors[name] = '';
			}
		}
		
		this.setState({ errors });
		this.performReduce(values);
	}
	
	performReduce = (values) => {
		const { reducer, fields } = this.props.plugin;
		
		let newValues, errors;
		
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
			
			newValues = {
				...values,
				...reducedOutputs,
			}
		}
		
		errors = this.performValidation(newValues);
		
		this.setState({
			values: newValues,
			errors,
		})
	}
	
	performValidation = (values) => {
		const { fields } = this.props.plugin;
		
		const errors = fields
		.filter(f => typeof f.error === 'function')
		.reduce((acc, f) => {
			acc[f.name] = f.error(values);
			return acc;
		}, {});
		
		console.log('Errors: ', errors);
		
		return errors;
	}
	
	handleInputChange = (e) => {
		let { name, value, checked, type, } = e.target;
		
		if(type === 'checkbox') {
			value = checked;
		}
		
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
		
		buttonField.onClick({...this.state.values}, updatedValues => {
			updatedValues = this.cleanValues(updatedValues);
			this.performReduce(updatedValues);
		});
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
			<div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, }} >
				<Typography variant="headline" gutterBottom>{plugin.name}</Typography>
				<Typography variant="subheading" gutterBottom>{plugin.description}</Typography>
				<PluginForm
					fields={plugin.fields}
					values={this.state.values}
					errors={this.state.errors}
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