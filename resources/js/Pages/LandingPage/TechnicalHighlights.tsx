import React from "react";

interface HighlightItem {
    title: string;
    category: string;
    tech: string;
    description: string;
}

export function HighlightsHeader() {
    return (
        <div className="text-center mb-16 select-none">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-wider uppercase mb-6">
                Technical Specs
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
                Under the hood of Nexus
            </h2>
            <p className="text-muted-foreground text-sm font-semibold max-w-xl mx-auto">
                A modern full-stack CRM built with robust design patterns, clean
                separation of concerns, and optimized performance.
            </p>
        </div>
    );
}

export function HighlightCard({ item }: { item: HighlightItem }) {
    return (
        <div className="p-6 bg-card border border-border rounded-2xl shadow-sm hover:border-border/80 transition-colors select-none flex flex-col justify-between h-52">
            <div>
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                    {item.category}
                </span>
                <h3 className="text-base font-bold text-foreground mt-1 mb-2">
                    {item.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed font-semibold">
                    {item.description}
                </p>
            </div>
            <div className="flex items-center mt-4 pt-4 border-t border-border/60">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-muted text-muted-foreground">
                    {item.tech}
                </span>
            </div>
        </div>
    );
}

export function TechnicalHighlights() {
    const list: HighlightItem[] = [
        {
            title: "Inertia.js Hybrid Stack",
            category: "Architecture",
            tech: "Laravel + React + TS",
            description:
                "Combines Laravel's speed with React's reactivity. Page transitions and server-state sync occur smoothly via Inertia without traditional REST APIs.",
        },
        {
            title: "Granular Access Control",
            category: "Security",
            tech: "MySQL + Laravel Policies",
            description:
                "Implements organization-isolated database logic and custom RBAC permissions, restricting user operations dynamically across multiple organizations.",
        },
        {
            title: "Instant Search Index",
            category: "Integration",
            tech: "Meilisearch + Scout",
            description:
                "Leverages Laravel Scout with Meilisearch. Syncs model updates instantly to search indexes, enabling sub-millisecond full-text queries.",
        },
    ];
    return (
        <section
            id="tech-highlights"
            className="py-24 bg-background border-t border-border"
        >
            <div className="max-w-screen-xl mx-auto px-4">
                <HighlightsHeader />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {list.map((item, idx) => (
                        <HighlightCard key={idx} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
}
