import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Deal {
    id: string;
    name: string;
    value: number;
    stage: "leads" | "in_progress" | "closed_won";
    company: string;
}

interface ConfettiParticle {
    id: number;
    color: string;
    left: string;
    delay: string;
}

const INITIAL_DEALS: Deal[] = [
    {
        id: "1",
        name: "Enterprise CRM Migration",
        value: 18000,
        stage: "leads",
        company: "Acme Corp",
    },
    {
        id: "2",
        name: "Strategic Cloud Consulting",
        value: 45000,
        stage: "in_progress",
        company: "Stark Industries",
    },
    {
        id: "3",
        name: "Security Compliance Audit",
        value: 75000,
        stage: "in_progress",
        company: "Wayne Enterprises",
    },
];

function generateConfetti(): ConfettiParticle[] {
    const colors = [
        "bg-blue-500",
        "bg-green-500",
        "bg-yellow-500",
        "bg-purple-500",
        "bg-red-500",
        "bg-cyan-500",
    ];
    return Array.from({ length: 15 }, (_, i) => ({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        left: `${10 + Math.random() * 80}%`,
        delay: `${Math.random() * 0.5}s`,
    }));
}

export function ConfettiRain({ particles }: { particles: ConfettiParticle[] }) {
    return (
        <>
            <style>{`@keyframes confetti-fall { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(-400px) rotate(360deg); opacity: 0; } }`}</style>
            {particles.map((p) => (
                <div
                    key={p.id}
                    className={cn("w-2.5 h-2.5 rounded-full absolute", p.color)}
                    style={{
                        bottom: "0%",
                        left: p.left,
                        animation: "confetti-fall 2s ease-out forwards",
                        animationDelay: p.delay,
                    }}
                />
            ))}
        </>
    );
}

export function DealCardButtons({
    deal,
    onMove,
}: {
    deal: Deal;
    onMove: (id: string, dir: "left" | "right") => void;
}) {
    const handleMove = (e: React.MouseEvent, dir: "left" | "right") => {
        e.stopPropagation();
        onMove(deal.id, dir);
    };
    return (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {deal.stage !== "leads" && (
                <button
                    onClick={(e) => handleMove(e, "left")}
                    className="p-1 bg-muted hover:bg-accent border border-border rounded-md text-foreground transition-colors"
                >
                    <ChevronLeft className="w-3.5 h-3.5" />
                </button>
            )}
            {deal.stage !== "closed_won" && (
                <button
                    onClick={(e) => handleMove(e, "right")}
                    className="p-1 bg-muted hover:bg-accent border border-border rounded-md text-foreground transition-colors"
                >
                    <ChevronRight className="w-3.5 h-3.5" />
                </button>
            )}
        </div>
    );
}

export function DealCard({
    deal,
    onMove,
    onClick,
}: {
    deal: Deal;
    onMove: (id: string, dir: "left" | "right") => void;
    onClick: (deal: Deal) => void;
}) {
    const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(deal.value);
    return (
        <div
            onClick={() => onClick(deal)}
            className="p-4 bg-card border border-border rounded-xl shadow-sm hover:shadow-md hover:border-blue-500/30 transition-all duration-200 cursor-pointer group flex flex-col justify-between h-28 select-none"
        >
            <div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    {deal.company}
                </div>
                <h4 className="text-sm font-bold text-foreground mt-0.5 truncate">
                    {deal.name}
                </h4>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400">
                    {formatted}
                </span>
                <DealCardButtons deal={deal} onMove={onMove} />
            </div>
        </div>
    );
}

export function KanbanColumn({
    title,
    stage,
    deals,
    onMove,
    onClick,
}: {
    title: string;
    stage: "leads" | "in_progress" | "closed_won";
    deals: Deal[];
    onMove: (id: string, dir: "left" | "right") => void;
    onClick: (deal: Deal) => void;
}) {
    const stageDeals = deals.filter((d) => d.stage === stage);
    const sum = stageDeals.reduce((acc, d) => acc + d.value, 0);
    const formattedSum = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(sum);
    return (
        <div className="flex flex-col bg-muted/30 border border-border rounded-2xl p-4 gap-3 w-full min-h-[300px]">
            <div className="flex justify-between items-center px-1">
                <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                    {title}
                </span>
                <span className="text-xs font-semibold text-muted-foreground">
                    {formattedSum} ({stageDeals.length})
                </span>
            </div>
            <div className="flex flex-col gap-3 overflow-y-auto max-h-[400px] pr-1">
                {stageDeals.map((deal) => (
                    <DealCard
                        key={deal.id}
                        deal={deal}
                        onMove={onMove}
                        onClick={onClick}
                    />
                ))}
            </div>
        </div>
    );
}

export function PipelineStats({ deals }: { deals: Deal[] }) {
    const total = deals.reduce((acc, d) => acc + d.value, 0);
    const closed = deals
        .filter((d) => d.stage === "closed_won")
        .reduce((acc, d) => acc + d.value, 0);
    const format = (v: number) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(v);
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
            <div className="p-4 bg-card border border-border rounded-2xl shadow-sm">
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Total Pipeline
                </div>
                <div className="text-xl font-extrabold text-foreground mt-1">
                    {format(total)}
                </div>
            </div>
            <div className="p-4 bg-card border border-border rounded-2xl shadow-sm">
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Closed Won
                </div>
                <div className="text-xl font-extrabold text-green-600 dark:text-green-400 mt-1">
                    {format(closed)}
                </div>
            </div>
            <div className="p-4 bg-card border border-border rounded-2xl shadow-sm col-span-2 md:col-span-1 flex flex-col justify-center">
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Win Rate
                </div>
                <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
                    {total > 0 ? Math.round((closed / total) * 100) : 0}%
                </div>
            </div>
        </div>
    );
}

export function DealDetailDrawer({
    deal,
    onClose,
}: {
    deal: Deal | null;
    onClose: () => void;
}) {
    if (!deal) return null;
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-sm bg-card border border-border rounded-2xl shadow-xl p-6 relative flex flex-col gap-4"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 hover:bg-muted rounded-md transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
                <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                    {deal.company}
                </div>
                <h3 className="text-base font-bold text-foreground -mt-3 truncate">
                    {deal.name}
                </h3>
                <div className="border-t border-border pt-3 text-xs text-muted-foreground space-y-2">
                    <div>
                        Value:{" "}
                        <strong className="text-foreground text-sm font-bold block">
                            ${deal.value.toLocaleString()}
                        </strong>
                    </div>
                    <div className="font-bold text-[10px] uppercase text-muted-foreground pt-1">
                        Activities
                    </div>
                    <div className="flex gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1" />{" "}
                        Proposal sent
                    </div>
                    <div className="flex gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1" />{" "}
                        Initial qualification call
                    </div>
                </div>
            </div>
        </div>
    );
}

export function InteractiveDemo() {
    const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);
    const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
    const [confetti, setConfetti] = useState<ConfettiParticle[]>([]);
    const handleMove = (dealId: string, direction: "left" | "right") => {
        const stages: Array<"leads" | "in_progress" | "closed_won"> = [
            "leads",
            "in_progress",
            "closed_won",
        ];
        setDeals((prev) =>
            prev.map((d) => {
                if (d.id !== dealId) return d;
                const nextIdx =
                    stages.indexOf(d.stage) + (direction === "right" ? 1 : -1);
                const newStage = stages[Math.max(0, Math.min(2, nextIdx))];
                if (newStage === "closed_won" && d.stage !== "closed_won")
                    setConfetti(generateConfetti());
                return { ...d, stage: newStage };
            }),
        );
    };
    return (
        <div className="relative w-full max-w-4xl mx-auto mt-12 p-6 bg-card border border-border rounded-3xl shadow-lg flex flex-col gap-6 select-none overflow-hidden">
            <ConfettiRain particles={confetti} />
            <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-bold">
                <Sparkles className="w-4 h-4" /> Live Interactive Sandbox
            </div>
            <PipelineStats deals={deals} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(["leads", "in_progress", "closed_won"] as const).map(
                    (stage) => (
                        <KanbanColumn
                            key={stage}
                            title={
                                stage === "leads"
                                    ? "Leads"
                                    : stage === "in_progress"
                                      ? "In Progress"
                                      : "Closed Won"
                            }
                            stage={stage}
                            deals={deals}
                            onMove={handleMove}
                            onClick={setSelectedDeal}
                        />
                    ),
                )}
            </div>
            <DealDetailDrawer
                deal={selectedDeal}
                onClose={() => setSelectedDeal(null)}
            />
        </div>
    );
}
