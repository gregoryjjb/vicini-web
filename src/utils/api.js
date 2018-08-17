import axios from 'axios';

const api = {};
const root = '';

/*const fakeAxios = (data, fail) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(fail) reject(new Error("Error fetching"));
            else resolve(data);
        }, 1000);
    })
}*/

api.getHardware = () => axios.get(`${root}/hardware`);

api.openHardware = (id) => axios.put(`${root}/hardware/${id}/open`);

api.closeHardware = (id) => axios.put(`${root}/hardware/${id}/close`);

api.sendCommand = (id, body) => axios.put(`${root}/hardware/${id}/send_command`, body);

export default api;