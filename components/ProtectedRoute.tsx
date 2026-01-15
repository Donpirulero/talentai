import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
            </div>
        );
    }

    if (!user) {
        // Redirect to login page but save the location they were trying to go to
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};
