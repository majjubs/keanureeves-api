import axios from "axios";

const api = axios.create({
    baseURL:'https://whoa.onrender.com/whoas/random'
});

export default api;