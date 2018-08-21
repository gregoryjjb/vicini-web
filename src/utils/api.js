import axios from 'axios';

const api = {};
const root = '/';

const ax = axios.create({
    baseURL: root,
    timeout: 5000,
});

/*const fakeAxios = (data, fail) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(fail) reject(new Error("Error fetching"));
            else resolve(data);
        }, 1000);
    })
}*/

api.getHardware = () => ax.get(`hardware`);

api.openHardware = (id) => ax.put(`hardware/${id}/open`);

api.closeHardware = (id) => ax.put(`hardware/${id}/close`);

api.sendCommand = (id, body) => ax.put(`hardware/${id}/send_command`, body);

export default api;