"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

// Coding Background Component
const CodeBackground = () => {
    const codeSnippets = [
        "const developer = 'Jaswant';",
        "import { React } from 'react';",
        "function createMagic() { ... }",
        "<Component />",
        "npm install success",
        "while(alive) { code(); }",
        "git push origin master",
        "if (bug) fix(bug);",
        "const stack = ['MERN', 'Next.js'];",
        "console.log('Hello World');",
        "div { display: flex; }",
        "useState(null);",
        "useEffect(() => {}, [])"
    ];

    const [elements, setElements] = useState<{
        snippets: Array<{
            text: string;
            top: string;
            fontSize: string;
            duration: number;
            delay: number;
            initialY: number;
        }>;
        drops: Array<{
            left: string;
            duration: number;
            delay: number;
        }>;
    }>({ snippets: [], drops: [] });

    useEffect(() => {
        const totalSnippets = codeSnippets.length;
        const snippets = codeSnippets.map((text, index) => ({
            text,
            // Divide screen into even rows to prevent overlap
            top: `${(index * (100 / totalSnippets)) + (Math.random() * 2)}%`,
            fontSize: `${Math.random() * 0.5 + 0.8}rem`,
            duration: Math.random() * 10 + 20,
            delay: Math.random() * 5,
            initialY: 0
        }));

        const drops = Array.from({ length: 10 }).map(() => ({
            left: `${Math.random() * 100}%`,
            duration: Math.random() * 5 + 3,
            delay: Math.random() * 5
        }));

        setElements({ snippets, drops });
    }, []);

    return (
        <motion.div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            transition={{ duration: 0.1 }}
        >
            {elements.snippets.map((snippet, i) => (
                <motion.div
                    key={i}
                    className="absolute text-primary font-mono text-sm whitespace-nowrap"
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: "-100%", opacity: 1 }}
                    transition={{
                        duration: snippet.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: snippet.delay
                    }}
                    style={{
                        top: snippet.top,
                        fontSize: snippet.fontSize
                    }}
                >
                    {snippet.text}
                </motion.div>
            ))}
            {/* Vertical Matrix-like drips */}
            {elements.drops.map((drop, i) => (
                <motion.div
                    key={`v-${i}`}
                    className="absolute top-0 w-[1px] bg-linear-to-b from-transparent via-primary to-transparent h-48"
                    initial={{ y: -200, opacity: 0 }}
                    animate={{ y: "120vh", opacity: [0, 1, 0] }}
                    transition={{
                        duration: drop.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: drop.delay
                    }}
                    style={{ left: drop.left }}
                />
            ))}
        </motion.div>
    );

};

// Jarvis Circle Component
const JarvisCircle = () => {
    return (
        <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] flex items-center justify-center">
            {/* Core Image */}
            <div className="absolute inset-4 rounded-full overflow-hidden border-2 border-primary/50 z-20 shadow-[0_0_30px_rgba(var(--primary),0.6)] bg-linear-to-b from-gray-900 via-gray-900 to-black">
                <Image
                    src="/assets/ME-Jaswant_Soni.png"
                    alt="Jaswant Soni"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Scanline overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-size-[100%_4px] pointer-events-none opacity-20" />
            </div>

            {/* Rotating Rings */}
            {/* Ring 1 - Fast Clockwise */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-primary/30 z-10"
            />

            {/* Ring 2 - Slow Counter-Clockwise with gaps */}
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-full border-2 border-primary/20 border-t-transparent border-l-transparent z-10"
            />

            {/* Ring 3 - Pulse and Scale */}
            <motion.div
                animate={{ scale: [1, 1.05, 1], rotate: 180 }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-8 rounded-full border border-primary/10 z-0"
            />

            {/* Tech Markers */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-12 z-0 opacity-50"
            >
                <div className="absolute top-1/2 left-0 w-3 h-1 bg-primary" />
                <div className="absolute top-1/2 right-0 w-3 h-1 bg-primary" />
                <div className="absolute top-0 left-1/2 w-1 h-3 bg-primary" />
                <div className="absolute bottom-0 left-1/2 w-1 h-3 bg-primary" />
            </motion.div>
        </div>
    );
};

export default function Hero() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    // Typing Effect State
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        const roles = ["Frontend Developer", "EdTech Specialist", "React Enthusiast", "WebAR/VR Creator"];
        const i = loopNum % roles.length;
        const fullText = roles[i];

        const handleTyping = () => {
            if (isDeleting) {
                setText(fullText.substring(0, text.length - 1));
                setTypingSpeed(50);
            } else {
                setText(fullText.substring(0, text.length + 1));
                setTypingSpeed(150);
            }

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && text === "") {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, typingSpeed]);

    // Mobile Detection for disabling parallax
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <section className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden bg-background">
            {/* Background Layers */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/20 via-background to-background z-0" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20" />

            {/* Coding Background Animation */}
            <CodeBackground />

            <div className="container p-4 md:px-6 lg:py-0 relative z-10 w-full mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* Left Content - Intro */}
                    <motion.div
                        style={{ y: isMobile ? 0 : y1 }}
                        className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6 backdrop-blur-md">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                System Online
                            </div>

                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6">
                                <span className="block text-muted-foreground text-2xl md:text-3xl font-normal mb-2">Hello, I'm</span>
                                <span className="bg-clip-text text-transparent bg-linear-to-b from-white via-white/90 to-white/70">
                                    Jaswant Soni
                                </span>
                            </h1>

                            <div className="h-8 md:h-12 mb-6 overflow-hidden">
                                <div className="text-xl md:text-3xl font-mono text-primary flex items-center justify-center lg:justify-start">
                                    <span className="mr-2">{`>`}</span>
                                    {text}
                                    <span className="animate-blink ml-1">_</span>
                                </div>
                            </div>

                            <p className="text-muted-foreground max-w-[600px] text-lg mb-8 leading-relaxed">
                                Architecture scalable, gamified EdTech experiences.
                                Specialized in <span className="text-primary">React</span>, <span className="text-primary">WebAR</span>, and performance-first web applications.
                            </p>

                            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_-5px_var(--primary)] rounded-full h-12 px-8" asChild>
                                    <Link href="#projects">
                                        Initialize Projects <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-full h-12 px-8" asChild>
                                    <Link href="/pdfs/Jaswant_Soni.pdf" target="_blank">
                                        <Download className="mr-2 h-4 w-4" /> Download Resume
                                    </Link>
                                </Button>
                            </div>

                            <div className="flex gap-6 mt-8 justify-center lg:justify-start">
                                <Link href="https://github.com/JaswantSoni41" target="_blank" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110">
                                    <Github className="h-6 w-6" />
                                </Link>
                                <Link href="https://linkedin.com/in/jaswant-soni" target="_blank" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110">
                                    <Linkedin className="h-6 w-6" />
                                </Link>
                                <Link href="mailto:jaswantsoni41@gmail.com" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110">
                                    <Mail className="h-6 w-6" />
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Jarvis Circle */}
                    <motion.div
                        style={{ y: isMobile ? 0 : y2 }}
                        className="flex justify-center items-center order-1 lg:order-2 relative"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Glow background behind jarvis */}
                        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
                        <JarvisCircle />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
