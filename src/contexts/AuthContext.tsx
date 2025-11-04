import { createContext, useState, useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import type { User } from '../types/user';

interface AuthContextData {
    signed: boolean;
    user: User | null;
    loading: boolean;
    login: (params: URLSearchParams) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadStoragedData() {
            const token = localStorage.getItem('@AcheFlow:token');
            const storedUser = localStorage.getItem('@AcheFlow:user');

            if (token && storedUser) {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setUser(JSON.parse(storedUser));
            }
            setLoading(false);
        }
        loadStoragedData();
    }, []);

    async function login(params: URLSearchParams) {
        const response = await api.post('/token', params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        const { access_token } = response.data;

        api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

        const userResponse = await api.get('/funcionarios/me', {
            headers: { Authorization: `Bearer ${access_token}` }
        });

        const loggedUser: User = userResponse.data;

        setUser(loggedUser);

        localStorage.setItem('@AcheFlow:token', access_token);
        localStorage.setItem('@AcheFlow:user', JSON.stringify(loggedUser));

        navigate('/flow/home');
    }

    function logout() {
        setUser(null);
        localStorage.removeItem('@AcheFlow:token');
        localStorage.removeItem('@AcheFlow:user');
        api.defaults.headers.common['Authorization'] = undefined;
        navigate('/');
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}