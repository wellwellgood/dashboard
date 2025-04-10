import axiosInstance from "../axiosInstance";

export const loginUser = async (credentials) => {
    try {
        const response = await axiosInstance.post('http://localhost:4000/users', credentials);
        const { token } = response.data;
        localStorage.setItem('token', token);
        return response.data;
    } catch (error){
        throw error.response ? error.response.data : error;
    }
};