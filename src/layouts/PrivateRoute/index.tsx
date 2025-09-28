import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const PrivateRoute = () => {
    const { signed, loading } = useAuth();

    if (loading) {
        return <div>Carregando...</div>;
    }


    if (!signed) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};