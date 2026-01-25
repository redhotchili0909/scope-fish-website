import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ListTodo, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export const Taskboard: React.FC = () => {
    return (
        <div className="py-16 px-6">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10"
                >
                    <p className="section-heading">Project Management</p>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Progress Tracking</h1>
                    <p className="text-text-secondary max-w-2xl">
                        Current sprint status and task breakdown. Full details available on our GitHub Projects board.
                    </p>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 mb-10">
                    {[
                        { label: 'Completed', value: '24', icon: CheckCircle, color: 'text-success' },
                        { label: 'In Progress', value: '8', icon: Clock, color: 'text-primary' },
                        { label: 'Blocked', value: '2', icon: AlertTriangle, color: 'text-warning' },
                    ].map((stat, idx) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="card p-6 text-center"
                        >
                            <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                            <p className="text-2xl font-serif font-bold">{stat.value}</p>
                            <p className="text-sm text-text-muted">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* GitHub Link */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="card p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
                >
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <ListTodo className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-serif font-semibold mb-1">GitHub Projects</h3>
                            <p className="text-sm text-text-secondary">View the full project board with detailed task assignments and sprint planning.</p>
                        </div>
                    </div>

                    <a
                        href="https://github.com/orgs/olincollege/projects"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white font-medium rounded hover:bg-primary/90 transition-colors shrink-0"
                    >
                        Open Board
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </motion.div>
            </div>
        </div>
    );
};
