"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export default function ResumeManager() {
    const [uploading, setUploading] = useState(false);
    const { toast } = useToast();

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", e.target.files[0]);

        try {
            const res = await fetch("/api/upload/resume", {
                method: "POST",
                body: formData
            });
            if (!res.ok) throw new Error("Upload failed");
            toast({
                title: "Success",
                description: "Resume updated successfully! (Jaswant_Soni.pdf)",
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to upload resume.",
                variant: "destructive",
            });
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="p-6 border border-white/10 rounded-xl bg-card/20">
            <h2 className="text-xl font-bold mb-4">Resume Manager</h2>
            <div className="flex items-center gap-4">
                <Button variant="outline" className="relative cursor-pointer" disabled={uploading}>
                    {uploading ? "Uploading..." : "Upload New Resume (PDF)"}
                    <input
                        type="file"
                        accept=".pdf"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleUpload}
                        disabled={uploading}
                    />
                </Button>
                <p className="text-sm text-muted-foreground">
                    Current: <a href="/pdfs/Jaswant_Soni.pdf" target="_blank" className="underline hover:text-primary">Jaswant_Soni.pdf</a>
                </p>
            </div>
        </div>
    );
}
