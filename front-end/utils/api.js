import Axios from "axios";

let urls = {
    test: `http://localhost:1337`,
    development: 'http://localhost:1337',
    production: 'http://localhost:1337'
}
const api = Axios.create({
    baseURL: urls[process.env.NODE_ENV],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default api;