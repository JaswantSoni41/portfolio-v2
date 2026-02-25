"use client";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, ArrowLeft, Save, Trash2 } from "lucide-react";

interface Project {
    _id?: string;
    title: string;
    description: string;
    techStack: string[];
    liveUrl?: string;
    githubUrl?: string;
    videoUrl?: string;
    images?: string[];
    featured: boolean;
}

const emptyProject: Project = {
    title: "",
    description: "",
    techStack: [],
    featured: false
};

// Define types for the exposed methods
export interface ProjectsManagerRef {
    handleCreate: () => void;
}

const ProjectsManager = forwardRef<ProjectsManagerRef>((_, ref) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [view, setView] = useState<"list" | "edit">("list");
    const [currentProject, setCurrentProject] = useState<Project>(emptyProject);
    const [loading, setLoading] = useState(true);

    useImperativeHandle(ref, () => ({
        handleCreate
    }));

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/projects");
            if (res.ok) setProjects(await res.json());
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (project: Project) => {
        setCurrentProject(project);
        setView("edit");
    };

    const handleCreate = () => {
        setCurrentProject(emptyProject);
        setView("edit");
    };

    const handleSave = async () => {
        const method = currentProject._id ? "PUT" : "POST";
        const url = currentProject._id ? `/api/projects/${currentProject._id}` : "/api/projects";

        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(currentProject)
        });

        if (res.ok) {
            setView("list");
            fetchProjects();
        } else {
            alert("Failed to save project");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;
        await fetch(`/api/projects/${id}`, { method: "DELETE" });
        fetchProjects();
    };

    if (view === "edit") {
        return (
            <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <div className="flex items-center gap-4 mb-6">
                    <Button variant="ghost" onClick={() => setView("list")} size="icon">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <h2 className="text-2xl font-bold">{currentProject._id ? "Edit Project" : "New Project"}</h2>
                </div>

                <div className="space-y-4 max-w-xl mx-auto pb-20">
                    <div>
                        <label className="text-sm font-medium mb-1 block">Title</label>
                        <Input
                            value={currentProject.title}
                            onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                            placeholder="Project Title"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-1 block">Description</label>
                        <Textarea
                            value={currentProject.description}
                            onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                            placeholder="Project Description"
                            rows={4}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-1 block">Tech Stack (comma separated)</label>
                        <Input
                            value={currentProject.techStack.join(", ")}
                            onChange={(e) => setCurrentProject({ ...currentProject, techStack: e.target.value.split(",").map(s => s.trim()) })}
                            placeholder="React, Next.js, Tailwind..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium mb-1 block">Live URL</label>
                            <Input
                                value={currentProject.liveUrl || ""}
                                onChange={(e) => setCurrentProject({ ...currentProject, liveUrl: e.target.value })}
                                placeholder="https://example.com"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-1 block">GitHub URL</label>
                            <Input
                                value={currentProject.githubUrl || ""}
                                onChange={(e) => setCurrentProject({ ...currentProject, githubUrl: e.target.value })}
                                placeholder="https://github.com/user/repo"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-1 block">Video URL (Embed/Source)</label>
                        <Input
                            value={currentProject.videoUrl || ""}
                            onChange={(e) => setCurrentProject({ ...currentProject, videoUrl: e.target.value })}
                            placeholder="https://www.youtube.com/embed/..."
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-1 block">Image URL (Main)</label>
                        <Input
                            value={currentProject.images?.[0] || ""}
                            onChange={(e) => setCurrentProject({ ...currentProject, images: [e.target.value] })} // Simplified to 1 image for now
                            placeholder="/assets/project.jpg"
                        />
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                        <input
                            type="checkbox"
                            id="featured"
                            checked={currentProject.featured}
                            onChange={(e) => setCurrentProject({ ...currentProject, featured: e.target.checked })}
                            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="featured" className="text-sm font-medium">Featured Project (Show on Home)</label>
                    </div>

                    <div className="pt-6 flex gap-4">
                        <Button onClick={handleSave} className="w-full md:w-auto" size="lg">
                            <Save className="w-4 h-4 mr-2" /> Save Project
                        </Button>
                        {currentProject._id && (
                            <Button variant="destructive" onClick={() => { handleDelete(currentProject._id!); setView("list"); }} size="lg">
                                <Trash2 className="w-4 h-4 mr-2" /> Delete
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {loading ? (
                <div className="text-center py-12 text-muted-foreground animate-pulse">Loading projects...</div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <div
                            key={project._id}
                            onClick={() => handleEdit(project)}
                            className="group relative p-5 border border-white/10 rounded-2xl bg-card/20 hover:bg-card/40 transition-all cursor-pointer hover:border-primary/30"
                        >
                            <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
                                    <ArrowLeft className="w-4 h-4 rotate-180" />
                                </Button>
                            </div>

                            <div className="aspect-video bg-black/20 rounded-lg mb-4 overflow-hidden relative">
                                {project.images?.[0] ? (
                                    <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-4xl font-bold opacity-10">{project.title.charAt(0)}</div>
                                )}
                                {project.featured && <span className="absolute top-2 left-2 bg-primary text-white text-[10px] px-2 py-0.5 rounded-full">Featured</span>}
                            </div>

                            <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{project.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                        </div>
                    ))}
                    {projects.length === 0 && (
                        <div className="col-span-full text-center py-12 text-muted-foreground border border-dashed border-white/10 rounded-xl">
                            No projects found. Create one!
                        </div>
                    )}
                </div>
            )}
        </div>
    );
});

export default ProjectsManager;
