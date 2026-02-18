import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: "https://order-loom-server.vercel.app"
})

const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        const reqInterceptor = axiosSecure.interceptors.request.use(
            async (config) => {
                if (user) {
                    const token = await user.getIdToken();
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            }
        );

        const resInterceptor = axiosSecure.interceptors.response.use(
            response => response,
            async (error) => {
                const statusCode = error.response?.status;

                if (statusCode === 401 || statusCode === 403) {
                    await logOut();
                    navigate('/login');
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        };
    }, [user, logOut, navigate]);
    return axiosSecure;
};

export default useAxiosSecure;