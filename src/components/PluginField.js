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

const PluginField = ({ className, field, value, onChange, onClick, }) => {
	
	let isOutput = field.output || false;
	let label = field.label || field.name;
	let units = (field.units ? <InputAdornment position='end'>{field.units}</InputAdornment> : null);
	
	let fixedValue = (value === undefined) ? '' : value;
	if(field.type === 'select-multi' && !Array.isArray(fixedValue)) fixedValue = [];
	
	if(field.type === 'none' && field.visible !== true) return null;
	
	if(field.visible === false) return null;
	
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
						disabled={isOutput}
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
	
	if(field.type === 'select-multi') {
		return (
			<FormControl className={className} >
				<InputLabel htmlFor={field.name}>{label}</InputLabel>
				<Select
					multiple
					value={fixedValue}
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
					onChange={!isOutput ? onChange : undefined} >
					{field.options.map(o => (
						<FormControlLabel
							value={o.value}
							label={o.label}
							disabled={isOutput}
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