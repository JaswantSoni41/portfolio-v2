"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useState, useEffect } from "react";

interface Experience {
    _id: string;
    role: string; // Mapped from title
    company: string;
    dates: string;
    description: string;
    skills: string[];
    title: string; // The backend field is title, but UI uses role. I'll map it.
}

export default function Experience() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchExperiences() {
            try {
                const res = await fetch("/api/experience");
                if (res.ok) {
                    const data = await res.json();
                    setExperiences(data);
                }
            } catch (error) {
                console.error("Failed to fetch experiences", error);
            } finally {
                setLoading(false);
            }
        }
        fetchExperiences();
    }, []);

    if (loading) {
        return (
            <section id="experience" className="min-h-[60vh] py-32 bg-background relative overflow-hidden flex items-center justify-center">
                <div className="text-muted-foreground animate-pulse">Loading Experience...</div>
            </section>
        );
    }

    return (
        <section id="experience" className="py-32 bg-background relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container p-4 md:px-6 lg:py-0 relative mx-auto z-10">
                <SectionHeader
                    title="Professional Experience"
                    subtitle="My Journey"
                    className="mb-24"
                />

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-primary/50 to-transparent" />

                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp._id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className={`relative flex flex-col md:flex-row gap-8 mb-16 last:mb-0 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Timeline Dot */}
                            <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-background border-2 border-primary rounded-full z-10 shadow-[0_0_10px_var(--primary)] mt-1.5 md:mt-8" />

                            {/* Content Card */}
                            <div className="ml-8 md:ml-0 md:w-1/2 px-4">
                                <div className="bg-card/20 backdrop-blur-md border border-white/5 p-6 rounded-2xl hover:border-primary/30 transition-all duration-300 hover:bg-card/30 group">
                                    <div className="flex flex-col gap-2 mb-4">
                                        <span className="text-primary text-sm font-bold tracking-wider uppercase flex items-center gap-2">
                                            <Calendar size={14} /> {exp.dates}
                                        </span>
                                        <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{exp.title}</h3>
                                        <div className="flex items-center gap-4 text-muted-foreground text-sm">
                                            <span className="flex items-center gap-1"><Briefcase size={14} /> {exp.company}</span>
                                            {/* Location isn't in backend yet, keeping generic or removing */}
                                            {/* <span className="flex items-center gap-1"><MapPin size={14} /> {exp.location}</span> */}
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed mb-6">
                                        {exp.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {exp.skills?.map((t) => (
                                            <span key={t} className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-white/70 border border-white/5 group-hover:border-primary/20 transition-colors">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Spacer for alternating layout */}
                            <div className="hidden md:block md:w-1/2" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
