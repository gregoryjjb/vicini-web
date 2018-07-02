export default {
	id: 'LTC1234',
	name: 'LTC1234 Plugin',
	description: 'Imaginary part made for testing',
	
	fields: [{
		name: 'volts',
		label: 'Volts',
		type: 'number',
		defaultValue: 420,
	}, {
		name: 'text',
		label: 'Volts but doubled',
		type: 'text',
		output: true,
	}],
	
	reducer: function(oldValues) {
		
		console.log("REDUCER CALLED:", oldValues);
		
		let { volts } = oldValues;
		
		return {
			...oldValues,
			text: `${volts * 2}`,
		};
	},
}