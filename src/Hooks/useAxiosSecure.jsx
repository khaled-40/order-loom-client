import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: "https://order-loom-server.vercel.app"
})

const useAxiosSecure = () => {
    const { user, signOutUser } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        const reqInterceptors = axiosSecure.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${user?.accessToken}`
            return config;
        })

        // response Interceptors 
        const resInterceptors = axiosSecure.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            console.log(error)

            const statusCode = error.status;
            if (statusCode === 401 || statusCode === 403) {
                // signOutUser()
                //     .then(() => {
                //         navigate('/auth/login')
                //     })
            }


            return Promise.reject(error)
        })

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptors);
            axiosSecure.interceptors.response.eject(resInterceptors);
        }
    }, [user, signOutUser, navigate])
    return axiosSecure;
};

export default useAxiosSecure;