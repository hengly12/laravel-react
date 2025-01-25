// import axios from 'axios';
// export default axios.create({
//     baseURL:"http://localhost:8000/api",
//     headers:{
//         "Content-type":"application/json"
//     }
// })

import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:8000/api',
});

// Request interceptor for adding token
http.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling unauthorized errors
http.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Token expired or invalid, logout user
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location = '/login';
        }
        return Promise.reject(error);
    }
);

export default http;