import React from 'react';
import { SubsystemCard } from '../features/subsystems/components/SubsystemCard';
import { subsystems } from '../lib/data';
import { motion } from 'framer-motion';
import { Cog, Zap, Code, Briefcase } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
    mechanical: <Cog className="w-5 h-5" />,
    electrical: <Zap className="w-5 h-5" />,
    software: <Code className="w-5 h-5" />,
    logistics: <Briefcase className="w-5 h-5" />,
};

export const SubsystemsIndex: React.FC = () => {
    return (
        <div className="py-16 px-6">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10"
                >
                    <p className="section-heading">Technical Documentation</p>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">System Architecture</h1>
                    <p className="text-text-secondary max-w-2xl">
                        Detailed specifications and design documentation for the four integrated subsystems of the parasite detection platform.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {subsystems.map((system, idx) => (
                        <motion.div
                            key={system.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <SubsystemCard
                                title={system.title}
                                description={system.description}
                                to={`/subsystems/${system.id}`}
                                icon={iconMap[system.id]}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
