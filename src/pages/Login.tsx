import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from '@tanstack/react-router';
import { Lock, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            // Redirect to home or overview
            navigate({ to: '/' });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-bg">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="card p-8 bg-surface shadow-xl border border-border">
                    <div className="flex justify-center mb-6">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Lock className="w-6 h-6" />
                        </div>
                    </div>

                    <h1 className="text-2xl font-serif font-bold text-center mb-2">Team Access</h1>
                    <p className="text-text-secondary text-center text-sm mb-8">
                        Enter your team credentials to manage logs.
                    </p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 bg-bg border border-border rounded focus:border-primary focus:outline-none transition-colors"
                                placeholder="team@fisheye.com"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 bg-bg border border-border rounded focus:border-primary focus:outline-none transition-colors"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 bg-primary text-white font-medium rounded hover:bg-primary/90 transition-colors flex justify-center items-center gap-2"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign In'}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};
