export interface LogEntry {
    id?: number;
    date: string;
    title: string;
    content: string;
    author?: string;
    images?: { src: string; caption?: string }[];
}

export interface Subsystem {
    id: string;
    title: string;
    description: string;
    overview: string;  // Technical overview shown above logs
    color: string;
}

export const subsystems: Subsystem[] = [
    {
        id: 'mechanical',
        title: 'Mechanical',
        description: 'Precision gantry system for automated parasite extraction with sub-millimeter accuracy.',
        overview: 'The mechanical subsystem consists of a 3-axis CNC-style gantry with linear rails, stepper motors, and a custom vacuum-based end effector. The system provides 400×300×50mm of travel with ±0.1mm repeatability, enabling precise positioning for parasite extraction without damaging the fish fillet.',
        color: '#1e3a5f'
    },
    {
        id: 'electrical',
        title: 'Electrical',
        description: 'Specialized lighting system and sensor array for nematode detection using wavelength filtering.',
        overview: 'The electrical subsystem integrates a high-intensity LED backlight array with custom bandpass filters optimized for nematode visibility. It includes power distribution, stepper drivers (TMC2209), camera interface (IMX477 sensor), and real-time current monitoring for system health.',
        color: '#8b2332'
    },
    {
        id: 'software',
        title: 'Software',
        description: 'Computer vision pipeline for real-time parasite detection and path planning for extraction.',
        overview: 'The software subsystem runs an OpenCV-based vision pipeline for real-time nematode detection. It includes camera calibration, contrast enhancement, blob detection, and coordinate mapping to gantry space. A greedy path planning algorithm optimizes extraction order, and a web-based interface provides monitoring and control.',
        color: '#166534'
    },
    {
        id: 'logistics',
        title: 'Logistics',
        description: 'Project management, coordination, and resource planning for the FishEye system development.',
        overview: 'The logistics subsystem manages project timeline, team coordination, budget tracking, vendor communications, and integration planning. This includes sprint planning, milestone tracking, documentation management, and ensuring all technical subsystems align with project goals and deadlines.',
        color: '#7c3aed'
    }
];

export const projectInfo = {
    name: 'FishEye',
    tagline: 'Autonomous Parasite Detection & Removal',
    description: 'An automated system for detecting and extracting parasites from fish fillets using computer vision and precision robotics.',
    institution: 'Olin College of Engineering'
};
