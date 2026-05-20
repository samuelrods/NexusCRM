import React from "react";
import { Link } from "@inertiajs/react";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { FloatingOrb } from "./FloatingOrb";
import { InteractiveDemo } from "./InteractiveDemo";

interface UserType {
    full_name: string;
}

export function HeroBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            <FloatingOrb
                className="w-96 h-96 bg-blue-500/10 -top-48 -left-48"
                delay={0}
            />
            <FloatingOrb
                className="w-80 h-80 bg-violet-500/10 top-1/3 -right-40"
                delay={1.5}
            />
            <FloatingOrb
                className="w-64 h-64 bg-cyan-500/10 bottom-0 left-1/3"
                delay={3}
            />
        </div>
    );
}

export function HeroBadge() {
    return (
        <div
            className="flex justify-center mb-8 select-none opacity-0 translate-y-4 animate-fade-in-up"
            style={{ animationDelay: "100ms" }}
        >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                Open-source CRM for modern teams
            </div>
        </div>
    );
}

export function HeroTitle() {
    return (
        <>
            <h1
                className="mb-6 text-4xl font-extrabold font-display tracking-tight leading-[1.15] text-foreground md:text-6xl lg:text-7xl text-center max-w-4xl mx-auto opacity-0 translate-y-4 animate-fade-in-up"
                style={{ animationDelay: "250ms" }}
            >
                Your entire sales
                <br />
                pipeline in{" "}
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                    one place
                </span>
            </h1>
            <p
                className="mb-12 text-sm font-semibold text-muted-foreground lg:text-base text-center max-w-2xl mx-auto leading-relaxed opacity-0 translate-y-4 animate-fade-in-up"
                style={{ animationDelay: "400ms" }}
            >
                Manage contacts, track deals, log activities, and collaborate
                across organizations — all with role-based permissions and
                real-time dashboards.
            </p>
        </>
    );
}

export function AuthenticatedCTA() {
    return (
        <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 h-auto text-base shadow-sm group"
            asChild
        >
            <Link href="/dashboard">
                Go to Dashboard
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
        </Button>
    );
}

export function UnauthenticatedCTA() {
    return (
        <>
            <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 h-auto text-base shadow-sm group"
                asChild
            >
                <Link href="/register">
                    Get started free
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
            </Button>
            <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 h-auto text-base border-border hover:bg-accent group"
                asChild
            >
                <a href="#features">
                    See features
                    <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </a>
            </Button>
        </>
    );
}

export function HeroCTAs({ user }: { user: UserType | null }) {
    return (
        <div
            className="flex flex-col sm:flex-row justify-center gap-4 opacity-0 translate-y-4 animate-fade-in-up"
            style={{ animationDelay: "550ms" }}
        >
            {user ? <AuthenticatedCTA /> : <UnauthenticatedCTA />}
        </div>
    );
}

export function HeroStats() {
    const stats = [
        { label: "Resources", value: "6+" },
        { label: "Role Permissions", value: "Custom" },
        { label: "Multi-org", value: "Built-in" },
        { label: "Cost", value: "Free" },
    ];
    return (
        <div
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto select-none opacity-0 translate-y-4 animate-fade-in-up"
            style={{ animationDelay: "700ms" }}
        >
            {stats.map((stat, i) => (
                <div
                    key={i}
                    className="text-center p-4 rounded-xl bg-card border border-border shadow-sm hover:border-border/80 transition-colors"
                >
                    <div className="text-xl font-extrabold text-foreground">
                        {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 font-bold">
                        {stat.label}
                    </div>
                </div>
            ))}
        </div>
    );
}

export function Hero({ user }: { user: UserType | null }) {
    return (
        <section
            id="home"
            className="relative overflow-hidden bg-background py-20 px-4 mx-auto lg:py-28"
        >
            <HeroBackground />
            <div className="relative max-w-screen-xl mx-auto z-10">
                <HeroBadge />
                <HeroTitle />
                <HeroCTAs user={user} />
                <HeroStats />
                <div
                    className="opacity-0 translate-y-4 animate-fade-in-up"
                    style={{ animationDelay: "850ms" }}
                >
                    <InteractiveDemo />
                </div>
            </div>
        </section>
    );
}
