import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useLogout = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const logout = async () => {
        setIsLoading(true);
        setError(null);

        try {
            await axios.post('/api/user/logout');
            
            localStorage.removeItem('userIns');
            navigate('/login');

        } catch (err) {
            setError(err.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { logout, isLoading, error };
};
