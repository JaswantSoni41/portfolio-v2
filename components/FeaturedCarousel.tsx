"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types/project";
import { Button } from "./ui/button";
import { Play, ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

interface FeaturedCarouselProps {
    projects: Project[];
}

export default function FeaturedCarousel({ projects }: FeaturedCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [showVideoModal, setShowVideoModal] = useState(false);

    useEffect(() => {
        if (isPaused || showVideoModal || projects.length === 0) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % projects.length);
        }, 4000);

        return () => clearInterval(timer);
    }, [isPaused, showVideoModal, projects.length]);

    if (projects.length === 0) return null;

    const currentProject = projects[currentIndex];

    const handleVideoOpen = () => {
        if (currentProject.videoUrl) {
            setShowVideoModal(true);
            setIsPaused(true);
        }
    };

    const handleVideoClose = () => {
        setShowVideoModal(false);
        setIsPaused(false);
    };

    return (
        <div
            className="relative w-full h-full aspect-4/5 sm:aspect-square md:aspect-16/8 lg:aspect-21/9 overflow-hidden rounded-3xl group mb-12 shadow-2xl shadow-primary/10 border border-white/10"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => !showVideoModal && setIsPaused(false)}
        >
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0 z-0"
                >
                    {/* Background Image */}
                    {currentProject.images && currentProject.images[0] ? (
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${currentProject.images[0]})` }} />
                    ) : (
                        <div className="absolute inset-0 bg-linear-to-br from-gray-900 to-black flex items-center justify-center">
                            <span className="text-9xl font-bold opacity-5 text-white">{currentProject.title.charAt(0)}</span>
                        </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
                    <div className="absolute inset-0 bg-linear-to-r from-background/90 via-transparent to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-12 lg:p-16 z-20">
                        <div className="max-w-3xl space-y-4">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="flex items-center gap-3"
                            >
                                <Badge className="bg-primary text-white border-none px-3 py-1">Featured Project</Badge>
                                {currentProject.videoUrl && (
                                    <Badge variant="outline" className="text-white border-white/20 bg-black/30 backdrop-blur-md gap-1">
                                        <Play className="w-3 h-3 fill-white" /> Video Available
                                    </Badge>
                                )}
                            </motion.div>

                            <motion.h2
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-3xl md:text-5xl font-bold text-white tracking-tight"
                            >
                                {currentProject.title}
                            </motion.h2>

                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-lg md:text-xl text-white/80 line-clamp-2 max-w-2xl"
                            >
                                {currentProject.description}
                            </motion.p>
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="flex flex-wrap gap-2 pt-2"
                            >
                                {currentProject.techStack.slice(0, 5).map((tech) => (
                                    <span key={tech} className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20 backdrop-blur-sm">
                                        {tech}
                                    </span>
                                ))}
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="flex gap-4 pt-4"
                            >
                                <Button size="lg" className="rounded-full px-8 bg-white text-black hover:bg-white/90" asChild>
                                    <Link href={`/projects/${currentProject._id}`}>
                                        View Case Study <ArrowRight className="ml-2 w-4 h-4" />
                                    </Link>
                                </Button>
                                {currentProject.videoUrl && (
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="rounded-full px-8 border-white/20 text-white bg-white/10 hover:bg-white/20 backdrop-blur-md"
                                        onClick={handleVideoOpen}
                                    >
                                        <Play className="mr-2 w-4 h-4 fill-white" /> Watch Demo
                                    </Button>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="absolute bottom-6 right-8 flex gap-2 z-10">
                {projects.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "w-8 bg-white" : "bg-white/30 hover:bg-white/50"}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Video Modal Overlay */}
            <AnimatePresence>
                {showVideoModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
                        onClick={handleVideoClose}
                    >
                        <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10" onClick={(e) => e.stopPropagation()}>
                            <button
                                onClick={handleVideoClose}
                                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <iframe
                                src={currentProject.videoUrl}
                                title={currentProject.title}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
