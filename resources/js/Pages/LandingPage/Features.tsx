import React from "react";
import {
    Users,
    Building2,
    UserPlus,
    Target,
    Calendar,
    Shield,
    BarChart3,
    Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureItem {
    title: string;
    desc: string;
    icon: React.ComponentType<{ className?: string }>;
    colorClass: string;
}

export function FeatureHeader() {
    return (
        <div className="text-center mb-16 select-none">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-wider uppercase mb-6">
                Features
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
                Everything you need to close more deals
            </h2>
            <p className="text-muted-foreground text-sm font-semibold max-w-2xl mx-auto">
                From first contact to closed deal, Nexus gives your team full
                visibility into every step of the sales process.
            </p>
        </div>
    );
}

export function FeatureCard({ feature }: { feature: FeatureItem }) {
    const Icon = feature.icon;
    return (
        <div className="group relative p-6 bg-card rounded-2xl border border-border transition-all duration-300 hover:shadow-md hover:border-blue-500/30 hover:-translate-y-0.5 select-none">
            <div
                className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-105",
                    feature.colorClass,
                )}
            >
                <Icon className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-foreground mb-1.5">
                {feature.title}
            </h3>
            <p className="text-muted-foreground text-xs font-semibold leading-relaxed">
                {feature.desc}
            </p>
        </div>
    );
}

export function Features() {
    const list: FeatureItem[] = [
        {
            title: "Contact Management",
            desc: "Full contact records with organizational affiliations, quick search, and detailed profiles.",
            icon: Users,
            colorClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
        },
        {
            title: "Company Tracking",
            desc: "Track companies with addresses, industries, and relationships to contacts and deals.",
            icon: Building2,
            colorClass: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
        },
        {
            title: "Lead Pipeline",
            desc: "Capture leads from multiple sources and track their journey all the way to conversion.",
            icon: UserPlus,
            colorClass:
                "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        },
        {
            title: "Deal Management",
            desc: "Manage deal values, statuses, and close dates with organization-wide currency settings.",
            icon: Target,
            colorClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
        },
        {
            title: "Activity Logging",
            desc: "Log calls, emails, and meetings tied to contacts and leads. Full audit trail included.",
            icon: Calendar,
            colorClass: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
        },
        {
            title: "Role-Based Access",
            desc: "Granular permissions with custom roles per organization. Control who can view, create, or manage resources.",
            icon: Shield,
            colorClass: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
        },
        {
            title: "Executive Dashboards",
            desc: "Real-time stats, revenue charts, deal distributions, and activity breakdowns at a glance.",
            icon: BarChart3,
            colorClass: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
        },
        {
            title: "Instant Search",
            desc: "Find any contact, lead, deal, or company in milliseconds with Meilisearch-powered search.",
            icon: Search,
            colorClass: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
        },
    ];

    return (
        <section
            id="features"
            className="py-24 bg-muted/20 border-y border-border"
        >
            <div className="max-w-screen-xl mx-auto px-4">
                <FeatureHeader />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {list.map((f, idx) => (
                        <FeatureCard key={idx} feature={f} />
                    ))}
                </div>
            </div>
        </section>
    );
}
