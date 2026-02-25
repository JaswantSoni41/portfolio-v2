"use client";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, ArrowLeft, Save, Trash2, Tag, LayoutGrid } from "lucide-react";

interface SkillCategory {
    _id?: string;
    title: string;
    description: string;
    skills: string[];
    gradient: string;
    order?: number;
}

const emptySkillCategory: SkillCategory = {
    title: "",
    description: "",
    skills: [],
    gradient: "from-purple-500 to-indigo-500",
    order: 0
};

// Define types for the exposed methods
export interface SkillsManagerRef {
    handleCreate: () => void;
}

const SkillsManager = forwardRef<SkillsManagerRef>((_, ref) => {
    const [categories, setCategories] = useState<SkillCategory[]>([]);
    const [view, setView] = useState<"list" | "edit">("list");
    const [currentCategory, setCurrentCategory] = useState<SkillCategory>(emptySkillCategory);
    const [loading, setLoading] = useState(true);

    useImperativeHandle(ref, () => ({
        handleCreate
    }));

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/skills");
            if (res.ok) setCategories(await res.json());
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (category: SkillCategory) => {
        setCurrentCategory(category);
        setView("edit");
    };

    const handleCreate = () => {
        setCurrentCategory(emptySkillCategory);
        setView("edit");
    };

    const handleSave = async () => {
        const method = currentCategory._id ? "PUT" : "POST";
        const url = currentCategory._id ? `/api/skills/${currentCategory._id}` : "/api/skills";

        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(currentCategory)
        });

        if (res.ok) {
            setView("list");
            fetchSkills();
        } else {
            alert("Failed to save skill category");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this category?")) return;
        await fetch(`/api/skills/${id}`, { method: "DELETE" });
        fetchSkills();
    };

    if (view === "edit") {
        return (
            <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <div className="flex items-center gap-4 mb-6">
                    <Button variant="ghost" onClick={() => setView("list")} size="icon">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <h2 className="text-2xl font-bold">{currentCategory._id ? "Edit Category" : "New Category"}</h2>
                </div>

                <div className="space-y-4 max-w-xl mx-auto pb-20">
                    <div>
                        <label className="text-sm font-medium mb-1 block">Title</label>
                        <Input
                            value={currentCategory.title}
                            onChange={(e) => setCurrentCategory({ ...currentCategory, title: e.target.value })}
                            placeholder="Category Title"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-1 block">Description</label>
                        <Textarea
                            value={currentCategory.description}
                            onChange={(e) => setCurrentCategory({ ...currentCategory, description: e.target.value })}
                            placeholder="Brief description..."
                            rows={2}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-1 block">Skills (comma separated)</label>
                        <Input
                            value={currentCategory.skills.join(", ")}
                            onChange={(e) => setCurrentCategory({ ...currentCategory, skills: e.target.value.split(",").map(s => s.trim()) })}
                            placeholder="React, Next.js, etc."
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-1 block">Gradient Classes</label>
                        <Input
                            value={currentCategory.gradient}
                            onChange={(e) => setCurrentCategory({ ...currentCategory, gradient: e.target.value })}
                            placeholder="from-purple-500 to-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-1 block">Sort Order</label>
                        <Input
                            type="number"
                            value={currentCategory.order || 0}
                            onChange={(e) => setCurrentCategory({ ...currentCategory, order: parseInt(e.target.value) })}
                            placeholder="0"
                        />
                    </div>

                    <div className="pt-6 flex gap-4">
                        <Button onClick={handleSave} className="w-full md:w-auto" size="lg">
                            <Save className="w-4 h-4 mr-2" /> Save Category
                        </Button>
                        {currentCategory._id && (
                            <Button variant="destructive" onClick={() => { handleDelete(currentCategory._id!); setView("list"); }} size="lg">
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
                <div className="text-center py-12 text-muted-foreground animate-pulse">Loading skills...</div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {categories.map((cat) => (
                        <div
                            key={cat._id}
                            onClick={() => handleEdit(cat)}
                            className="group relative p-5 border border-white/10 rounded-2xl bg-card/20 hover:bg-card/40 transition-all cursor-pointer hover:border-primary/30"
                        >
                            <div className={`h-2 w-full mb-4 rounded bg-linear-to-r ${cat.gradient}`} />
                            <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{cat.title}</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {cat.skills.slice(0, 5).map(skill => (
                                    <span key={skill} className="text-xs bg-white/5 px-2 py-1 rounded-full text-muted-foreground">
                                        {skill}
                                    </span>
                                ))}
                                {cat.skills.length > 5 && <span className="text-xs text-muted-foreground">+{cat.skills.length - 5}</span>}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
});

export default SkillsManager;
