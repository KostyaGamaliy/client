import axios from "axios";

let access_token = localStorage.getItem('token')

const instance = axios.create({
	baseURL: 'http://localhost:85/api',
	headers: {'Content-Type': 'application/json'}
});

instance.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${access_token}`;
	return config;
});

export default instance;