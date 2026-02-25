"use client";

import Projects from "@/components/Projects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AllProjectsPage() {
    return (
        <main className="flex min-h-screen flex-col">
            <Header />
            <div className="pt-16 md:pt-20">
                <Projects featuredOnly={false} />
            </div>
            <Footer />
        </main>
    );
}
