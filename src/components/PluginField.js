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
	FormControlLabel,
	Checkbox,
	ListItemText,
	FormLabel,
	RadioGroup,
	Radio,
	FormHelperText,
} from '@material-ui/core';

import { fieldType } from 'utils/types';

const evaluate = (val, fallback, allVals) => {
	if(typeof val === 'function') {
		return val(allVals);
	}
	
	if(val === undefined || val === null) {
		return fallback;
	}
	
	return val;
}

const sanitizeField = (field, allValues) => {
	let f = {...field};
	
	// Label
	if(field.type === 'radio') {
        f.label = field.label;
    } else {
        //f.label = field.label || field.name;
        f.label = evaluate(field.label, field.name, allValues);
    }
	
	// Enabled/disabled
	f.output = field.output || false;
	let enabled = evaluate(field.enabled, true, allValues);
	f.disabled = f.output || !enabled;
	
	// Visibility
	f.visible = evaluate(field.visible, true, allValues);
	f.units = evaluate(field.units, undefined, allValues);
	
	// Multiline
	f.multiline = field.multiline || false;
	
	// Options
	f.options = [];
	if(field.options && field.options[0]) {
		if(typeof field.options[0] === 'string') {
			f.options = field.options.map(s => ({ value: s, label: s, }));
		}
		else {
			f.options = field.options;
		}
	}
	
	return f;
}

const PluginField = ({ className, field, value, error, anyError, allValues, onChange, onClick, }) => {
	
	let ff = sanitizeField(field, allValues);
	
	// Units adornment element
	let unitsEl = ff.units ? <InputAdornment position='end'>{ff.units}</InputAdornment> : null;
	
	// Sanitize value
	let fixedValue = (value === undefined) ? '' : value;
	if(ff.type === 'select-multi' && !Array.isArray(fixedValue)) {
		fixedValue = [];
	}
	
	// Sanitize on click/change events
	let fOnChange = !ff.output ? onChange : undefined;
	let fOnClick = (ff.type === 'button') ? () => onClick(ff.name) : undefined;
	
	// Error
	let hasError = error ? true : false;
	
	
	if(ff.type === 'none' && ff.visible !== true) return null;
	
	if(ff.visible === false) return null;
	
	if(ff.type === 'checkbox') {
		return(
			<FormControlLabel
				className={className}
				label={ff.label}
				control={
					<Checkbox
						name={ff.name}
						checked={fixedValue}
						onChange={fOnChange}
						disabled={ff.disabled}
					/>
				}
			/>
		)
	}
	
	if(ff.type === 'button') {
		return (
			<Button
				className={className}
				name={ff.name}
				variant="outlined"
				size="small"
				disabled={ff.disabled || anyError}
				onClick={fOnClick}
				style={{ textTransform: 'none' }} >
				{ff.label}
			</Button>
		)
	}
	
	if(ff.type === 'select') {
		return(
			<FormControl
				className={className}
				error={hasError} >
				<InputLabel htmlFor={ff.name}>{ff.label}</InputLabel>
				<Select
					value={fixedValue}
					onChange={fOnChange}
					endAdornment={unitsEl}
					disabled={ff.disabled}
					inputProps={{
						name: ff.name,
						id: ff.name,
					}}>
					{ff.options.map(o => (
						<MenuItem
							value={o.value}
							key={o.value} >
							{o.label}
						</MenuItem>
					))}
				</Select>
				{hasError && <FormHelperText>{error}</FormHelperText>}
			</FormControl>
		)
	}
	
	if(ff.type === 'select-multi') {
		return (
			<FormControl
				className={className}
				error={hasError} >
				<InputLabel htmlFor={ff.name}>{ff.label}</InputLabel>
				<Select
					multiple
					value={fixedValue}
					disabled={ff.disabled}
					onChange={fOnChange}
					renderValue={selected => ff.options.find(o => o.value === selected[0]).label + (selected.length > 1 ? ' + ' + (selected.length - 1) + ' more' : '')}
					inputProps={{
						name: ff.name,
						id: ff.name,
					}} >
					{ff.options.map(o => (
						<MenuItem key={o.value} value={o.value} >
							<Checkbox checked={fixedValue.indexOf(o.value) > -1} />
							<ListItemText primary={o.label} />
						</MenuItem>
					))}
				</Select>
				{hasError && <FormHelperText>{error}</FormHelperText>}
			</FormControl>
		)
	}
	
	if(ff.type === 'radio') {
		return(
			<FormControl
				component='fieldset'
				className={className}
				error={hasError} >
				<FormLabel component='legend'>{ff.label}</FormLabel>
				<RadioGroup
					name={ff.name}
					value={fixedValue}
					disabled={ff.disabled}
					onChange={fOnChange} >
					{ff.options.map(o => (
						<FormControlLabel
							key={o.value}
							value={o.value}
							label={o.label}
							disabled={ff.disabled}
							control={<Radio />} />
					))}
				</RadioGroup>
				{hasError && <FormHelperText>{error}</FormHelperText>}
			</FormControl>
		)
	}
	
	return (
		<TextField
			className={className}
			name={ff.name}
			label={ff.label}
			type={ff.type}
			disabled={ff.disabled}
			error={hasError}
			helperText={error}
			value={fixedValue}
			InputProps={{
				endAdornment: unitsEl,
			}}
			onChange={fOnChange}
			multiline={ff.multiline}
		/>
	)
}

PluginField.propTypes = {
	field: fieldType,
	onChange: PropTypes.func,
	onClick: PropTypes.func,
}

export default PluginField;