import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

interface TeamMember {
    name: string;
    role: string;
    bio: string;
    image?: string;
    links?: {
        github?: string;
        linkedin?: string;
        email?: string;
    };
}

const teamMembers: TeamMember[] = [
    {
        name: 'Chang Jun Park',
        role: 'Team Member',
        bio: 'Contributing to system development and testing.',
        image: '/images/team/changjun.jpg',
    },
    {
        name: 'Alton Coolidge',
        role: 'Team Member',
        bio: 'Contributing to system development and testing.',
        image: '/images/team/alton.jpg',
    },
    {
        name: 'Benjamin Kim',
        role: 'Team Member',
        bio: 'Contributing to system development and testing.',
        image: '/images/team/benjamin.jpg',
    },
    {
        name: 'Dominic Salmieri',
        role: 'Team Member',
        bio: 'Contributing to system development and testing.',
        image: '/images/team/dominic.jpg',
    },
    {
        name: 'Mira Chew',
        role: 'Team Member',
        bio: 'Contributing to system development and testing.',
        image: '/images/team/mira.jpg',
    },
    {
        name: 'Noah Woosley',
        role: 'Team Member',
        bio: 'Contributing to system development and testing.',
        image: '/images/team/noah.jpg',
    },
];

export const Team: React.FC = () => {
    return (
        <div className="py-16 px-6">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <p className="section-heading">Our Team</p>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Meet the Team</h1>
                    <p className="text-text-secondary max-w-xl mx-auto">
                        The engineers behind FishEye, working together to bring automated parasite detection to life.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="card p-6 text-center card-hover"
                        >
                            {/* Avatar */}
                            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-panel border-2 border-border">
                                {member.image ? (
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            // Fallback to initials
                                            const initials = member.name.split(' ').map(n => n[0]).join('');
                                            (e.target as HTMLImageElement).style.display = 'none';
                                            (e.target as HTMLImageElement).parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-serif font-bold text-2xl">${initials}</div>`;
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-serif font-bold text-2xl">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                            <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                            <p className="text-text-secondary text-sm leading-relaxed mb-4">{member.bio}</p>

                            {/* Links */}
                            {member.links && (
                                <div className="flex justify-center gap-3">
                                    {member.links.github && (
                                        <a href={member.links.github} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-colors">
                                            <Github className="w-5 h-5" />
                                        </a>
                                    )}
                                    {member.links.linkedin && (
                                        <a href={member.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-colors">
                                            <Linkedin className="w-5 h-5" />
                                        </a>
                                    )}
                                    {member.links.email && (
                                        <a href={`mailto:${member.links.email}`} className="text-text-muted hover:text-primary transition-colors">
                                            <Mail className="w-5 h-5" />
                                        </a>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Acknowledgments */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 text-center"
                >
                    <h2 className="text-xl font-serif font-semibold mb-4 text-primary">Acknowledgments</h2>
                    <p className="text-text-secondary text-sm max-w-lg mx-auto">
                        Special thanks to our SCOPE advisors and the Olin College faculty for their guidance and support throughout this project.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};
