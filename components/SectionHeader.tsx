"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    description?: string;
    className?: string;
}

export default function SectionHeader({ title, subtitle, description, className = "" }: SectionHeaderProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Scramble Text Effect State
    const [displayText, setDisplayText] = useState(title);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

    useEffect(() => {
        if (!isInView) return;

        let iterations = 0;
        const interval = setInterval(() => {
            setDisplayText(() =>
                title.split("").map((letter, index) => {
                    if (index < iterations) return title[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("")
            );

            if (iterations >= title.length) clearInterval(interval);
            iterations += 1 / 3;
        }, 30);

        return () => clearInterval(interval);
    }, [isInView, title]);

    return (
        <div ref={ref} className={`flex flex-col items-center text-center mb-12 ${className}`}>
            {subtitle && (
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-primary text-sm font-medium tracking-wider uppercase mb-2"
                >
                    {subtitle}
                </motion.span>
            )}

            <motion.h2
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter pb-2 bg-clip-text text-transparent bg-linear-to-b from-white via-white/90 to-white/70 font-display"
            >
                {displayText}
            </motion.h2>

            {description && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-muted-foreground mt-4 max-w-[700px] text-lg"
                >
                    {description}
                </motion.p>
            )}
        </div>
    );
}
