import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
    session: Session | null;
    user: User | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    console.log("DIAGNOSTIC: AuthProvider - Initializing");

    useEffect(() => {
        let mounted = true;

        // Safety timeout to prevent infinite loading
        const timer = setTimeout(() => {
            if (mounted && loading) {
                console.warn("Auth initialization timed out, forcing load.");
                setLoading(false);
            }
        }, 5000);

        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (mounted) {
                console.log("DIAGNOSTIC: AuthProvider - Session received:", session ? "User found" : "No session");
                setSession(session);
                setUser(session?.user ?? null);
                setLoading(false);
                clearTimeout(timer);
            }
        }).catch(err => {
            console.error("Auth session error:", err);
            if (mounted) setLoading(false);
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (mounted) {
                setSession(session);
                setUser(session?.user ?? null);
                setLoading(false);
            }
        });

        return () => {
            mounted = false;
            clearTimeout(timer);
            subscription.unsubscribe();
        };
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    const value = {
        session,
        user,
        loading,
        signOut
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
