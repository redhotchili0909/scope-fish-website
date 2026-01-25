import React from 'react';
import Timeline from '../features/timeline/components/Timeline';
import { SubsystemCard } from '../features/subsystems/components/SubsystemCard';
import { motion } from 'framer-motion';
import { Cog, Zap, Code } from 'lucide-react';

export const Home: React.FC = () => {
    return (
        <div>
            {/* Hero Section - Paper title style */}
            <section className="py-16 md:py-24 px-6 border-b border-border">
                <div className="container mx-auto max-w-3xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="section-heading">Capstone Project</p>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-text mb-6 leading-tight">
                            Automated Detection and Removal of Parasites in Fish Fillets
                        </h1>

                        <p className="text-lg text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto">
                            A precision robotics system combining computer vision with specialized optical filtering for real-time nematode identification and extraction.
                        </p>

                        <div className="flex flex-wrap justify-center gap-3 text-sm text-text-muted">
                            <span className="px-3 py-1 bg-panel border border-border rounded">Computer Vision</span>
                            <span className="px-3 py-1 bg-panel border border-border rounded">Precision Robotics</span>
                            <span className="px-3 py-1 bg-panel border border-border rounded">Food Safety</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Abstract-style overview */}
            <section className="py-16 px-6">
                <div className="container mx-auto max-w-3xl">
                    <h2 className="text-2xl font-serif font-semibold mb-6 text-primary">Abstract</h2>
                    <div className="prose prose-lg">
                        <p className="text-text-secondary leading-relaxed">
                            This project addresses the challenge of detecting and removing parasites—specifically nematodes—from fish fillets in food processing environments. Our system employs a three-stage approach: <strong className="text-text">illumination</strong> using specialized backlighting with wavelength-specific filters, <strong className="text-text">detection</strong> through computer vision algorithms, and <strong className="text-text">extraction</strong> via a precision gantry mechanism.
                        </p>
                    </div>

                    <div className="divider" />

                    <h2 className="text-2xl font-serif font-semibold mb-6 text-primary">Approach</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { num: '1', title: 'Illuminate', desc: 'Backlight illumination with optical filtering to enhance parasite visibility.' },
                            { num: '2', title: 'Detect', desc: 'Real-time computer vision for nematode identification and localization.' },
                            { num: '3', title: 'Extract', desc: 'Precision gantry system for automated removal with minimal tissue damage.' },
                        ].map((step) => (
                            <div key={step.num} className="text-center">
                                <div className="w-10 h-10 rounded-full bg-primary text-white font-serif font-bold flex items-center justify-center mx-auto mb-3">
                                    {step.num}
                                </div>
                                <h3 className="font-semibold mb-2">{step.title}</h3>
                                <p className="text-sm text-text-secondary">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technical Systems */}
            <section className="py-16 px-6 bg-panel border-y border-border">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-2xl font-serif font-semibold mb-2 text-primary">Technical Systems</h2>
                    <p className="text-text-secondary mb-8">Detailed documentation for each integrated subsystem.</p>

                    <div className="grid md:grid-cols-3 gap-6">
                        <SubsystemCard
                            title="Mechanical"
                            description="Gantry design, end effector, and motion control systems."
                            to="/subsystems/mechanical"
                            icon={<Cog className="w-5 h-5" />}
                        />
                        <SubsystemCard
                            title="Electrical"
                            description="Optical system, power distribution, and sensor integration."
                            to="/subsystems/electrical"
                            icon={<Zap className="w-5 h-5" />}
                        />
                        <SubsystemCard
                            title="Software"
                            description="Vision pipeline, path planning, and control interface."
                            to="/subsystems/software"
                            icon={<Code className="w-5 h-5" />}
                        />
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <Timeline />
        </div>
    );
};
