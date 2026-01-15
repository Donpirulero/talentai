
import React, { useEffect } from 'react';
import { supabase } from '../utils/supabase';

// Simple component to test Supabase connection
export const SupabaseStatus = () => {
    useEffect(() => {
        const checkConnection = async () => {
            console.log('Checking Supabase connection...');
            try {
                const { data, error } = await supabase.from('test_connection').select('*').limit(1);
                // Even if the table doesn't exist, we should get a response or a specific error, not a network error.
                // A 'PGRST204' (missing table) or empty data means we reached the server.
                // A 401 or network error means configuration is wrong.

                if (error && error.code !== 'PGRST204') {
                    console.error('Supabase connection error:', error);
                } else {
                    console.log('Supabase connection successful. Client initialized:', supabase);
                }
            } catch (err) {
                console.error('Supabase connection unexpected error:', err);
            }
        };
        checkConnection();
    }, []);

    return null; // Invisible component
};
