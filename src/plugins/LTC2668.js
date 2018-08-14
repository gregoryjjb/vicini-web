import api from 'utils/api';

export default send => ({
    id: 'LTC2668',
    name: 'LTC2668 Plugin',
    description: '16-Channel 12/16-Bit DAC',
    
    fields: [{
        name: 'channel',
        label: 'Channel',
        type: 'select',
        options: [
            {value: -1, label: 'All'},
            {value: 0, label: 'Channel 0'},
			{value: 1, label: 'Channel 1'},
			{value: 2, label: 'Channel 2'},
			{value: 3, label: 'Channel 3'},
			{value: 4, label: 'Channel 4'},
			{value: 5, label: 'Channel 5'},
			{value: 6, label: 'Channel 6'},
			{value: 7, label: 'Channel 7'},
			{value: 8, label: 'Channel 8'},
			{value: 9, label: 'Channel 9'},
			{value: 10, label: 'Channel 10'},
			{value: 11, label: 'Channel 11'},
			{value: 12, label: 'Channel 12'},
			{value: 13, label: 'Channel 13'},
			{value: 14, label: 'Channel 14'},
			{value: 15, label: 'Channel 15'},
        ],
        defaultValue: 0,
        group: 'DAC Selection',
    }, {
        name: 'selectDac',
        label: 'Select',
        type: 'button',
        onClick: (vals, update) => {
            let all = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
            let clear = all.filter(n => n != vals.channel).join(',');
            let set = vals.channel;
            
            let command = `select_bits set ${set} clear ${clear}`;
            
            send(
                'select_bits',
                ['set', set, 'clear', clear],
                response => {
                    console.log(response);
                }
            )
        },
        group: 'DAC Selection',
    }, {
        name: 'volts',
        label: 'Volts',
        type: 'number',
        units: 'V',
        defaultValue: 2.4,
        enabled: vals => vals.radioTest === 'volts',
        group: 'DAC Configuration',
    }, {
        name: 'counts',
        label: 'Code',
        type: 'number',
        defaultValue: 1024,
        enabled: vals => vals.radioTest === 'codes',
        group: 'DAC Configuration',
    }, {
        name: 'write',
        label: 'Write',
        type: 'button',
        group: 'DAC Configuration',
        onClick: (vals, update) => {
            let channel = vals.channel === -1 ? 'all' : vals.channel;
            send(
                'write',
                ['volts', channel, vals.volts],
                response => {
                    console.log(response);
                }
            )
        }
    }, {
        name: 'checkTest',
        label: 'Check Test',
        type: 'checkbox',
        defaultValue: true,
        group: 'Other',
        onClick: (vals, update) => {
            console.log('CHECKBOX IS NOW', vals.checkTest);
        }
    }, {
        name: 'multiTest',
        label: 'Multi Test',
        type: 'select-multi',
        options: [
            {value: 0, label: 'Channel 0'},
			{value: 1, label: 'Channel 1'},
			{value: 2, label: 'Channel 2'},
			{value: 3, label: 'Channel 3'},
			{value: 4, label: 'Channel 4'},
			{value: 5, label: 'Channel 5'},
			{value: 6, label: 'Channel 6'},
			{value: 7, label: 'Channel 7'},
			{value: 8, label: 'Channel 8'},
			{value: 9, label: 'Channel 9'},
			{value: 10, label: 'Channel 10'},
			{value: 11, label: 'Channel 11'},
			{value: 12, label: 'Channel 12'},
			{value: 13, label: 'Channel 13'},
			{value: 14, label: 'Channel 14'},
			{value: 15, label: 'Channel 15'},
        ],
        defaultValue: [],
        group: 'Other',
    }, {
        name: 'textTest',
        label: 'Channels',
        type: 'text',
        group: 'Other',
    }, {
        name: 'write2',
        label: 'Select All',
        type: 'button',
        group: 'Other',
        onClick: (vals, update) => {
            
            //let selectedThings = vals.textTest.split(',').map(s => parseInt(s));
            
            //let things = parseListThingy(vals.textTest)
            
            ///console.log('THE ARRAY IS', selectedThings);
            
            update({
                multiTest: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
            })
            
            //send(
            //    'write',
            //    ['volts', vals.channel, vals.volts],
            //    response => {
            //        console.log(response);
            //    }
            //)
        }
    }, {
        name: 'radioTest',
        label: 'Radio Test',
        type: 'radio',
        options: [
            {value: 'codes', label: 'Codes'},
            {value: 'volts', label: 'Volts'},
        ],
        defaultValue: 'codes',
        output: false,
        group: 'Other',
    }],
    
    reducer: function(oldValues) {
        
        console.log('Check Test:', oldValues.checkTest)
        
        console.log('Multi Test', oldValues.multiTest)
        
        console.log('Channel: ', oldValues.channel)
        
        return {};
    }
})