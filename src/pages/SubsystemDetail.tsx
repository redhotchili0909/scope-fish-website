import React, { useEffect, useState } from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { subsystems, LogEntry } from '../lib/data';
import { supabase, DatabaseLogEntry } from '../lib/supabase';
import { motion } from 'framer-motion';
import { ArrowLeft, Cog, Zap, Code, Calendar } from 'lucide-react';
import { AddLogForm } from '../features/logs/components/AddLogForm';

const iconMap: Record<string, React.ReactNode> = {
    mechanical: <Cog className="w-5 h-5" />,
    electrical: <Zap className="w-5 h-5" />,
    software: <Code className="w-5 h-5" />,
};

export const SubsystemDetail: React.FC = () => {
    const { id } = useParams({ from: '/subsystems/$id' });
    const system = subsystems.find(s => s.id === id);
    const [dynamicLogs, setDynamicLogs] = useState<LogEntry[]>([]);

    useEffect(() => {
        if (!id) return;

        const fetchLogs = async () => {
            const { data, error } = await supabase
                .from('project_logs')
                .select('*')
                .eq('subsystem_id', id)
                .order('date', { ascending: false });

            if (error) {
                // console.error('Error fetching logs:', error);
            } else if (data) {
                const formattedLogs: LogEntry[] = data.map((log: DatabaseLogEntry) => ({
                    date: new Date(log.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                    title: log.title,
                    content: log.content,
                    author: log.author,
                    images: log.images
                }));
                setDynamicLogs(formattedLogs);
            }
        };

        fetchLogs();
    }, [id]);

    // Check for auth session
    const [session, setSession] = useState<boolean>(false);
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(!!session);
        });
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(!!session);
        });
        return () => subscription.unsubscribe();
    }, []);

    const handleDelete = async (logId: number) => {
        if (!confirm('Are you sure you want to delete this log?')) return;

        const { error } = await supabase
            .from('project_logs')
            .delete()
            .eq('id', logId);

        if (error) {
            console.error('Error deleting log:', error);
            alert('Failed to delete log');
        } else {
            // Refresh logs
            window.location.reload();
        }
    };

    if (!system) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-serif mb-4">System Not Found</h1>
                    <Link to="/subsystems" className="text-primary hover:underline">
                        Return to Systems
                    </Link>
                </div>
            </div>
        );
    }

    // Combine logs... 
    // Note: We need to preserve the ID for dynamic logs
    const allLogs = [
        ...dynamicLogs.map(l => ({ ...l, isDynamic: true })),
        ...(system.logs || []).map(l => ({ ...l, isDynamic: false }))
    ].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <div className="py-16 px-6">
            <div className="container mx-auto max-w-3xl">
                {/* Back link */}
                <Link
                    to="/subsystems"
                    className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors text-sm mb-8"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Systems
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div
                            className="w-10 h-10 rounded flex items-center justify-center"
                            style={{ backgroundColor: `${system.color}15`, color: system.color }}
                        >
                            {iconMap[system.id]}
                        </div>
                        <p className="section-heading mb-0">Development Log</p>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">{system.title}</h1>
                    <p className="text-text-secondary">{system.description}</p>
                </motion.div>

                {/* System Overview */}
                <section className="mb-10">
                    <h2 className="text-xl font-serif font-semibold mb-4" style={{ color: system.color }}>
                        System Overview
                    </h2>
                    <div className="card p-6">
                        <p className="text-text-secondary leading-relaxed">{system.overview}</p>
                    </div>
                </section>

                <div className="divider" />

                {/* Development Log Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-serif font-semibold" style={{ color: system.color }}>
                        Development Log
                    </h2>
                    <AddLogForm
                        subsystemId={system.id}
                        onLogAdded={() => window.location.reload()}
                    />
                </div>

                {/* Journal Entries */}
                <div className="space-y-8">
                    {allLogs.map((entry: any, index) => (
                        <motion.article
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="relative group"
                        >
                            {/* Date header */}
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-text-muted" />
                                    <time className="text-sm font-mono text-text-muted">{entry.date}</time>
                                </div>

                                {session && entry.isDynamic && (
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleDelete(entry.id)}
                                            className="text-xs text-red-500 hover:text-red-600 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Entry card */}
                            <div className="card p-6 border-l-4" style={{ borderLeftColor: system.color }}>
                                <h3 className="font-semibold text-lg mb-3">{entry.title}</h3>
                                <p className="text-text-secondary leading-relaxed">{entry.content}</p>

                                {/* Images */}
                                {entry.images && entry.images.length > 0 && (
                                    <div className="mt-4 grid gap-4">
                                        {entry.images.map((img: { src: string; caption?: string }, imgIndex: number) => (
                                            <figure key={imgIndex} className="bg-panel border border-border rounded overflow-hidden">
                                                <img
                                                    src={img.src}
                                                    alt={img.caption || entry.title}
                                                    className="w-full h-auto"
                                                    onError={(e) => {
                                                        // Placeholder for missing images
                                                        (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect fill="%23f0f0f0" width="400" height="200"/><text fill="%23888" font-family="sans-serif" font-size="14" x="50%" y="50%" text-anchor="middle" dy=".3em">Image: ' + encodeURIComponent(img.src.split('/').pop() || 'placeholder') + '</text></svg>';
                                                    }}
                                                />
                                                {img.caption && (
                                                    <figcaption className="px-4 py-2 text-sm text-text-muted italic">
                                                        {img.caption}
                                                    </figcaption>
                                                )}
                                            </figure>
                                        ))}
                                    </div>
                                )}

                                {entry.author && (
                                    <p className="mt-4 text-sm text-text-muted">— {entry.author}</p>
                                )}
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* Add Entry Placeholder */}
                <div className="mt-12 pt-8 border-t border-border text-center">
                    <p className="text-text-muted text-sm">
                        Development log entries are added as the project progresses.
                    </p>
                </div>
            </div>
        </div>
    );
};
