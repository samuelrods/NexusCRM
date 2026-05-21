import React from "react";
import { Link } from "@inertiajs/react";
import { Check } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Calculator } from "./Calculator";

export function PricingHeader() {
    return (
        <div className="text-center mb-12 select-none">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-wider uppercase mb-6">
                Pricing
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
                Free. No strings attached.
            </h2>
            <p className="text-muted-foreground text-sm font-semibold max-w-xl mx-auto">
                Nexus is open-source. Deploy it yourself and get every feature
                at zero cost.
            </p>
        </div>
    );
}

export function PricingBenefits() {
    const benefits = [
        "Unlimited contacts & companies",
        "Leads, deals & activity tracking",
        "Multi-organization support",
        "Custom roles & permissions",
        "Executive dashboards & charts",
        "Full-text search with Meilisearch",
    ];
    return (
        <ul className="space-y-3 mb-6">
            {benefits.map((b, i) => (
                <li key={i} className="flex items-center gap-2.5">
                    <div className="h-4 w-4 bg-blue-500/10 rounded-full flex items-center justify-center shrink-0">
                        <Check className="h-2.5 w-2.5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-muted-foreground font-semibold text-xs">
                        {b}
                    </span>
                </li>
            ))}
        </ul>
    );
}

export function PricingCard() {
    return (
        <Card className="max-w-md w-full border border-border shadow-md bg-card overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
            <CardHeader className="text-center pt-8 pb-4">
                <CardTitle className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2">
                    Self-hosted
                </CardTitle>
                <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-extrabold text-foreground">
                        $0
                    </span>
                    <span className="text-xs text-muted-foreground font-semibold">
                        / forever
                    </span>
                </div>
            </CardHeader>
            <CardContent className="p-6 pt-2">
                <PricingBenefits />
                <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 py-5 h-auto text-sm font-bold shadow-sm transition-all duration-200"
                    asChild
                >
                    <Link href="/register">Start building</Link>
                </Button>
            </CardContent>
        </Card>
    );
}

export function Pricing() {
    return (
        <section
            id="pricing"
            className="py-24 bg-background border-t border-border"
        >
            <div className="max-w-screen-xl mx-auto px-4 flex flex-col items-center">
                <PricingHeader />
                <PricingCard />
                <Calculator />
            </div>
        </section>
    );
}
