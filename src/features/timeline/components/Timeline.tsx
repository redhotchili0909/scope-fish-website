import React from 'react';
import { motion } from 'framer-motion';
import { Check, Circle } from 'lucide-react';

export interface Milestone {
    id: number;
    title: string;
    date: string;
    description: string;
    status: 'complete' | 'active' | 'upcoming';
}

const milestones: Milestone[] = [
    {
        id: 1,
        title: 'Project Initiation',
        date: 'January 2026',
        description: 'Team formation, stakeholder meetings, and requirements definition.',
        status: 'complete'
    },
    {
        id: 2,
        title: 'Optical System Design',
        date: 'February 2026',
        description: 'Development of illumination system and wavelength filter selection.',
        status: 'complete'
    },
    {
        id: 3,
        title: 'Vision Algorithm Development',
        date: 'March 2026',
        description: 'Computer vision pipeline for real-time detection and localization.',
        status: 'active'
    },
    {
        id: 4,
        title: 'Mechanical Integration',
        date: 'April 2026',
        description: 'Gantry assembly and motion control calibration.',
        status: 'upcoming'
    },
    {
        id: 5,
        title: 'System Validation',
        date: 'May 2026',
        description: 'End-to-end testing and performance evaluation.',
        status: 'upcoming'
    },
];

export const Timeline: React.FC = () => {
    return (
        <section className="py-16 px-6">
            <div className="container mx-auto max-w-3xl">
                <h2 className="text-2xl font-serif font-semibold mb-2 text-primary">Project Timeline</h2>
                <p className="text-text-secondary mb-8">Development milestones and current progress.</p>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

                    {/* Milestones */}
                    <div className="space-y-8">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={milestone.id}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className="relative pl-10"
                            >
                                {/* Status dot */}
                                <div className="absolute left-0 top-1">
                                    {milestone.status === 'complete' ? (
                                        <div className="w-4 h-4 rounded-full bg-success text-white flex items-center justify-center">
                                            <Check className="w-2.5 h-2.5" />
                                        </div>
                                    ) : milestone.status === 'active' ? (
                                        <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center relative">
                                            <Circle className="w-2 h-2 fill-white text-white" />
                                            <div className="absolute inset-0 rounded-full bg-primary/50 animate-ping" />
                                        </div>
                                    ) : (
                                        <div className="w-4 h-4 rounded-full border-2 border-border bg-bg" />
                                    )}
                                </div>

                                {/* Content */}
                                <div className={`pb-6 ${index < milestones.length - 1 ? 'border-b border-border' : ''}`}>
                                    <div className="flex items-baseline justify-between gap-4 mb-1">
                                        <h3 className={`font-semibold ${milestone.status === 'upcoming' ? 'text-text-muted' : 'text-text'}`}>
                                            {milestone.title}
                                        </h3>
                                        <span className="text-xs text-text-muted font-mono shrink-0">{milestone.date}</span>
                                    </div>
                                    <p className={`text-sm leading-relaxed ${milestone.status === 'upcoming' ? 'text-text-muted' : 'text-text-secondary'}`}>
                                        {milestone.description}
                                    </p>
                                    {milestone.status === 'active' && (
                                        <span className="inline-block mt-2 text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                                            In Progress
                                        </span>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Timeline;
