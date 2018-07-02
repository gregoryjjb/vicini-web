export default {
	id: 'LTC1234',
	name: 'LTC1234 Plugin',
	description: 'Imaginary part made for testing',
	
	fields: [{
		name: 'volts',
		label: 'Voltage (mv)',
		type: 'number',
		units: 'mV',
		unitScale: 0.001,
		defaultValue: 420,
		output: false,
	}, {
		name: 'text',
		label: 'Volts but doubled',
		type: 'text',
		output: true,
	}, {
		name: 'linOutput',
		label: 'Linduino Output',
		output: true,
	}, {
		name: 'blabla',
		type: 'button',
		onClick: (values) => {
			return sendLinduinoString(
				`Please set the volts to ${values.volts}`,
				linduinoValues => {
					return {
						linOutput: linduinoValues.volts,
					}
				}
			);
			
			return {
				volts: 420,
			};
		},
	}],
	
	
	reducer: function(oldValues) {
		
		//console.log("REDUCER CALLED:", oldValues);
		
		let { volts } = oldValues;
		
		return {
			text: volts * 2 + ' mV',
		};
	},
}