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
} from '@material-ui/core';

const evaluate = (val, fallback, allVals) => {
	if(typeof val === 'function') {
		return val(allVals);
	}
	
	if(val === undefined || val === null) {
		return fallback;
	}
	
	return val;
}

const PluginField = ({ className, field, value, allValues, onChange, onClick, }) => {
	
	let visible = evaluate(field.visible, true, allValues);
	
	let isOutput = field.output || false;
	let label = field.label || field.name;
	
	let units = evaluate(field.units, undefined, allValues);
	let unitsEl = units ? <InputAdornment position='end'>{units}</InputAdornment> : null;
	
	let fixedValue = (value === undefined) ? '' : value;
	if(field.type === 'select-multi' && !Array.isArray(fixedValue)) fixedValue = [];
	
	let enabled = evaluate(field.enabled, true, allValues);
	let disabled = isOutput || !enabled;
	
	if(field.type === 'none' && field.visible !== true) return null;
	
	if(visible === false) return null;
	
	if(field.type === 'checkbox') {
		return(
			<FormControlLabel
				className={className}
				label={label}
				control={
					<Checkbox
						name={field.name}
						checked={fixedValue}
						onChange={!isOutput ? onChange : undefined}
						disabled={disabled}
					/>
				}
			/>
		)
	}
	
	if(field.type === 'button') {
		return (
			<Button
				className={className}
				name={field.name}
				variant="outlined"
				size="small"
				disabled={disabled}
				onClick={() => onClick(field.name)} >
				{label}
			</Button>
		)
	}
	
	if(field.type === 'select') {
		return(
			<FormControl className={className}>
				<InputLabel htmlFor={field.name}>{label}</InputLabel>
				<Select
					value={fixedValue}
					onChange={!isOutput ? onChange : undefined}
					endAdornment={unitsEl}
					disabled={disabled}
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
	
	if(field.type === 'select-multi') {
		return (
			<FormControl className={className} >
				<InputLabel htmlFor={field.name}>{label}</InputLabel>
				<Select
					multiple
					value={fixedValue}
					disabled={disabled}
					onChange={!isOutput ? onChange : undefined}
					renderValue={selected => field.options.find(o => o.value === selected[0]).label + ' + ' + (selected.length - 1) + ' more' /*selected.join(',')/* field.options.filter(o => selected.includes(o.value)).map(o => o.label).join(', ')*/}
					inputProps={{
						name: field.name,
						id: field.name,
					}} >
					{field.options.map(o => (
						<MenuItem key={o.value} value={o.value} >
							<Checkbox checked={fixedValue.indexOf(o.value) > -1} />
							<ListItemText primary={o.label} />
						</MenuItem>
					))}
				</Select>
			</FormControl>
		)
	}
	
	if(field.type === 'radio') {
		return(
			<FormControl component='fieldset' className={className} >
				<FormLabel component='legend'>{label}</FormLabel>
				<RadioGroup
					name={field.name}
					value={fixedValue}
					disabled={disabled}
					onChange={!isOutput ? onChange : undefined} >
					{field.options.map(o => (
						<FormControlLabel
							value={o.value}
							label={o.label}
							disabled={disabled}
							control={<Radio />} />
					))}
				</RadioGroup>
			</FormControl>
		)
	}
	
	return (
		<TextField
			className={className}
			name={field.name}
			label={label}
			type={field.type}
			disabled={disabled}
			value={fixedValue}
			InputProps={{
				endAdornment: unitsEl,
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