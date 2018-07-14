import { store } from 'utils/store';

const api = {};

const fakeAxios = (data, fail) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(fail) reject(new Error("Error fetching"));
            else resolve(data);
        }, 2000);
    })
}

api.getHardware = () => {
    store.set('hardware.loading')(true);
    store.set('hardware.error')(false);
    
    fakeAxios([{ name: "LTC1234" }, { name: "AD" }])
    .then(result => {
        store.set('hardware.list')(result);
    })
    .catch(error => {
        store.set('hardware.error')(true);
    })
    .finally(() => {
        store.set('hardware.loading')(false);
    })
    
}

export default api;