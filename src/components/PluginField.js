import React from 'react';
import PropTypes from 'prop-types';

import {
	TextField,
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	InputAdornment,
} from '@material-ui/core';

const PluginField = ({ className, field, value, onChange, onClick, }) => {
	
	let isOutput = field.output || false;
	
	let label = field.label || field.name;
	
	let fixedValue = (value === undefined) ? '' : value;
	
	let units = (field.units ? <InputAdornment position='end'>{field.units}</InputAdornment> : null);
	
	if(field.type === 'button') {
		return (
			<Button
				className={className}
				name={field.name}
				variant="outlined"
				onClick={() => onClick(field.name)} >
				{label}
			</Button>
		)
	}
	
	if(field.type === 'select') {
		return(
			<FormControl className={className}>
				<InputLabel htmlFor={field.name}>{field.label}</InputLabel>
				<Select
					value={fixedValue}
					onChange={!isOutput ? onChange : undefined}
					endAdornment={units}
					inputProps={{
						name: field.name,
						id: field.name,
					}}>
					{field.options.map(o => (
						<MenuItem
							value={o.value}
							key={o.value} >
							{o.label}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		)
	}
	
	return (
		<TextField
			className={className}
			name={field.name}
			label={label}
			type={field.type}
			disabled={isOutput}
			value={fixedValue}
			InputProps={{
				endAdornment: units,
			}}
			onChange={!isOutput ? onChange : undefined}
		/>
	)
}

PluginField.propTypes = {
	field: PropTypes.shape({
		name: PropTypes.string.isRequired,
		label: PropTypes.string,
		type: PropTypes.string.isRequired,
		output: PropTypes.bool,
		onClick: PropTypes.func,
	})
}

export default PluginField;