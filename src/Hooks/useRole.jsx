import React from 'react';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const email = user?.email ? encodeURIComponent(user.email) : null;
    const { isLoading: roleLoading, data: role = 'user' } = useQuery({
        queryKey: ['user-role', email],
        enabled: !!email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/role`);

            return res.data;
        }
    })
    return { roleLoading, role };
};

export default useRole;