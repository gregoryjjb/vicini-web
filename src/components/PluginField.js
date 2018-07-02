import React from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@material-ui/core';

const PluginField = ({ className, field, value, onChange }) => {
	
	let isOutput = field.output || false;
	
	return (
		<TextField
			className={className}
			name={field.name}
			label={field.label || field.name}
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
	})
}

export default PluginField;