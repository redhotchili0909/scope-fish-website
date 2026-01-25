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
    logs: LogEntry[];
}

export const subsystems: Subsystem[] = [
    {
        id: 'mechanical',
        title: 'Mechanical',
        description: 'Precision gantry system for automated parasite extraction with sub-millimeter accuracy.',
        overview: 'The mechanical subsystem consists of a 3-axis CNC-style gantry with linear rails, stepper motors, and a custom vacuum-based end effector. The system provides 400×300×50mm of travel with ±0.1mm repeatability, enabling precise positioning for parasite extraction without damaging the fish fillet.',
        color: '#1e3a5f',
        logs: [
            {
                date: 'March 15, 2026',
                title: 'End Effector Prototype Complete',
                content: 'Finished first prototype of the vacuum pickup tool. Initial tests show consistent grip on test samples. Need to refine the nozzle diameter for smaller parasites.',
                author: 'Team',
                images: [
                    { src: '/images/mechanical/end-effector-v1.jpg', caption: 'End effector prototype mounted on Z-axis' }
                ]
            },
            {
                date: 'March 8, 2026',
                title: 'Linear Rail Installation',
                content: 'Installed MGN12H linear rails on all three axes. Measured runout at 0.02mm over 300mm travel—within spec. Next step is motor mounting.',
                author: 'Team'
            },
            {
                date: 'February 28, 2026',
                title: 'Frame Assembly',
                content: 'Completed aluminum extrusion frame assembly. 400x300mm work area confirmed. Added corner brackets for rigidity. Frame deflection under load is acceptable.',
                author: 'Team'
            },
            {
                date: 'February 14, 2026',
                title: 'Design Review',
                content: 'Finalized CAD model for the gantry system. Selected NEMA 17 steppers for X/Y and NEMA 23 for Z axis. Bill of materials approved and parts ordered.',
                author: 'Team'
            }
        ]
    },
    {
        id: 'electrical',
        title: 'Electrical',
        description: 'Specialized lighting system and sensor array for nematode detection using wavelength filtering.',
        overview: 'The electrical subsystem integrates a high-intensity LED backlight array with custom bandpass filters optimized for nematode visibility. It includes power distribution, stepper drivers (TMC2209), camera interface (IMX477 sensor), and real-time current monitoring for system health.',
        color: '#8b2332',
        logs: [
            {
                date: 'March 12, 2026',
                title: 'Filter Testing Results',
                content: 'Tested 3 different bandpass filters. The 550nm filter showed best contrast for nematode detection. Documented spectral response curves.',
                author: 'Team'
            },
            {
                date: 'March 1, 2026',
                title: 'LED Array Assembly',
                content: 'Assembled the 24-LED backlight array. Achieved >90% uniformity across the inspection area. Added diffuser layer to eliminate hotspots.',
                author: 'Team'
            },
            {
                date: 'February 20, 2026',
                title: 'Power Distribution Board',
                content: 'Designed and ordered custom PCB for power distribution. Includes 24V input, 5V/12V rails, and current monitoring for each subsystem.',
                author: 'Team'
            },
            {
                date: 'February 10, 2026',
                title: 'Component Selection',
                content: 'Selected camera (IMX477), stepper drivers (TMC2209), and LED components. Created wiring diagram for full system integration.',
                author: 'Team'
            }
        ]
    },
    {
        id: 'software',
        title: 'Software',
        description: 'Computer vision pipeline for real-time parasite detection and path planning for extraction.',
        overview: 'The software subsystem runs an OpenCV-based vision pipeline for real-time nematode detection. It includes camera calibration, contrast enhancement, blob detection, and coordinate mapping to gantry space. A greedy path planning algorithm optimizes extraction order, and a web-based interface provides monitoring and control.',
        color: '#166534',
        logs: [
            {
                date: 'March 14, 2026',
                title: 'Detection Accuracy at 94%',
                content: 'Trained model on 500 annotated images. Current detection accuracy is 94% with 2% false positive rate. Working on edge cases with overlapping parasites.',
                author: 'Team'
            },
            {
                date: 'March 5, 2026',
                title: 'Path Planning Algorithm',
                content: 'Implemented greedy nearest-neighbor algorithm for extraction path. Average cycle time reduced by 30% compared to naive ordering.',
                author: 'Team'
            },
            {
                date: 'February 25, 2026',
                title: 'Camera Calibration',
                content: 'Completed camera-to-gantry coordinate calibration using checkerboard pattern. Pixel-to-mm mapping accurate to 0.1mm.',
                author: 'Team'
            },
            {
                date: 'February 15, 2026',
                title: 'Initial Vision Pipeline',
                content: 'Set up OpenCV pipeline with contrast enhancement and blob detection. Works on static test images. Next: real-time processing.',
                author: 'Team'
            }
        ]
    }
];

export const projectInfo = {
    name: 'FishEye',
    tagline: 'Autonomous Parasite Detection & Removal',
    description: 'An automated system for detecting and extracting parasites from fish fillets using computer vision and precision robotics.',
    institution: 'Olin College of Engineering'
};
