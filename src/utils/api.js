import axios from 'axios';

import { store } from 'utils/store';
import { addSerialChannel, addSerialLine } from './actions';

const api = {};

const fakeAxios = (data, fail) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(fail) reject(new Error("Error fetching"));
            else resolve(data);
        }, 1000);
    })
}

let hardwares = [
    {
        id: "COM1",
        available: true,
        open: false,
    },
    {
        id: "COM2",
        available: true,
        open: false,
    },
    {
        id: "COM3",
        available: false,
        open: false,
    }
]

api.getHardware = () => {
    store.set('hardware.loading')(true);
    store.set('hardware.error')(false);
    
    //fakeAxios(hardwares)
    axios.get('/hardware')
    .then(result => {
        console.log("GOTTHEHARDWARE");
        console.log(result.data.hardware)
        store.setCopy('hardware.list')(result.data.hardware);
    })
    .catch(error => {
        store.set('hardware.error')(true);
    })
    .finally(() => {
        store.set('hardware.loading')(false);
    })
}

api.identifyHardware = (id) => {
    store.set('hardware.loading')(true);
    
    axios.put(`/hardware/${id}/open`)
    .then(result => {
        console.log("OPENED THE DATA")
        console.log(result)
        store.setCopy('hardware.list')(result.data.hardware);
        addSerialChannel({ id });
    })
    .catch(error => {
        
    })
    .finally(() => {
        store.set('hardware.loading')(false);
    })
}

api.closeHardware = id => {
    store.set('hardware.loading')(true);
    
    axios.put(`/hardware/${id}/close`)
    .then(result => {
        store.setCopy('hardware.list')(result.data.hardware);
    })
    .catch(error => {
        
    })
    .finally(() => {
        store.set('hardware.loading')(false);
    })
}

api.sendCommand = async (id, command, args) => {
    
    let body = {
        command: {
            name: command,
            args: args,
        },
        timeout: null,
    }
    
    let output = '';
    
    console.log("SENDING BODY", body)
    
    let result = await axios.put(`/hardware/${id}/send_command`, body)
    //.then(result => {
        
    console.log(result);
    output = result.data.serial.receive;
    return output;
}

export default api;