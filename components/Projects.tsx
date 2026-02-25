"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types/project";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import Link from "next/link";
import SectionHeader from "./SectionHeader";
import FeaturedCarousel from "./FeaturedCarousel";
import {
    Card as UICard,
    CardContent as UICardContent,
    CardHeader as UICardHeader,
    CardTitle as UICardTitle,
    CardDescription as UICardDescription,
    CardFooter as UICardFooter,
} from "./ui/card";

interface ProjectsProps {
    featuredOnly?: boolean;
}

export default function Projects({ featuredOnly = false }: ProjectsProps) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [filter, setFilter] = useState("All");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const res = await fetch("/api/projects");
                if (res.ok) {
                    const data = await res.json();
                    setProjects(data);
                }
            } catch (error) {
                console.error("Failed to fetch projects", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchProjects();
    }, []);

    const featuredProjects = projects.filter(p => p.featured);
    // On dedicated page, we show 'other' projects in the grid.
    // On home page, we don't show the grid at all.
    const nonFeaturedProjects = projects.filter(p => !p.featured);

    const filteredGridProjects = filter === "All"
        ? nonFeaturedProjects
        : nonFeaturedProjects.filter((p) => p.techStack.includes(filter));

    const allTechs = Array.from(new Set(nonFeaturedProjects.flatMap(p => p.techStack))).slice(0, 6);

    return (
        <section id="projects" className={`${featuredOnly ? "py-24 md:py-32" : "py-8 md:py-12"} min-h-[50vh] bg-background relative overflow-hidden`}>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container p-4 md:px-6 lg:py-0 relative mx-auto z-10">
                <SectionHeader
                    title={featuredOnly ? "Featured Projects" : "Projects"}
                    subtitle="My Work"
                    description={featuredOnly ? "Highlights of my work in EdTech, E-Commerce, and Web3D." : "Explore my complete portfolio of projects."}
                    className={featuredOnly ? "mb-16" : "mb-8 md:mb-12"}
                />

                {/* Featured Carousel */}
                {!isLoading && featuredProjects.length > 0 && (
                    <div className="mb-20">
                        {/* Only show section subtitle on Projects page if desired, or just let the carousel speak for itself. 
                             The user said "feature projects should be show on top in carousal stye". */}
                        <FeaturedCarousel projects={featuredProjects} />
                    </div>
                )}

                {/* Grid Section for Other Projects (Only if NOT featuredOnly mode) */}
                {!featuredOnly && (
                    <div className="animate-in fade-in slide-in-from-bottom-10 duration-700">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-bold">More Projects</h3>
                        </div>

                        {/* Filter */}
                        <div className="flex flex-wrap gap-2 mb-12">
                            <Button
                                variant={filter === "All" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setFilter("All")}
                                className={`rounded-full px-6 ${filter === "All" ? "bg-primary text-white" : "bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10 hover:text-white"}`}
                            >
                                All
                            </Button>
                            {allTechs.map((tech) => (
                                <Button
                                    key={tech}
                                    variant={filter === tech ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setFilter(tech)}
                                    className={`rounded-full ${filter === tech ? "bg-primary text-white" : "bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10 hover:text-white"}`}
                                >
                                    {tech}
                                </Button>
                            ))}
                        </div>

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            <AnimatePresence>
                                {filteredGridProjects.map((project) => (
                                    <motion.div
                                        key={project._id || project.title}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <UICard className="h-full flex flex-col overflow-hidden border-white/5 bg-card/20 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 group hover:shadow-[0_0_30px_-10px_var(--primary)] rounded-3xl">
                                            <div className="h-56 bg-white/5 w-full relative overflow-hidden group">
                                                <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent z-10 opacity-60" />
                                                {project.images && project.images[0] ? (
                                                    <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                                ) : (
                                                    <div className="w-full h-full flex flex-col items-center justify-center bg-white/5 text-muted-foreground gap-2">
                                                        <span className="text-6xl opacity-10 font-bold">{project.title.charAt(0)}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <UICardHeader className="pb-2">
                                                <UICardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">{project.title}</UICardTitle>
                                                <UICardDescription className="line-clamp-2 mt-2 text-muted-foreground/80 text-base">{project.description}</UICardDescription>
                                            </UICardHeader>

                                            <UICardContent className="grow pt-4">
                                                <div className="flex flex-wrap gap-2">
                                                    {project.techStack.slice(0, 4).map((tech) => (
                                                        <Badge key={tech} variant="outline" className="text-xs py-1 px-2 border-white/10 bg-white/5 text-white/70">
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                    {project.techStack.length > 4 && (
                                                        <span className="text-xs text-muted-foreground self-center px-2">+{project.techStack.length - 4}</span>
                                                    )}
                                                </div>
                                            </UICardContent>

                                            <UICardFooter className="flex gap-2 pt-2 border-t border-white/5 mt-auto">
                                                <Button variant="ghost" className="w-full justify-between hover:bg-white/5 group/btn h-12 rounded-xl" asChild>
                                                    <Link href={`/projects/${project._id || 'demo'}`}>
                                                        <span className="font-medium">View Project</span>
                                                        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1 text-primary" />
                                                    </Link>
                                                </Button>
                                            </UICardFooter>
                                        </UICard>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                )}

                {/* Show "View All Projects" button if in featuredOnly mode */}
                {featuredOnly && (
                    <div className="mt-16 text-center">
                        <Button size="lg" variant="outline" className="rounded-full px-8 border-white/10 hover:bg-white/5" asChild>
                            <Link href="/projects">
                                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                )}

                {isLoading && (
                    <div className="text-center text-muted-foreground animate-pulse p-10">
                        <p className="text-xl">Loading Projects...</p>
                    </div>
                )}

                {(!isLoading && projects.length === 0) && (
                    <div className="text-center p-12 border border-white/5 rounded-3xl bg-card/20 backdrop-blur-sm max-w-lg mx-auto mt-12">
                        <h3 className="text-xl font-bold mb-2">No projects found in database.</h3>
                        <p className="text-muted-foreground mb-6">Database might need seeding.</p>
                        <Button onClick={() => window.open('/api/seed', '_blank')} variant="outline">
                            Seed Database (Dev Only)
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
