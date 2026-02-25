"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="py-12 border-t border-white/5 bg-background relative z-10 text-muted-foreground">
            <div className="container px-4 md:px-6 flex flex-col items-center justify-between gap-6 md:flex-row">
                <p className="text-sm text-center md:text-left text-muted-foreground/60">
                    © {new Date().getFullYear()} Jaswant Soni. Built with Next.js & Tailwind.
                </p>
                <div className="flex gap-6">
                    <Link href="https://github.com/JaswantSoni41" target="_blank" className="hover:text-primary transition-colors hover:scale-110 transform duration-200">
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                    </Link>
                    <Link href="https://linkedin.com/in/jaswant-soni" target="_blank" className="hover:text-primary transition-colors hover:scale-110 transform duration-200">
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                    </Link>
                    <Link href="mailto:jaswantsoni41@gmail.com" className="hover:text-primary transition-colors hover:scale-110 transform duration-200">
                        <Mail className="h-5 w-5" />
                        <span className="sr-only">Email</span>
                    </Link>
                </div>
            </div>
        </footer>
    );
}
