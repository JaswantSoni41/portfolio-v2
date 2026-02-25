import connectDB from "@/lib/db";
import ProjectModel from "@/models/Project";
import { Project } from "@/types/project";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github, Calendar, Layers } from "lucide-react";
import { Metadata } from "next";

// Fetch data directly in server component
async function getProject(id: string): Promise<Project | null> {
    await connectDB();
    // Validate ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) return null;

    try {
        const project = await ProjectModel.findById(id).lean();
        if (!project) return null;
        // Convert _id and dates to string for serialization
        return JSON.parse(JSON.stringify(project));
    } catch (e) {
        return null;
    }
}

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const project = await getProject(id);
    if (!project) return { title: "Project Not Found" };
    return {
        title: `${project.title} | Jaswant Soni`,
        description: project.description,
    };
}

export default async function ProjectPage({ params }: Props) {
    const { id } = await params;
    const project = await getProject(id);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background py-20 px-4 md:px-6 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto max-w-4xl relative z-10">
                <Button variant="ghost" asChild className="mb-8 hover:bg-white/10">
                    <Link href="/#projects" className="flex items-center gap-2">
                        <ArrowLeft size={20} /> Back to Projects
                    </Link>
                </Button>

                <div className="grid gap-8">
                    {/* Header */}
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-2 items-center">
                            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                {project.title}
                            </h1>
                            {project.featured && (
                                <Badge className="bg-primary/20 text-primary border-none">Featured</Badge>
                            )}
                        </div>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            {project.description}
                        </p>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-6 py-6 border-y border-white/10">
                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-muted-foreground flex items-center gap-2">
                                <Layers size={16} /> Tech Stack
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech) => (
                                    <Badge key={tech} variant="secondary" className="bg-secondary/50 border-white/5">
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        {project.createdAt && (
                            <div className="flex flex-col gap-2">
                                <span className="text-sm text-muted-foreground flex items-center gap-2">
                                    <Calendar size={16} /> Year
                                </span>
                                <span className="font-medium text-foreground">
                                    {new Date(project.createdAt).getFullYear()}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4">
                        {project.liveUrl && (
                            <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25" asChild>
                                <Link href={project.liveUrl} target="_blank">
                                    <ExternalLink size={18} /> Visit Live Site
                                </Link>
                            </Button>
                        )}
                        {project.githubUrl && (
                            <Button size="lg" variant="outline" className="gap-2 border-white/20 hover:bg-white/10" asChild>
                                <Link href={project.githubUrl} target="_blank">
                                    <Github size={18} /> View Code
                                </Link>
                            </Button>
                        )}
                    </div>

                    {/* Media / Visuals */}
                    <div className="space-y-6 mt-8">
                        {project.images && project.images.length > 0 ? (
                            <div className="grid gap-4">
                                {project.images.map((img, idx) => (
                                    <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-muted/20">
                                        {/* Using Next/Image if configured, else standard img */}
                                        <img src={img} alt={`${project.title} screenshot ${idx + 1}`} className="object-cover w-full h-full hover:scale-105 transition-transform duration-700" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="aspect-video rounded-xl border border-white/10 bg-white/5 flex flex-col items-center justify-center text-muted-foreground">
                                <p>No images available for this project yet.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </main>
    );
}
