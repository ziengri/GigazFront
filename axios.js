import axios from "axios";

const instance = axios.create({
    baseURL:'http://195.93.252.108:3000'
})
instance.interceptors.request.use((config)=>{
    config.headers.Authorization=window.localStorage.getItem('token');
    return config
})
export default instance