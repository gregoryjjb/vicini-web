import { send } from 'utils/linduino';

export default {
	id: 'LTC1234',
	name: 'LTC1234 Plugin',
	description: 'Imaginary part made for testing',
	
	fields: [{
		name: 'volts',
		label: 'Voltage (mv)',
		type: 'number',
		defaultValue: 420,
		output: false,
		group: "Inputs",
	}, {
		name: 'text',
		label: 'Volts but doubled',
		type: 'text',
		output: true,
		group: "Outputs",
	}, {
		name: 'linOutput',
		label: 'Linduino Output',
		type: 'text',
		output: true,
		group: "Outputs",
	}, {
		name: 'resetButton',
		label: 'Reset Values',
		type: 'button',
		onClick: (values) => {
			/*return send(
				values.volts,
				linduinoValues => {
					return {
						linOutput: linduinoValues.volts,
					}
				}
			);*/
			
			return {
				volts: 420,
			};
		},
	}, {
		name: 'linduinoButton',
		label: 'Talk to Linduino',
		type: 'button',
		onClick: (values) => {
			return send(
				'',
				(linduinoValues) => {
					console.log(linduinoValues);
					return { linOutput: linduinoValues.myVal }
				}, 
			)
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