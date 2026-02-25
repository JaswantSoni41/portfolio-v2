"use client";
import { useState, useRef } from "react"; // Added useRef
import ProjectsManager, { ProjectsManagerRef } from "@/components/admin/ProjectsManager";
import SkillsManager, { SkillsManagerRef } from "@/components/admin/SkillsManager";
import ExperienceManager, { ExperienceManagerRef } from "@/components/admin/ExperienceManager";
import ResumeManager from "@/components/admin/ResumeManager";
import { Briefcase, Code, FileText, LayoutDashboard, Menu, LogOut, X, User, ChevronRight, Plus } from "lucide-react"; // Added Plus
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

function LogoutButton() {
    const router = useRouter();
    const handleLogout = async () => {
        // Simple client-side logout (clearing cookie via API call would be better)
        document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        router.push("/login");
    };

    return (
        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 hover:text-destructive w-full transition-colors">
            <LogOut className="w-4 h-4" />
            Logout
        </button>
    );
}

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<"projects" | "skills" | "experience" | "resume">("projects");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Ref to access child methods
    const managerRef = useRef<ProjectsManagerRef | SkillsManagerRef | ExperienceManagerRef | null>(null);

    const tabs = [
        { id: "projects", label: "Projects", icon: LayoutDashboard },
        { id: "skills", label: "Skills", icon: Code },
        { id: "experience", label: "Experience", icon: Briefcase },
        { id: "resume", label: "Resume", icon: FileText },
    ];

    const handleAddItem = () => {
        if (managerRef.current) {
            managerRef.current.handleCreate();
        }
    };

    return (
        <div className="min-h-screen md:min-h-0 md:h-dvh bg-background text-foreground flex flex-col md:flex-row overflow-hidden font-sans">
            {/* Sidebar / Mobile Header */}
            <div className={`
                fixed inset-y-0 left-0 z-50 w-64 transform bg-card/50 backdrop-blur-xl border-r border-white/5 transition-transform duration-300 md:relative md:translate-x-0
                ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            `}>
                <div className="flex h-full flex-col">
                    {/* Header Logo Area */}
                    <div className="p-6 border-b border-white/5">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-linear-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold">
                                A
                            </div>
                            <h1 className="text-xl font-bold tracking-tight">Admin<span className="text-primary">Panel</span></h1>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 p-4 overflow-y-auto custom-scrollbar">
                        <div className="mb-4 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Manage
                        </div>
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => { setActiveTab(tab.id as any); setMobileMenuOpen(false); }}
                                className={`group relative flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 overflow-hidden ${activeTab === tab.id
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTabIndicator"
                                        className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    />
                                )}
                                <tab.icon className={`w-5 h-5 transition-transform duration-200 ${activeTab === tab.id ? "scale-110" : "group-hover:scale-110"}`} />
                                <span className="flex-1 text-left">{tab.label}</span>
                                {activeTab === tab.id && <ChevronRight className="w-4 h-4 opacity-50" />}
                            </button>
                        ))}
                    </nav>

                    {/* Footer Actions */}
                    <div className="p-4 border-t border-white/5 space-y-2 bg-black/20">
                        <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-white transition-colors w-full">
                            <User className="w-4 h-4" />
                            View Site
                        </Link>
                        <LogoutButton />
                    </div>
                </div>
            </div>

            {/* Mobile Toggle & Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden animate-in fade-in"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            <div className="md:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between p-4 bg-background/80 backdrop-blur-md border-b border-white/5">
                <h1 className="text-lg font-bold">Admin Panel</h1>
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
            </div>


            {/* Main Content Area */}
            <main className="flex-1 relative overflow-hidden flex flex-col pt-16 md:pt-0 bg-neutral-950">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />

                <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
                    <div className="max-w-6xl mx-auto min-h-full">
                        <header className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-1 capitalize">
                                    {activeTab} Management
                                </h2>
                                <p className="text-muted-foreground text-sm">
                                    Manage your portfolio's {activeTab} content.
                                </p>
                            </div>

                            {activeTab !== "resume" && (
                                <Button onClick={handleAddItem} size="lg" className="w-full md:w-auto shadow-lg shadow-primary/20">
                                    <Plus className="w-4 h-4 mr-2" /> Add New
                                </Button>
                            )}
                        </header>

                        <div className="bg-card/30 backdrop-blur-md border border-white/5 rounded-3xl p-6 shadow-2xl min-h-[500px] relative overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="h-full"
                                >
                                    {activeTab === "projects" && <ProjectsManager ref={managerRef as any} />}
                                    {activeTab === "skills" && <SkillsManager ref={managerRef as any} />}
                                    {activeTab === "experience" && <ExperienceManager ref={managerRef as any} />}
                                    {activeTab === "resume" && (
                                        <div className="max-w-xl mx-auto py-12">
                                            <ResumeManager />
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
