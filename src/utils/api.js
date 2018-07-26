import { store } from 'utils/store';

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
    
    fakeAxios(hardwares)
    .then(result => {
        store.set('hardware.list')([...result]);
    })
    .catch(error => {
        store.set('hardware.error')(true);
    })
    .finally(() => {
        store.set('hardware.loading')(false);
    })
}

api.identifyHardware = (id) => {
    
    hardwares.find(h => h.id === id).details = {
        part: id === "COM1" ? "LTC1234" : "AD",
        eval: "EVAL",
    }
    
    api.getHardware();
}

export default api;