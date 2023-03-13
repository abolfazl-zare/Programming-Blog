import Axios from "axios";

let urls = {
    test: `http://localhost:1337/api/`,
    development: 'http://localhost:1337/api/',
    production: 'http://localhost:1337/api/'
}
const api = Axios.create({
    baseURL: urls[process.env.NODE_ENV],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default api;