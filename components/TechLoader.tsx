"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function TechLoader({ onComplete }: { onComplete?: () => void }) {
    const [progress, setProgress] = useState(0);
    const [textIndex, setTextIndex] = useState(0);

    const loadingTexts = [
        "INITIALIZING CORE SYSTEMS...",
        "LOADING NEURAL INTERFACE...",
        "DECRYPTING SECURE DATA...",
        "ESTABLISHING UPLINK...",
        "ACCESS GRANTED"
    ];

    useEffect(() => {
        // Simulating a realistic "variable speed" load
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Random jump in progress to feel "busy"
                const jump = Math.random() * 15;
                return Math.min(prev + jump, 100);
            });
        }, 200);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress === 100) {
            setTimeout(() => {
                if (onComplete) onComplete();
            }, 800); // Slight delay at 100% for effect
        }
    }, [progress, onComplete]);

    useEffect(() => {
        if (progress > 20 && textIndex === 0) setTextIndex(1);
        if (progress > 45 && textIndex === 1) setTextIndex(2);
        if (progress > 70 && textIndex === 2) setTextIndex(3);
        if (progress === 100) setTextIndex(4);
    }, [progress, textIndex]);


    return (
        <motion.div
            className="fixed inset-0 z-9999 bg-black flex flex-col items-center justify-center overflow-hidden font-mono text-primary select-none"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 pointer-events-none" />

            <div className="relative w-full max-w-80 md:max-w-96 px-4 sm:px-0">
                {/* Tech Header */}
                <div className="flex justify-between text-xs mb-2 opacity-70 font-mono">
                    <span>SYS.BOOT.SEQ</span>
                    <span>V.2.0.24</span>
                </div>

                {/* Progress Bar Container */}
                <div className="h-6 w-full border border-primary/30 p-[2px] relative overflow-hidden bg-primary/5">
                    {/* Filled Bar */}
                    <motion.div
                        className="h-full bg-primary relative"
                        style={{ width: `${progress}%` }}
                    >
                        {/* Glitch Strip inside bar */}
                        <div className="absolute top-0 right-0 w-[5px] h-full bg-white/50 animate-pulse" />
                    </motion.div>

                    {/* Scanline over bar */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent w-1/2 h-full z-10 opacity-50"
                    />
                </div>

                {/* Text & Percentage */}
                <div className="flex justify-between items-end mt-4 font-mono">
                    <span className="text-sm tracking-widest animate-pulse h-6 text-primary/80">
                        {`> ${loadingTexts[textIndex]}`}
                    </span>
                    <span className="text-3xl font-bold font-mono">{Math.floor(progress)}%</span>
                </div>
            </div>

            {/* Corner Details */}
            <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 left-8 sm:left-12 md:left-16 text-[9px] sm:text-[10px] opacity-40 flex flex-col gap-1 font-mono">
                <span>MEM: 64TB OK</span>
                <span>CPU: QUANTUM OK</span>
                <span>NET: SECURE</span>
            </div>

            {/* Top Right Corner */}
            <div className="absolute top-4 sm:top-8 md:top-10 right-4 sm:right-8 md:right-10 w-16 sm:w-20 h-16 sm:h-20 border-t border-r border-primary/30 rounded-tr-xl" />

            {/* Bottom Left Corner (Difference +4 spacing) */}
            <div className="absolute bottom-4 sm:bottom-8 md:bottom-10 left-4 sm:left-8 md:left-10 w-16 sm:w-20 h-16 sm:h-20 border-b border-l border-primary/30 rounded-bl-xl" />

        </motion.div>
    );
}
