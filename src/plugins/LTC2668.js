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
        group: 'Channel',
    }, {
        name: 'selectedBits',
        label: 'Selected Bits',
        type: 'text',
        defaultValue: '0',
        output: true,
        units: 'HEX',
        group: 'Select Bits',
    }, {
        name: 'volts',
        label: 'Volts',
        type: 'number',
        units: 'V',
        defaultValue: 2.4,
        visible: vals => vals.voltsOrCode === 'volts',
        group: 'Channel',
    }, {
        name: 'code',
        label: 'Code',
        type: 'number',
        defaultValue: 1024,
        visible: vals => vals.voltsOrCode === 'code',
        group: 'Channel',
    }, {
        name: 'voltsOrCode',
        label: '',
        type: 'radio',
        defaultValue: 'volts',
        group: 'Channel',
        options: [
            { value: 'volts', label: 'Volts' },
            { value: 'code', label: 'Code' },
        ]
    }, {
        name: 'write',
        label: 'Write',
        type: 'button',
        group: 'Channel',
        onClick: (vals, update) => {
            let channel = vals.channel === -1 ? 'all' : vals.channel;
            let type = vals.voltsOrCode;
            let amount = (type === 'volts') ? vals.volts : vals.code;
            send(
                'write',
                [type, channel, amount],
                response => {
                    console.log(response);
                }
            )
        }
    }, {
        name: 'span',
        label: 'Span',
        type: 'select',
        options: [
            { value: '5', label: '5', },
            { value: '10', label: '10', },
            { value: '+-5', label: '+-5', },
            { value: '+-10', label: '+-10', },
            { value: '+-2.5', label: '+-2.5', },
        ],
        defaultValue: '5',
        units: 'V',
        group: 'Channel',
    }, {
        name: 'writeSpan',
        label: 'Write Span',
        type: 'button',
        group: 'Channel',
        onClick: vals => {
            send(
                'span',
                [vals.channel, vals.span],
                response => {
                    
                }
            )
        }
    }, {
        name: 'setBits',
        label: 'Set Bits',
        type: 'text',
        group: 'Select Bits',
    }, {
        name: 'clearBits',
        label: 'Clear Bits',
        type: 'text',
        group: 'Select Bits',
    }, {
        name: 'selectBitsButton',
        label: 'Select',
        type: 'button',
        onClick: (vals, update) => {
            //let all = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
            let clear = vals.clearBits;
            let set = vals.setBits;
            let args = [];
            
            if(set) args.push('set', set);
            if(clear) args.push('clear', clear);
            if(args.length === 0) return;
            
            send(
                'select_bits',
                args,
                response => {
                    update({
                        selectedBits: response.split(' ')[4],
                    })
                }
            )
        },
        group: 'Select Bits',
    }, {
        name: 'setAll',
        label: 'Set All',
        type: 'button',
        group: 'Select Bits',
        onClick: (vals, update) => {
            let all = '0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15';
            send(
                'select_bits',
                ['set', all],
                response => {
                    update({
                        selectedBits: response.split(' ')[4],
                    })
                }
            )
        },
    }, {
        name: 'clearAll',
        label: 'Clear All',
        type: 'button',
        group: 'Select Bits',
        onClick: (vals, update) => {
            let all = '0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15';
            send(
                'select_bits',
                ['clear', all],
                response => {
                    update({
                        selectedBits: response.split(' ')[4],
                    })
                }
            )
        },
    }, {
        name: 'muxChannel',
        label: 'Channel',
        type: 'select',
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
        defaultValue: 0,
        group: 'MUX',
    }, {
        name: 'muxEnable',
        label: 'Enable Mux',
        type: 'checkbox',
        defaultValue: false,
        group: 'MUX',
    }, {
        name: 'muxApply',
        label: 'Apply Mux',
        type: 'button',
        group: 'MUX',
        onClick: (vals, update) => {
            let en = vals.muxEnable ? vals.muxChannel : 'disable';
            send(
                'mux',
                [en],
                response => {
                    
                }
            )
        }
    }],
    
    reducer: function(oldValues) {
        
        console.log('Check Test:', oldValues.checkTest)
        
        console.log('Multi Test', oldValues.multiTest)
        
        console.log('Channel: ', oldValues.channel)
        
        return {};
    }
})