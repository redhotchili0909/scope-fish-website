import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from '@tanstack/react-router';
import { Lock, Loader2, Cog, Zap, Code, LogOut, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

export const Login: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [session, setSession] = useState<any>(null);

    useEffect(() => {
        // Check current session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

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
        }
        // Session state will update automatically via onAuthStateChange
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    // If logged in, show quick links to subsystems
    if (session) {
        const subsystems = [
            { id: 'mechanical', title: 'Mechanical', icon: Cog, color: '#1e3a5f' },
            { id: 'electrical', title: 'Electrical', icon: Zap, color: '#8b2332' },
            { id: 'software', title: 'Software', icon: Code, color: '#166534' },
            { id: 'logistics', title: 'Logistics', icon: Briefcase, color: '#7c3aed' }
        ];

        return (
            <div className="min-h-screen flex items-center justify-center px-4 bg-bg">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-2xl"
                >
                    <div className="card p-8 bg-surface shadow-xl border border-border">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-serif font-bold">Quick Access</h1>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-primary transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div>

                        <p className="text-text-secondary mb-8">
                            Jump directly to subsystem development logs
                        </p>

                        <div className="grid gap-4">
                            {subsystems.map((subsystem) => {
                                const Icon = subsystem.icon;
                                return (
                                    <Link
                                        key={subsystem.id}
                                        to="/subsystems/$id"
                                        params={{ id: subsystem.id }}
                                        className="group"
                                    >
                                        <div className="flex items-center gap-4 p-4 border border-border rounded-lg hover:border-primary transition-all hover:shadow-md">
                                            <div
                                                className="w-12 h-12 rounded flex items-center justify-center"
                                                style={{ backgroundColor: `${subsystem.color}15`, color: subsystem.color }}
                                            >
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                                    {subsystem.title}
                                                </h3>
                                                <p className="text-sm text-text-muted">
                                                    View development log
                                                </p>
                                            </div>
                                            <div className="text-text-muted group-hover:text-primary transition-colors">
                                                →
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    // If not logged in, show login form
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
