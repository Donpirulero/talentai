import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import { LogIn, UserPlus, AlertCircle, Loader2, Sparkles } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Determine where to redirect after login
    const from = location.state?.from?.pathname || '/dashboard';

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;
                setMessage('Check your email for the confirmation link!');
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                navigate(from, { replace: true });
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[100px]" />

            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative z-10 animate-fade-in-up">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/20">
                        <Sparkles className="text-white" size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Talent<span className="text-cyan-400">AI</span></h1>
                    <p className="text-slate-400">
                        {isSignUp ? 'Create your platform account' : 'Welcome back, please login'}
                    </p>
                </div>

                {error && (
                    <div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-start gap-3 text-red-200 text-sm">
                        <AlertCircle size={18} className="shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                {message && (
                    <div className="mb-6 bg-green-500/10 border border-green-500/50 rounded-lg p-3 flex items-start gap-3 text-green-200 text-sm">
                        <Sparkles size={18} className="shrink-0 mt-0.5" />
                        <span>{message}</span>
                    </div>
                )}

                <form onSubmit={handleAuth} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 text-white px-4 py-3 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                            placeholder="name@company.com"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 text-white px-4 py-3 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 mt-4"
                    >
                        {loading ? <Loader2 size={20} className="animate-spin" /> : (isSignUp ? <UserPlus size={20} /> : <LogIn size={20} />)}
                        {isSignUp ? 'Create Account' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => { setIsSignUp(!isSignUp); setError(null); setMessage(null); }}
                        className="text-slate-400 hover:text-white text-sm transition-colors"
                    >
                        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
