import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Project from '@/models/Project';
import SkillCategory from '@/models/SkillCategory';
import Experience from '@/models/Experience';

const projectData = [
    {
        title: "i-Life Learn Platform",
        description: "A large-scale EdTech learning platform. Owned end-to-end frontend implementation using React (Vite) and Tailwind CSS. Built WebAR (markerless) and WebVR modules for 3D visualization. Integrated multilingual audio and AI features.",
        techStack: ["React", "Vite", "Tailwind CSS", "WebAR", "WebVR"],
        liveUrl: "https://ilifelearn.com",
        featured: true,
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Placeholder video
    },
    {
        title: "Love To Read",
        description: "Child-friendly AI-assisted learning web app. Implemented Read Aloud AI for speech verification and real-time feedback. Developed LSRW learning modules and dashboard analytics.",
        techStack: ["React", "Vite", "Tailwind CSS", "AI Integration"],
        featured: true,
        images: ["/assets/project-placeholder.jpg"]
    },
    {
        title: "Eduzon.ai",
        description: "In-browser IDE and learning platform supporting multiple languages (C, Java, Python). Implemented AI-powered practice mode, coding assignment generation, and secure test mode.",
        techStack: ["React", "Vite", "Tailwind CSS", "Monaco Editor"],
        liveUrl: "https://eduzon.ai",
        featured: true,
    },
    {
        title: "Ignite GenZ",
        description: "Youth-focused gamified learning platform with Firebase authentication and real-time data. Implemented interactive challenges and skill-building modules.",
        techStack: ["React", "Vite", "Tailwind CSS", "Firebase"],
        featured: false,
    },
    {
        title: "NEC Ace-It",
        description: "Customized EdTech solution for Narasaraopeta Engineering College. Adapted platform structure and flows to align with academic needs and institutional branding.",
        techStack: ["React", "Vite", "Tailwind CSS"],
        featured: false,
    },
    {
        title: "THEA Shoes",
        description: "E-commerce platform for women's footwear. Spearheaded frontend development with a focus on mobile-first UI and conversion optimization. Integrated with Node.js backend.",
        techStack: ["React.js", "Node.js", "MongoDB", "Express"],
        liveUrl: "https://theashoes.com",
        featured: true,
    },
    {
        title: "i-Life Ace-It",
        description: "Customized learning product derived from Eduzon codebase with scoped features and tailored UI.",
        techStack: ["React", "Tailwind CSS"],
        featured: false,
    }
];

const skillsData = [
    {
        title: "Frontend Powerhouse",
        description: "Building immersive, responsive, and performant user interfaces.",
        skills: ["React.js", "React Native", "Next.js", "Vite", "TypeScript", "Tailwind CSS", "HTML", "CSS", "JavaScript"],
        gradient: "from-blue-500/20 to-purple-500/20",
        order: 1
    },
    {
        title: "Backend & Data",
        description: "Architecting scalable server-side logic and database solutions.",
        skills: ["Node.js", "Express.js", "MongoDB", "Firebase", "Mongoose"],
        gradient: "from-green-500/20 to-emerald-500/20",
        order: 2
    },
    {
        title: "Specialized Tech",
        description: "Pushing boundaries with AI, AR/VR, and gamified experiences.",
        skills: ["WebAR", "WebVR", "Gamified Learning", "AI Integrations"],
        gradient: "from-orange-500/20 to-red-500/20",
        order: 3
    },
    {
        title: "Essentials",
        description: "Essential tools for version control, design, and deployment.",
        skills: ["Git", "GitHub", "Figma", "VS Code", "Cursor", "Google Anti-Gravity"],
        gradient: "from-gray-500/20 to-slate-500/20",
        order: 4
    },
];

const experienceData = [
    {
        title: "Jr. UI Developer",
        company: "i-Life Learn",
        dates: "Jan 2025 - Present",
        description: "Driving the frontend architecture for high-impact EdTech platforms. Successfully launched LoveToRead and Eduzon.ai, integrating cutting-edge WebAR/WebVR features and AI-driven accessibility tools.",
        skills: ["React", "WebAR", "AI Integration"]
    },
    {
        title: "Jr. Web Developer",
        company: "THEA Trends LLP",
        dates: "Mar 2023 - Apr 2024",
        description: "Led the digital transformation of a fashion retail brand. Built a performant, mobile-first e-commerce experience from the ground up, resulting in increased user engagement and sales conversion.",
        skills: ["React.js", "Node.js", "MongoDB"]
    },
    {
        title: "AI Intern",
        company: "CodeWind Technologies",
        dates: "Jun 2022 - Jul 2022",
        description: "Explored computer vision applications, developing a CNN-based Bird Species Identification model. Gained deep insights into machine learning pipelines and Python development.",
        skills: ["Python", "TensorFlow", "CNN"]
    },
];

export async function GET() {
    try {
        await connectDB();

        // Projects
        await Project.deleteMany({});
        await Project.insertMany(projectData);

        // Skills
        await SkillCategory.deleteMany({});
        await SkillCategory.insertMany(skillsData);

        // Experience
        await Experience.deleteMany({});
        await Experience.insertMany(experienceData);

        return NextResponse.json({
            message: 'Database seeded successfully',
            stats: {
                projects: projectData.length,
                skills: skillsData.length,
                experience: experienceData.length
            }
        });
    } catch (error) {
        console.error("Seeding error:", error);
        return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
    }
}
