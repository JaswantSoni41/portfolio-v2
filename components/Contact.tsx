"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import SectionHeader from "./SectionHeader";

export default function Contact() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("submitting");

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setStatus("success");
    }

    return (
        <section id="contact" className="py-32 bg-background relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container px-4 md:px-6 max-w-2xl mx-auto relative z-10">
                <SectionHeader
                    title="Get in Touch"
                    description="Have a project in mind or want to discuss the latest tech? Send me a message!"
                    className="mb-12"
                />

                <motion.form
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    onSubmit={handleSubmit}
                    className="space-y-6 bg-card/20 backdrop-blur-md p-8 rounded-3xl border border-white/5 shadow-2xl"
                >
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-white/80">Name</label>
                            <Input
                                id="name"
                                placeholder="John Doe"
                                required
                                className="bg-white/5 border-white/10 focus:border-primary/50 text-white placeholder:text-muted-foreground/50 h-12 rounded-xl"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-white/80">Email</label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                required
                                className="bg-white/5 border-white/10 focus:border-primary/50 text-white placeholder:text-muted-foreground/50 h-12 rounded-xl"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-white/80">Message</label>
                        <Textarea
                            id="message"
                            placeholder="Your message..."
                            className="min-h-[150px] bg-white/5 border-white/10 focus:border-primary/50 text-white placeholder:text-muted-foreground/50 resize-none rounded-xl"
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-12 text-lg font-medium bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all active:scale-95 rounded-xl"
                        disabled={status === "submitting"}
                    >
                        {status === "submitting" ? (
                            <span className="flex items-center gap-2">
                                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                Sending...
                            </span>
                        ) : "Send Message"}
                    </Button>

                    {status === "success" && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-green-400 text-center font-medium bg-green-400/10 py-2 rounded-lg border border-green-400/20"
                        >
                            Message sent successfully!
                        </motion.p>
                    )}
                </motion.form>
            </div>
        </section>
    );
}
