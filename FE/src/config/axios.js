import axios from 'axios';
const token = localStorage.getItem('token');

const headers = {
    'Content-Type': 'application/json'
};

if (token) {
    headers['Authorization'] = `Bearer ${token}`;
}

const instance = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: headers
});

export const axiosGet = async (url) => {
    try {
        const response = await instance.get(url);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const axiosPost = async (url, data) => {
    try {
        const response = await instance.post(url, data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const axiosPut = async (url, data) => {
    try {
        const response = await instance.put(url, data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const axiosDelete = async (url) => {
    try {
        const response = await instance.delete(url);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export default instance