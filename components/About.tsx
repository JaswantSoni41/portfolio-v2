"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, Rocket, Users, Zap, Terminal, Cpu, Database, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import CountUp from "react-countup";

const stats = [
    { label: "Runtime Years", value: 2, suffix: "+", icon: Terminal, color: "text-cyan-400" },
    { label: "Deployments", value: 10, suffix: "+", icon: Rocket, color: "text-purple-400" },
    { label: "Active Nodes", value: 5, suffix: "+", icon: Users, color: "text-green-400" },
];

const skills = [
    { name: "React Core", level: 95, color: "bg-cyan-500" },
    { name: "Next.js Architecture", level: 90, color: "bg-indigo-500" },
    { name: "WebAR Protocols", level: 85, color: "bg-purple-500" },
    { name: "Performance Opt.", level: 88, color: "bg-green-500" },
];

export default function About() {
    const { scrollYProgress } = useScroll();
    const yKey = useTransform(scrollYProgress, [0, 1], [0, -50]);

    // Scramble Text Effect for Header
    const [headerText, setHeaderText] = useState("Engineering The Future");
    const targetText = "Engineering The Future";

    useEffect(() => {
        let iterations = 0;
        const interval = setInterval(() => {
            setHeaderText(prev =>
                targetText.split("").map((letter, index) => {
                    if (index < iterations) return targetText[index];
                    return "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()"[Math.floor(Math.random() * 26)];
                }).join("")
            );
            if (iterations >= targetText.length) clearInterval(interval);
            iterations += 1 / 3;
        }, 30);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="about" className="min-h-screen py-32 bg-black relative overflow-hidden flex items-center">
            {/* Cyber Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] z-0" />

            {/* Moving Scanner Line */}
            <motion.div
                className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/50 to-transparent blur-sm z-10"
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />

            <div className="container p-4 md:px-6 lg:py-0 relative mx-auto z-20">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left Column: Data Stream Bio */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* HUD Corners */}
                        <div className="absolute -top-6 -left-6 w-12 h-12 border-t-2 border-l-2 border-primary/50 opacity-50" />
                        <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b-2 border-r-2 border-primary/50 opacity-50" />

                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-px flex-1 bg-linear-to-r from-transparent to-primary/50" />
                            <span className="font-mono text-primary text-xs tracking-[0.2em] animate-pulse">SYSTEM_ID: JASWANT_SONI</span>
                            <div className="h-px flex-1 bg-linear-to-l from-transparent to-primary/50" />
                        </div>

                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter pb-8 bg-clip-text text-transparent bg-linear-to-b from-white via-white/90 to-white/70 font-display">
                            {headerText}
                        </h2>

                        <div className="space-y-6 text-lg text-slate-400 leading-relaxed relative bg-black/40 backdrop-blur-sm p-6 border border-white/5 rounded-lg">
                            {/* Decorative scanline */}
                            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />

                            <p>
                                <span className="text-primary font-mono text-sm mr-2">{`>`}</span>
                                Initiating biography sequence...
                                <br />
                                Specialized in <strong className="text-primary/80">Gamified EdTech Systems</strong>.
                                Mission: Transform static data into immersive interactive experiences.
                            </p>
                            <p>
                                <span className="text-primary font-mono text-sm mr-2">{`>`}</span>
                                Core modules include <strong className="text-primary/80">React (Vite)</strong>, <strong className="text-primary/80">Tailwind CSS</strong>, and <strong className="text-primary/80">WebAR Protocols</strong>.
                                Current Status: Building NCERT-aligned engines affecting 1000+ users.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-8">
                            {["Clean Architecture", "High Performance", "User Centric"].map((tag, i) => (
                                <div key={i} className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-none transform -skew-x-12 hover:bg-primary/20 transition-colors cursor-crosshair group">
                                    <div className="w-2 h-2 bg-primary rounded-full group-hover:animate-ping" />
                                    <span className="text-primary/80 text-sm font-mono transform skew-x-12">{tag}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column: System Diagnostics Panel */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="relative group"
                    >
                        {/* Background Glow */}
                        <div className="absolute -inset-1 bg-linear-to-r from-primary via-secondary to-primary rounded-xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500 animate-tilt" />

                        <div className="relative bg-black/80 backdrop-blur-xl border border-primary/20 p-8 rounded-xl shadow-2xl overflow-hidden">
                            {/* Holographic Header */}
                            <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                                <div className="flex flex-col">
                                    <span className="text-xs font-mono text-primary">DIAGNOSTIC_PANEL_V2</span>
                                    <span className="text-sm text-slate-400">System Performance Metrics</span>
                                </div>
                                <Cpu className="text-primary animate-spin-slow" size={24} />
                            </div>

                            {/* Skill Bars */}
                            <div className="space-y-6 mb-10">
                                {skills.map((skill, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between text-xs font-mono text-cyan-200">
                                            <span>{skill.name}</span>
                                            <span>
                                                <CountUp end={skill.level} suffix="%" duration={2} enableScrollSpy scrollSpyOnce />
                                            </span>
                                        </div>
                                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden relative">
                                            <motion.div
                                                className={`h-full ${skill.color} relative`}
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                transition={{ duration: 1.5, delay: 0.2 + (i * 0.1) }}
                                            >
                                                <div className="absolute right-0 top-0 bottom-0 w-px bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.5)]" />
                                            </motion.div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Stat Modules Grid */}
                            <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-8">
                                {stats.map((stat, idx) => (
                                    <div key={idx} className="bg-white/5 border border-white/5 p-4 rounded-lg flex flex-col items-center text-center hover:bg-white/10 transition-colors group/card relative overflow-hidden">
                                        <div className={`absolute inset-0 bg-linear-to-b from-transparent to-${stat.color.split('-')[1]}-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity`} />
                                        <stat.icon className={`h-6 w-6 mb-2 ${stat.color}`} />
                                        <span className="text-2xl font-bold text-white font-mono tracking-tighter">
                                            <CountUp end={stat.value} suffix={stat.suffix} duration={2.5} enableScrollSpy scrollSpyOnce />
                                        </span>
                                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">{stat.label}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute top-1/2 left-0 w-1 h-12 bg-primary/50" />
                            <div className="absolute top-1/2 right-0 w-1 h-12 bg-primary/50" />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
