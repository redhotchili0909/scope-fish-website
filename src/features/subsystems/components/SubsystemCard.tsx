import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';

interface SubsystemCardProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
    to: string;
}

export const SubsystemCard: React.FC<SubsystemCardProps> = ({
    title,
    description,
    to,
    icon,
}) => {
    return (
        <Link to={to} className="block group h-full">
            <motion.div
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="card p-6 h-full flex flex-col card-hover bg-surface"
            >
                {/* Icon */}
                {icon && (
                    <div className="w-10 h-10 rounded bg-primary/10 text-primary flex items-center justify-center mb-4">
                        {icon}
                    </div>
                )}

                {/* Content */}
                <h3 className="text-lg font-serif font-semibold mb-2 group-hover:text-primary transition-colors">
                    {title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed flex-grow">
                    {description}
                </p>

                {/* Link indicator */}
                <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-sm font-medium text-primary transition-all group-hover:gap-3">
                    <span>View details</span>
                    <ArrowRight className="w-4 h-4" />
                </div>
            </motion.div>
        </Link>
    );
};
