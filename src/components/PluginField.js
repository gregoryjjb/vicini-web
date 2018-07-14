import React from 'react';
import PropTypes from 'prop-types';

import { TextField, Button } from '@material-ui/core';

const PluginField = ({ className, field, value, onChange, onClick, }) => {
	
	let isOutput = field.output || false;
	
	let label = field.label || field.name;
	
	if(field.type === 'button') {
		return (
			<Button
				className={className}
				name={field.name}
				onClick={() => onClick(field.name)} >
				{label}
			</Button>
		)
	}
	
	return (
		<TextField
			className={className}
			name={field.name}
			label={label}
			type={field.type}
			disabled={isOutput}
			value={value || ''}
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