"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const navItems = [
    { name: "About", href: "/#about" },
    { name: "Skills", href: "/#skills" },
    { name: "Projects", href: "/projects" },
    { name: "Experience", href: "/#experience" },
    { name: "Contact", href: "/#contact" },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Handle hash scrolling with retries for dynamic content
    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const scrollToHash = () => {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            };

            // Immediate attempt
            scrollToHash();
            // Retry after short delays to allow for data fetching/layout shift
            const t1 = setTimeout(scrollToHash, 500);
            const t2 = setTimeout(scrollToHash, 1500);

            return () => {
                clearTimeout(t1);
                clearTimeout(t2);
            };
        }
    }, [pathname]); // Re-run on path change

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-background/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/5"
                : "bg-transparent"
                }`}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between h-20">
                    <Link href="/" className="text-2xl font-bold tracking-tighter text-foreground flex items-center gap-1 group">
                        <span className="group-hover:text-primary transition-colors duration-300">JS</span>
                        <span className="text-primary group-hover:text-white transition-colors duration-300">.</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                        <Button variant="outline" size="sm" className="rounded-full border-primary/20 hover:bg-primary/10 hover:border-primary/50 text-primary" asChild>
                            <Link href="/pdfs/Jaswant_Soni.pdf" target="_blank" rel="noopener noreferrer">Resume</Link>
                        </Button>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-foreground"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100vh" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background/95 backdrop-blur-xl absolute top-full left-0 right-0 border-t border-white/5"
                    >
                        <div className="container px-4 py-8 flex flex-col gap-6 items-center">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-lg font-medium hover:text-primary transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Button className="w-full max-w-xs mt-4" size="lg" asChild>
                                <Link href="/pdfs/Jaswant_Soni.pdf" target="_blank">Download Resume</Link>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
