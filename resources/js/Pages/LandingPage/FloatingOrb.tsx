import React from "react";
import { cn } from "@/lib/utils";

interface FloatingOrbProps {
    className?: string;
    delay?: number;
}

export function FloatingOrb({ className = "", delay = 0 }: FloatingOrbProps) {
    const style: React.CSSProperties = {
        animationDelay: `${delay}s`,
        animationDuration: "6s",
    };

    return (
        <div
            className={cn(
                "absolute rounded-full blur-3xl opacity-15 dark:opacity-10 animate-pulse pointer-events-none",
                className,
            )}
            style={style}
        />
    );
}
