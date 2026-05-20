import React, { useState } from "react";

interface HostingSpecs {
    tier: string;
    vCpu: string;
    ram: string;
    ssd: string;
    cost: number;
}

interface SliderProps {
    label: string;
    min: number;
    max: number;
    value: number;
    step?: number;
    formatValue: (val: number) => string;
    onChange: (val: number) => void;
}

export function calculateHosting(team: number, contacts: number): HostingSpecs {
    if (contacts <= 10000 && team <= 5) {
        return {
            tier: "Hobby VPS",
            vCpu: "1 vCPU",
            ram: "1 GB",
            ssd: "25 GB SSD",
            cost: 6,
        };
    }
    if (contacts <= 100000 && team <= 25) {
        return {
            tier: "Standard VPS",
            vCpu: "2 vCPU",
            ram: "4 GB",
            ssd: "80 GB SSD",
            cost: 24,
        };
    }
    if (contacts <= 500000 && team <= 50) {
        return {
            tier: "Performance VPS",
            vCpu: "4 vCPU",
            ram: "8 GB",
            ssd: "160 GB SSD",
            cost: 48,
        };
    }
    return {
        tier: "Enterprise Cluster",
        vCpu: "8+ vCPU",
        ram: "16+ GB",
        ssd: "320+ GB SSD",
        cost: 96,
    };
}

export function CalculatorSlider({
    label,
    min,
    max,
    value,
    step = 1,
    formatValue,
    onChange,
}: SliderProps) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-muted-foreground uppercase tracking-wider">
                    {label}
                </span>
                <span className="text-foreground font-extrabold">
                    {formatValue(value)}
                </span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500"
            />
        </div>
    );
}

export function SpecsCard({ specs }: { specs: HostingSpecs }) {
    return (
        <div className="p-5 bg-muted/30 border border-border rounded-2xl flex flex-col gap-3">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Recommended Setup
            </span>
            <h4 className="text-lg font-bold text-foreground -mt-1">
                {specs.tier}
            </h4>
            <div className="grid grid-cols-3 gap-2 text-[10px] font-bold text-muted-foreground mt-1 text-center">
                <div className="p-2 bg-card border rounded-lg">
                    <div className="text-foreground text-xs font-extrabold">
                        {specs.vCpu}
                    </div>
                    Processor
                </div>
                <div className="p-2 bg-card border rounded-lg">
                    <div className="text-foreground text-xs font-extrabold">
                        {specs.ram}
                    </div>
                    Memory
                </div>
                <div className="p-2 bg-card border rounded-lg">
                    <div className="text-foreground text-xs font-extrabold">
                        {specs.ssd}
                    </div>
                    Storage
                </div>
            </div>
        </div>
    );
}

export function CostCard({ cost }: { cost: number }) {
    return (
        <div className="p-5 bg-blue-600 dark:bg-blue-700 text-white rounded-2xl flex flex-col justify-between h-full shadow-sm relative overflow-hidden">
            <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-100">
                    Estimated Hosting
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-4xl font-extrabold">${cost}</span>
                    <span className="text-xs text-blue-200 font-semibold">
                        / month
                    </span>
                </div>
            </div>
            <p className="text-[10px] text-blue-100 leading-relaxed font-semibold mt-4">
                Deploy Nexus on your own servers. Zero licensing fees forever.
            </p>
        </div>
    );
}

export function Calculator() {
    const [teamSize, setTeamSize] = useState(2);
    const [contacts, setContacts] = useState(5000);
    const specs = calculateHosting(teamSize, contacts);
    const formatContacts = (val: number) => {
        if (val >= 1000000) return `${(val / 1000000).toFixed(0)}M`;
        if (val >= 1000) return `${(val / 1000).toFixed(0)}k`;
        return val.toString();
    };
    return (
        <div className="w-full max-w-3xl mx-auto mt-16 p-6 bg-card border border-border rounded-3xl shadow-lg flex flex-col md:flex-row gap-6 select-none">
            <div className="flex-1 flex flex-col gap-6 justify-center">
                <div className="font-extrabold text-xs text-foreground uppercase tracking-wider">
                    Self-Host Cost Estimator
                </div>
                <CalculatorSlider
                    label="Team Size"
                    min={1}
                    max={100}
                    value={teamSize}
                    formatValue={(v) => `${v} member${v > 1 ? "s" : ""}`}
                    onChange={setTeamSize}
                />
                <CalculatorSlider
                    label="CRM Contacts"
                    min={1000}
                    max={1000000}
                    step={1000}
                    value={contacts}
                    formatValue={formatContacts}
                    onChange={setContacts}
                />
            </div>
            <div className="w-full md:w-80 flex flex-col gap-4">
                <SpecsCard specs={specs} />
                <CostCard cost={specs.cost} />
            </div>
        </div>
    );
}
