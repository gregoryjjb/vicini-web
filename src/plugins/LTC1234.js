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
		group: "My First Groups",
	}, {
		name: 'selectTest',
		label: 'Select Test',
		type: 'select',
		options: [
			{value: 0, label: 'Zero'},
			{value: 1, label: 'Single'},
			{value: 2, label: 'Double'},
			{value: 3, label: 'Triple'},
		],
		defaultValue: 1,
		group: 'Inputs',
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
	}, {
		name: 'g1',
		type: 'text',
		group: 'Group 1',
	}, {
		name: 'g2',
		type: 'text',
		group: 'Group 2',
	}, {
		name: 'g3',
		type: 'text',
		group: 'Group 3',
	}],
	
	
	reducer: function(oldValues) {
		
		//console.log("REDUCER CALLED:", oldValues);
		
		let { volts, selectTest } = oldValues;
		
		return {
			text: volts * selectTest + ' mV',
		};
	},
}