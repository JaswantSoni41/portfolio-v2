"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";

export default function LoginPage() {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password })
            });

            if (res.ok) {
                router.push("/admin");
                router.refresh(); // Refresh to ensure middleware lets us through
            } else {
                const data = await res.json();
                setError(data.error || "Incorrect password");
            }
        } catch (err) {
            setError("Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="w-full max-w-sm space-y-6 rounded-2xl border border-white/5 bg-card/10 p-8 backdrop-blur-xl shadow-2xl">
                <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4 animate-pulse">
                        <Lock className="h-8 w-8 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">Admin Access</h1>
                    <p className="text-sm text-muted-foreground mt-2">Enter credentials to proceed</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-background/20 border-white/10 focus:border-primary/50 text-center tracking-widest"
                        />
                    </div>

                    {error && <p className="text-sm text-destructive font-medium text-center">{error}</p>}

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Authenticating..." : "Login"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
