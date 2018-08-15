import api from 'utils/api';

const channelOptions = [
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
];

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
            ...channelOptions,
        ],
        defaultValue: 0,
        group: 'Channel',
    }, {
        name: 'span',
        label: 'Span',
        type: 'select',
        options: [
            { value: '5', label: '0-5', },
            { value: '10', label: '0-10', },
            { value: '+-5', label: '+/- 5', },
            { value: '+-10', label: '+/- 10', },
            { value: '+-2.5', label: '+/- 2.5', },
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
                response => {}
            )
        }
    }, {
        name: 'powerDown',
        label: 'Power Down',
        type: 'button',
        group: 'Channel',
        onClick: vals => {
            send(
                'power_down',
                [vals.channel],
                response => {}
            )
        }
    }, {
        name: 'update',
        label: 'Update',
        type: 'button',
        group: 'Channel',
        onClick: vals => {
            let channel = vals.channel === -1 ? 'all' : vals.channel;
            send(
                'update',
                [channel],
                response => {}
            )
        }
    }, {
        name: 'volts',
        label: 'Volts',
        type: 'number',
        units: 'V',
        defaultValue: 2.4,
        visible: vals => vals.voltsOrCode === 'volts',
        error: vals => vals.volts === '' ? 'Must be a number' : '',
        group: 'Voltage',
    }, {
        name: 'code',
        label: 'Code',
        type: 'number',
        defaultValue: 1024,
        visible: vals => vals.voltsOrCode === 'code',
        group: 'Voltage',
    }, {
        name: 'voltsOrCode',
        label: '',
        type: 'radio',
        defaultValue: 'volts',
        group: 'Voltage',
        options: [
            { value: 'volts', label: 'Volts' },
            { value: 'code', label: 'Code' },
        ]
    }, {
        name: 'write',
        label: 'Write',
        type: 'button',
        group: 'Voltage',
        onClick: (vals, update) => {
            let channel = vals.channel === -1 ? 'all' : vals.channel;
            let type = vals.voltsOrCode;
            let amount = (type === 'volts') ? vals.volts : vals.code;
            send(
                'write',
                [type, channel, amount],
                response => {}
            )
        }
    }, {
        name: 'writeUpdate',
        label: 'Write & Update',
        type: 'button',
        group: 'Voltage',
        onClick: (vals, update) => {
            let channel = vals.channel === -1 ? 'all' : vals.channel;
            let type = vals.voltsOrCode;
            let amount = (type === 'volts') ? vals.volts : vals.code;
            send(
                'write_update',
                [type, channel, amount],
                response => {}
            )
        }
    }, {
        name: 'selectedBits',
        label: 'Selected Bits',
        type: 'text',
        //defaultValue: '0',
        output: true,
        multiline: true,
        //units: 'HEX',
        group: 'Select Bits',
    }, {
        name: 'setBits',
        label: 'Set Bits',
        type: 'select-multi',
        options: [...channelOptions],
        defaultValue: [],
        group: 'Select Bits',
        error: vals => {
            let err = vals.setBits.filter(s => vals.clearBits.includes(s)).length > 0;
            return err ? 'Cannot both set and clear bit' : '';
        }
    }, {
        name: 'clearBits',
        label: 'Clear Bits',
        type: 'select-multi',
        options: [...channelOptions],
        defaultValue: [],
        group: 'Select Bits',
    }, {
        name: 'selectBitsButton',
        label: 'Apply',
        type: 'button',
        onClick: (vals, update) => {
            //let all = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
            console.log(vals);
            let clear = vals.clearBits.join(',');
            let set = vals.setBits.join(',');
            let args = [];
            
            if(set) args.push('set', set);
            if(clear) args.push('clear', clear);
            if(args.length === 0) return;
            
            send(
                'select_bits',
                args,
                response => {
                    let hexStr = response.split(' ')[4];
                    //let num = parseInt(hexStr, 16);
                    update({
                        selectedBits: hexStr, // num.toString(2),
                    })
                }
            )
        },
        group: 'Select Bits',
    }, /*{
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
                    let hexStr = response.split(' ')[4];
                    let num = parseInt(hexStr, 16);
                    update({
                        selectedBits: num.toString(2),
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
    },*/ {
        name: 'reference',
        label: '',
        type: 'radio',
        options: ['Internal', 'External'],
        defaultValue: 'Internal',
        group: 'Reference Voltage',
    }, {
        name: 'refApply',
        label: 'Apply VRef',
        type: 'button',
        group: 'Reference Voltage',
        onClick: (vals, update) => {
            send(
                'reference',
                [(vals.reference === 'Internal') ? 'internal' : 'external'],
                response => {
                    
                }
            )
        }
    }, {
        name: 'muxChannel',
        label: 'Channel',
        type: 'select',
        options: [
            {value: -1, label: 'None'},
            ...channelOptions,
        ],
        defaultValue: 0,
        group: 'MUX',
    }, {
        name: 'muxApply',
        label: 'Apply Mux',
        type: 'button',
        group: 'MUX',
        onClick: (vals, update) => {
            let c = vals.muxChannel;
            let en = (c === -1) ? 'disable' : c;
            send(
                'mux',
                [en],
                response => {
                    
                }
            )
        }
    }, ],
    
    reducer: function(oldValues) {
        
        console.log('Check Test:', oldValues.checkTest)
        
        console.log('Multi Test', oldValues.multiTest)
        
        console.log('Channel: ', oldValues.channel)
        
        return {};
    }
})

const isCSList = str => {
    
    let strList = str.split(',');
    let allNumbers = strList
    .map(s => !isNaN(s))
    .reduce((acc, b) => acc && b, true);
    
    let numList = strList.map(s => parseInt(s));
    let allWithinRange = numList
    .reduce((acc, n) => acc && (n >= 0 && n <= 15), true);
    
    return (allNumbers && allWithinRange) ? '' : 'Must be comma-separated list of numbers';
}