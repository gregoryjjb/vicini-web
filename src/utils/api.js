import axios from 'axios';

import { store } from 'utils/store';
import { addSerialChannel, addSerialLine } from './actions';

const api = {};
const root = '';

const fakeAxios = (data, fail) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(fail) reject(new Error("Error fetching"));
            else resolve(data);
        }, 1000);
    })
}

api.getHardware = () => axios.get(`${root}/hardware`);

api.openHardware = (id) => axios.put(`${root}/hardware/${id}/open`);

api.closeHardware = (id) => axios.put(`${root}/hardware/${id}/close`);

api.sendCommand = async (id, command, args) => {
    
    let body = {
        command: {
            name: command,
            args: args,
        },
        timeout: null,
    }
    
    console.log("Sending command:", body, "to", id)
    
    try{
        
        let result = await axios.put(`/hardware/${id}/send_command`, body)
        console.log("Received response:", result);
        
        let { send, receive } = result.data.serial;
        
        addSerialLine({
            channel: id,
            text: send,
            sent: true,
        });
        
        addSerialLine({
            channel: id,
            text: receive,
            sent: false,
        });
        
        return receive;
    }
    catch(error) {
        console.error(error);
    }
}

api.sendSerial = async (id, text) => {
    
    let body = {
        command: {
            name: text,
            args: [],
        },
        timeout: null,
    }
    
    addSerialLine({
        channel: id,
        text,
        sent: true,
    })
    
    try {
        let result = await axios.put(`/hardware/${id}/send_command`, body)
        
        let { receive } = result.data.serial;
        
        addSerialLine({
            channel: id,
            text: receive,
            sent: false,
        })
    }
    catch(error) {
        console.error(error);
    }
}

export default api;