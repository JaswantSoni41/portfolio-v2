"use client";
import { useState, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";
import {
    FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, FaGithub, FaFigma,
} from "react-icons/fa";
import {
    SiNextdotjs, SiVite, SiTypescript, SiTailwindcss, SiExpress, SiMongodb, SiFirebase, SiPrisma, SiExpo, SiGoogle, SiMongoose, SiGraphql, SiRedux,
} from "react-icons/si";
import { TbCube, TbBrandThreejs, TbAugmentedReality2 } from "react-icons/tb";
import { RiGogglesLine } from "react-icons/ri";
import { BrainCircuit, Gamepad2, Cpu, Sparkles, MousePointer2 } from "lucide-react";
import SectionHeader from "./SectionHeader";

// --- Types ---
type SkillItem = {
    name: string;
    icon: any;
    color: string;
    description?: string;
};

type SkillCategory = {
    _id?: string;
    title: string;
    description: string;
    skills: string[];
    gradient: string;
    order?: number;
};

// --- Data ---
const skillIcons: Record<string, SkillItem> = {
    "React.js": { name: "React", icon: FaReact, color: "#61DAFB", description: "JS Library" },
    "React Native": { name: "React Native", icon: SiExpo, color: "#FFFFFF", description: "Mobile Apps" },
    "Next.js": { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF", description: "React Framework" },
    "Vite": { name: "Vite", icon: SiVite, color: "#646CFF", description: "Build Tool" },
    "TypeScript": { name: "TypeScript", icon: SiTypescript, color: "#3178C6", description: "Typed JS" },
    "Tailwind CSS": { name: "Tailwind", icon: SiTailwindcss, color: "#38B2AC", description: "Utility CSS" },
    "HTML": { name: "HTML5", icon: FaHtml5, color: "#E34F26", description: "Markup" },
    "CSS": { name: "CSS3", icon: FaCss3Alt, color: "#1572B6", description: "Styling" },
    "JavaScript": { name: "JavaScript", icon: FaJs, color: "#F7DF1E", description: "Logic" },
    "Node.js": { name: "Node.js", icon: FaNodeJs, color: "#339933", description: "Runtime" },
    "Express.js": { name: "Express", icon: SiExpress, color: "#FFFFFF", description: "Web Framework" },
    "MongoDB": { name: "MongoDB", icon: SiMongodb, color: "#47A248", description: "NoSQL DB" },
    "Mongoose": { name: "Mongoose", icon: SiMongoose, color: "#880000", description: "ODM" },
    "Firebase": { name: "Firebase", icon: SiFirebase, color: "#FFCA28", description: "BaaS" },
    "Git": { name: "Git", icon: FaGitAlt, color: "#F05032", description: "Version Control" },
    "GitHub": { name: "GitHub", icon: FaGithub, color: "#FFFFFF", description: "Collaboration" },
    "Figma": { name: "Figma", icon: FaFigma, color: "#F24E1E", description: "Design" },
    "VS Code": { name: "VS Code", icon: TbCube, color: "#007ACC", description: "Editor" },
    "WebAR": { name: "WebAR", icon: TbAugmentedReality2, color: "#FF0080", description: "Immersive Web" },
    "WebVR": { name: "WebVR", icon: RiGogglesLine, color: "#9D4EDD", description: "Virtual Reality" },
    "Gamified Learning": { name: "Gamification", icon: Gamepad2, color: "#00C853", description: "Engagement" },
    "AI Integrations": { name: "AI Ops", icon: BrainCircuit, color: "#FF3D00", description: "Intelligence" },
    "Three.js": { name: "Three.js", icon: TbBrandThreejs, color: "#FFFFFF", description: "3D Graphics" },
    "Prisma": { name: "Prisma", icon: SiPrisma, color: "#2D3748", description: "ORM" },
    "GraphQL": { name: "GraphQL", icon: SiGraphql, color: "#E10098", description: "Query Language" },
    "Redux": { name: "Redux", icon: SiRedux, color: "#764ABC", description: "State Mgmt" },
    "Google Anti-Gravity": { name: "Antigravity", icon: SiGoogle, color: "#4285F4", description: "AI Assistant & Editor" },
    "Cursor": { name: "Cursor", icon: MousePointer2, color: "#FFFFFF", description: "AI Editor" },
};

// --- Components ---

function SpotlightCard({ children, className = "", gradient = "from-white/10 to-transparent" }: { children: React.ReactNode; className?: string; gradient?: string }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={`group relative border border-white/10 bg-gray-900/40 overflow-hidden rounded-xl ${className}`}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.1),
              transparent 80%
            )
          `,
                }}
            />
            <div className="relative h-full">{children}</div>
        </div>
    );
}

function SkillPill({ skillKey }: { skillKey: string }) {
    const skill = skillIcons[skillKey] || { name: skillKey, icon: TbCube, color: "#888", description: "Tech" };
    const Icon = skill.icon;

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group/pill relative flex items-center gap-3 rounded-lg border border-white/5 bg-white/5 px-3 py-2 transition-colors hover:border-white/10 hover:bg-white/10 sm:px-4 sm:py-3"
        >
            <div
                className="relative flex h-8 w-8 items-center justify-center rounded-md text-xl transition-all duration-300 group-hover/pill:text-white sm:h-10 sm:w-10 sm:text-2xl"
                style={{ color: skill.color }}
            >
                <div className="absolute inset-0 opacity-20 blur-md transition-opacity duration-300 group-hover/pill:opacity-100" style={{ backgroundColor: skill.color }} />
                <Icon className="relative z-10" />
            </div>
            <div className="flex flex-col">
                <span className="font-semibold text-white/90 text-xs sm:text-sm group-hover/pill:text-white">
                    {skill.name}
                </span>
                <span className="text-[10px] text-muted-foreground sm:text-xs">
                    {skill.description}
                </span>
            </div>
        </motion.div>
    );
}

export default function Skills() {
    const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSkills() {
            try {
                const res = await fetch("/api/skills");
                if (res.ok) {
                    const data = await res.json();
                    setSkillCategories(data);
                }
            } catch (error) {
                console.error("Failed to fetch skills", error);
            } finally {
                setLoading(false);
            }
        }
        fetchSkills();
    }, []);

    const getIconForCategory = (title: string) => {
        if (title.includes("Frontend")) return Sparkles;
        if (title.includes("Backend")) return Cpu;
        if (title.includes("Specialized") || title.includes("Emerging")) return BrainCircuit;
        return TbCube;
    };

    const getGradientForCategory = (title: string, index: number) => {
        // fallback gradients if not from DB or custom logic
        const gradients = [
            "from-blue-500/5 to-purple-500/5",
            "from-emerald-500/5 to-teal-500/5",
            "from-orange-500/5 to-red-500/5",
            "from-gray-500/5 to-slate-500/5"
        ];
        return gradients[index % gradients.length];
    };

    // Sort categories by order if available
    const sortedCategories = [...skillCategories].sort((a, b) => (a.order || 0) - (b.order || 0));

    if (loading) {
        return (
            <section id="skills" className="min-h-[80vh] py-32 bg-background relative overflow-hidden flex items-center justify-center">
                <div className="text-muted-foreground animate-pulse">Loading Skills...</div>
            </section>
        );
    }

    return (
        <section id="skills" className="relative overflow-hidden py-32 bg-background">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-900/20 via-background to-background pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            {/* Theme Glows */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none opacity-50" />
            <div className="absolute top-1/4 left-0 w-[300px] h-[300px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none opacity-30" />

            <div className="container relative z-10 mx-auto px-4 md:px-6">
                <SectionHeader
                    title="Skills & Technologies"
                    subtitle="My Arsenal"
                    description="A comprehensive suite of tools and technologies I leverage to build high-performance, scalable, and immersive digital experiences."
                    className="mb-20"
                />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12 max-w-7xl mx-auto">
                    {sortedCategories.map((category, index) => {
                        const CategoryIcon = getIconForCategory(category.title);
                        // Determine grid span based on content or order - mimicking the original layout
                        // "Frontend" & "Tools" were large (col-span-7), others medium (col-span-5) in original.
                        // We can dynamically assign this or keep it simple. Let's make 1st and 4th large if 4 items exist.
                        let colSpan = "lg:col-span-6";
                        if (sortedCategories.length === 4) {
                            if (index === 0 || index === 3) colSpan = "lg:col-span-7";
                            else colSpan = "lg:col-span-5";
                        }

                        return (
                            <div key={category._id || category.title} className={colSpan}>
                                <SpotlightCard className={`h-full p-8 rounded-3xl bg-linear-to-br backdrop-blur-sm ${getGradientForCategory(category.title, index)}`}>
                                    <div className="flex flex-col h-full">
                                        <div className="mb-6 flex items-center gap-4">
                                            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10`}>
                                                <CategoryIcon className="h-6 w-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                                                <p className="text-sm text-muted-foreground">{category.description}</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                                            {category.skills.map((skill) => (
                                                <SkillPill key={skill} skillKey={skill} />
                                            ))}
                                        </div>
                                    </div>
                                </SpotlightCard>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
