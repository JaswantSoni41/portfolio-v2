"use client";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, ArrowLeft, Save, Trash2, Briefcase } from "lucide-react";

interface Experience {
    _id?: string;
    title: string;
    company: string;
    dates: string;
    description: string;
    skills?: string[];
    logoUrl?: string;
    createdAt?: Date;
}

const emptyExperience: Experience = {
    title: "",
    company: "",
    dates: "",
    description: "",
    skills: []
};

const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const startYear = 2010;
const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - startYear + 6 }, (_, i) => startYear + i);

// Define types for the exposed methods
export interface ExperienceManagerRef {
    handleCreate: () => void;
}

const ExperienceManager = forwardRef<ExperienceManagerRef>((_, ref) => {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [view, setView] = useState<"list" | "edit">("list");
    const [currentExperience, setCurrentExperience] = useState<Experience>(emptyExperience);
    const [loading, setLoading] = useState(true);

    useImperativeHandle(ref, () => ({
        handleCreate
    }));

    // Date Picker States
    const [startMonth, setStartMonth] = useState("Jan");
    const [startYearVal, setStartYearVal] = useState(currentYear);
    const [endMonth, setEndMonth] = useState("Jan");
    const [endYearVal, setEndYearVal] = useState(currentYear);
    const [isPresent, setIsPresent] = useState(false);

    useEffect(() => {
        fetchExperiences();
    }, []);

    useEffect(() => {
        if (view === "edit") {
            // Parse existing dates if available
            if (currentExperience.dates) {
                const parts = currentExperience.dates.split(" - ");
                if (parts.length >= 1) {
                    const startParts = parts[0].split(" ");
                    if (startParts.length === 2) {
                        setStartMonth(startParts[0]);
                        setStartYearVal(parseInt(startParts[1]) || currentYear);
                    }
                }

                if (parts.length >= 2) {
                    if (parts[1] === "Present") {
                        setIsPresent(true);
                    } else {
                        setIsPresent(false);
                        const endParts = parts[1].split(" ");
                        if (endParts.length === 2) {
                            setEndMonth(endParts[0]);
                            setEndYearVal(parseInt(endParts[1]) || currentYear);
                        }
                    }
                }
            } else {
                // Default values for new entry
                setStartMonth("Jan");
                setStartYearVal(currentYear);
                setEndMonth("Jan");
                setEndYearVal(currentYear);
                setIsPresent(true);
            }
        }
    }, [view, currentExperience]);

    // Construct the date string automatically whenever date components change
    useEffect(() => {
        if (view === "edit") {
            const startDate = `${startMonth} ${startYearVal}`;
            const endDate = isPresent ? "Present" : `${endMonth} ${endYearVal}`;
            const newDates = `${startDate} - ${endDate}`;

            // Only update if different to avoid infinite loop if we were depending on currentExperience
            if (currentExperience.dates !== newDates) {
                setCurrentExperience(prev => ({ ...prev, dates: newDates }));
            }
        }
    }, [startMonth, startYearVal, endMonth, endYearVal, isPresent]);

    const fetchExperiences = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/experience");
            if (res.ok) setExperiences(await res.json());
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (exp: Experience) => {
        setCurrentExperience(exp);
        setView("edit");
    };

    const handleCreate = () => {
        setCurrentExperience(emptyExperience);
        setView("edit");
    };

    const handleSave = async () => {
        const method = currentExperience._id ? "PUT" : "POST";
        const url = currentExperience._id ? `/api/experience/${currentExperience._id}` : "/api/experience";

        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(currentExperience)
        });

        if (res.ok) {
            setView("list");
            fetchExperiences();
        } else {
            alert("Failed to save experience");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this experience?")) return;
        await fetch(`/api/experience/${id}`, { method: "DELETE" });
        fetchExperiences();
    };

    if (view === "edit") {
        return (
            <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <div className="flex items-center gap-4 mb-6">
                    <Button variant="ghost" onClick={() => setView("list")} size="icon">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <h2 className="text-2xl font-bold">{currentExperience._id ? "Edit Experience" : "New Experience"}</h2>
                </div>

                <div className="space-y-4 max-w-xl mx-auto pb-20">
                    <div>
                        <label className="text-sm font-medium mb-1 block">Role Title</label>
                        <Input
                            value={currentExperience.title}
                            onChange={(e) => setCurrentExperience({ ...currentExperience, title: e.target.value })}
                            placeholder="Senior Developer"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-1 block">Company</label>
                        <Input
                            value={currentExperience.company}
                            onChange={(e) => setCurrentExperience({ ...currentExperience, company: e.target.value })}
                            placeholder="Company Name"
                        />
                    </div>

                    <div className="grid gap-4 p-4 border border-white/10 rounded-xl bg-white/5">
                        <label className="text-sm font-medium block">Duration</label>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs text-muted-foreground">Start Date</label>
                                <div className="flex gap-2">
                                    <select
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={startMonth}
                                        onChange={(e) => setStartMonth(e.target.value)}
                                    >
                                        {months.map(m => <option key={m} value={m}>{m}</option>)}
                                    </select>
                                    <select
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={startYearVal}
                                        onChange={(e) => setStartYearVal(parseInt(e.target.value))}
                                    >
                                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs text-muted-foreground">End Date</label>
                                <div className="flex gap-2">
                                    <select
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={endMonth}
                                        onChange={(e) => setEndMonth(e.target.value)}
                                        disabled={isPresent}
                                    >
                                        {months.map(m => <option key={m} value={m}>{m}</option>)}
                                    </select>
                                    <select
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={endYearVal}
                                        onChange={(e) => setEndYearVal(parseInt(e.target.value))}
                                        disabled={isPresent}
                                    >
                                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="present"
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                checked={isPresent}
                                onChange={(e) => setIsPresent(e.target.checked)}
                            />
                            <label
                                htmlFor="present"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                I currently work here
                            </label>
                        </div>

                        <div className="text-xs text-muted-foreground mt-2">
                            Generated: {currentExperience.dates}
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-1 block">Description</label>
                        <Textarea
                            value={currentExperience.description}
                            onChange={(e) => setCurrentExperience({ ...currentExperience, description: e.target.value })}
                            placeholder="Describe your role..."
                            rows={4}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-1 block">Skills (comma separated)</label>
                        <Input
                            value={currentExperience.skills?.join(", ") || ""}
                            onChange={(e) => setCurrentExperience({ ...currentExperience, skills: e.target.value.split(",").map(s => s.trim()) })}
                            placeholder="React, Agile, Leadership..."
                        />
                    </div>

                    <div className="pt-6 flex gap-4">
                        <Button onClick={handleSave} className="w-full md:w-auto" size="lg">
                            <Save className="w-4 h-4 mr-2" /> Save Experience
                        </Button>
                        {currentExperience._id && (
                            <Button variant="destructive" onClick={() => { handleDelete(currentExperience._id!); setView("list"); }} size="lg">
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
                <div className="text-center py-12 text-muted-foreground animate-pulse">Loading experiences...</div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {experiences.map((exp) => (
                        <div
                            key={exp._id}
                            onClick={() => handleEdit(exp)}
                            className="group relative p-5 border border-white/10 rounded-2xl bg-card/20 hover:bg-card/40 transition-all cursor-pointer hover:border-primary/30"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{exp.title}</h3>
                                <span className="text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded">{exp.dates}</span>
                            </div>
                            <p className="text-sm font-medium text-white/80 mb-2">{exp.company}</p>
                            <p className="text-sm text-muted-foreground line-clamp-2">{exp.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
});

export default ExperienceManager;
