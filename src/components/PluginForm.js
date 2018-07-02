import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';

import PluginField from './PluginField';

const styles = {
	form: {
		display: 'flex',
		flexDirection: 'column',
	},
	input: {
		width: '100%',
		marginBottom: 16,
	},
}

class PluginForm extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			values: {},
		}
	}
	
	loadValues = (fields = []) => {
		
		console.info("LOADING NEW DEFAULTVALUES");
		
		let values = {};
		
		for(let field of fields) {
			let { name, defaultValue, output } = field;
			
			values[name] = defaultValue;
		}
		
		this.performReduce(values);
	}
	
	handleInputChange = (e) => {
		
		let { name, value } = e.target;
		
		let newValues = {
			...this.state.values,
			[name]: value,
		}
		
		this.performReduce(newValues);
	}
	
	performReduce = (values) => {
		
		const { reducer, fields } = this.props;
		
		if(typeof reducer == 'function') {
			let reducedValues = reducer(values);
			let reducedOutputs = {};
			
			// Don't let the reducer change the inputs
			let outputNames = fields.filter(f => f.output === true).map(f => f.name);
			for(let n of outputNames) {
				reducedOutputs[n] = reducedValues[n];
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
	
	componentDidMount() {
		
		if(this.props.fields) {
			this.loadValues(this.props.fields);
		}
	}
	
	// Re-fetch new plugin if selected plugin changed
	componentDidUpdate(prevProps) {
		if(this.props.fields != prevProps.fields) {
			this.loadValues(this.props.fields);
		}
	}
	
	render() {
		
		let { fields, classes } = this.props;
		
		if(!Array.isArray(fields)) {
			return <p>Whoops no array</p>
		}
		
		return(
			<form className={classes.form} >
				{fields.map(f => (
					<PluginField
						className={classes.input}
						field={f}
						value={this.state.values[f.name]}
						onChange={this.handleInputChange} />
				))}
			</form>
		)
	}
}

PluginForm.propTypes = {
	fields: PropTypes.array.isRequired,
}

export default withStyles(styles)(PluginForm);