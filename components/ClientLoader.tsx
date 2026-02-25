"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import TechLoader from "./TechLoader";

export default function ClientLoader({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        // Scroll logic: respect hash if present (for sections), otherwise top
        if (!isLoading) {
            const hash = window.location.hash;
            if (hash) {
                // Small timeout to ensure DOM is ready
                setTimeout(() => {
                    const id = hash.replace("#", "");
                    const element = document.getElementById(id);
                    if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                    }
                }, 100);
            } else {
                window.scrollTo(0, 0);
            }
        }
    }, [pathname, isLoading]);

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && <TechLoader onComplete={() => setIsLoading(false)} />}
            </AnimatePresence>
            {!isLoading && children}
        </>
    );
}
