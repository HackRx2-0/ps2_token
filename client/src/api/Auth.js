import axios from "axios";
axios.defaults.withCredentials = true;


const baseUrl = "http://localhost:5000"

export const login = (info) => axios.post(`${baseUrl}/api/login`, info );
export const signup = (info) => axios.post(`${baseUrl}/api/users`, info );
export const verifyUser = () => axios.get(`${baseUrl}/api/login/verify` );
export const sendDataApi = (msg) => axios.post(`${baseUrl}`,{message : msg});






