import React from 'react';
import { Outlet, Link } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';

export const Layout: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    return (
        <div className="min-h-screen bg-bg text-text font-sans flex flex-col">
            {/* Top bar with institution */}
            <div className="bg-primary text-white/90 text-xs py-2 px-6 text-center font-sans">
                Olin College of Engineering · SCOPE Capstone 2026
            </div>

            <header className="bg-surface border-b border-border">
                <div className="container mx-auto px-6 py-5 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="group">
                        <span className="font-serif text-2xl font-semibold text-primary">
                            FishEye
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {[
                            { to: '/', label: 'Overview' },
                            { to: '/subsystems', label: 'Technical Systems' },
                            { to: '/timeline', label: 'Timeline' },
                            { to: '/team', label: 'Team' },
                        ].map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="text-sm font-medium text-text-secondary hover:text-primary transition-colors [&.active]:text-primary [&.active]:border-b-2 [&.active]:border-primary pb-1"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden p-2 hover:bg-panel rounded transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <nav className="md:hidden border-t border-border bg-surface px-6 py-4 flex flex-col gap-2">
                        {[
                            { to: '/', label: 'Overview' },
                            { to: '/subsystems', label: 'Technical Systems' },
                            { to: '/timeline', label: 'Timeline' },
                            { to: '/team', label: 'Team' },
                        ].map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-4 py-3 text-sm font-medium text-text-secondary hover:text-primary transition-colors [&.active]:text-primary"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                )}
            </header>

            <main className="flex-1">
                <Outlet />
            </main>

            <footer className="bg-panel border-t border-border py-8 mt-16">
                <div className="container mx-auto px-6 text-center text-sm text-text-muted">
                    <p className="mb-2">
                        <span className="font-serif text-text">FishEye</span> · Autonomous Parasite Detection System
                    </p>
                    <p className="mb-4">
                        A SCOPE Capstone Project · Olin College of Engineering · 2026
                    </p>
                    <Link to="/login" className="text-xs text-text-muted/50 hover:text-primary transition-colors">
                        Team Login
                    </Link>
                </div>
            </footer>
        </div>
    );
};
