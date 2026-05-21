import React, { useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";

interface FaqItemType {
    q: string;
    a: string;
}

interface SearchProps {
    value: string;
    onChange: (val: string) => void;
}

const FAQS: FaqItemType[] = [
    {
        q: "What is Nexus?",
        a: "Nexus is an open-source CRM built with Laravel, React, and Inertia.js. It helps teams manage contacts, companies, leads, deals, and activities — all within a multi-tenant architecture with role-based access control.",
    },
    {
        q: "Do I need to pay anything?",
        a: "No. Nexus is completely free and open-source under the MIT license. You host it on your own infrastructure and get every feature at zero cost.",
    },
    {
        q: "How does multi-organization support work?",
        a: "Users can create or join multiple organizations. Each organization has its own isolated data, custom roles, permissions, and currency settings. Switch between organizations seamlessly from the dashboard.",
    },
    {
        q: "What permissions can I configure?",
        a: "Nexus uses a granular role-based access control system. You can create custom roles per organization and assign specific permissions for viewing, creating, editing, or deleting contacts, companies, leads, deals, activities, and managing team members.",
    },
    {
        q: "What tech stack does Nexus use?",
        a: "The backend is powered by Laravel with MySQL and Meilisearch for fast full-text search. The frontend uses React with Inertia.js for a seamless single-page experience, styled with Tailwind CSS and shadcn/ui components.",
    },
];

export function FaqHeader() {
    return (
        <div className="text-center mb-8 select-none">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-wider uppercase mb-6">
                F.A.Q
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
                Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-sm font-semibold max-w-lg mx-auto">
                Everything you need to know about Nexus and getting started.
            </p>
        </div>
    );
}

export function FaqSearch({ value, onChange }: SearchProps) {
    return (
        <div className="max-w-md mx-auto mb-10 relative">
            <input
                type="text"
                placeholder="Search questions..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-2.5 bg-card border border-border rounded-xl shadow-sm text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-foreground placeholder-muted-foreground"
            />
        </div>
    );
}

export function FaqAccordionList({ list }: { list: FaqItemType[] }) {
    if (list.length === 0) {
        return (
            <div className="text-center py-8 text-xs font-bold text-muted-foreground">
                No questions match your query.
            </div>
        );
    }
    return (
        <Accordion
            type="single"
            collapsible
            className="w-full bg-card border border-border rounded-2xl p-2 select-none"
        >
            {list.map((faq, idx) => (
                <AccordionItem
                    key={idx}
                    value={`item-${idx}`}
                    className="border-b border-border last:border-0 px-4"
                >
                    <AccordionTrigger className="text-left text-sm font-bold hover:text-blue-600 transition-colors py-4 text-foreground">
                        {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-xs leading-relaxed pb-4">
                        {faq.a}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}

export function Faq() {
    const [search, setSearch] = useState("");
    const filtered = FAQS.filter(
        (f) =>
            f.q.toLowerCase().includes(search.toLowerCase()) ||
            f.a.toLowerCase().includes(search.toLowerCase()),
    );
    return (
        <section id="faq" className="py-24 bg-muted/20 border-t border-border">
            <div className="max-w-3xl mx-auto px-4">
                <FaqHeader />
                <FaqSearch value={search} onChange={setSearch} />
                <FaqAccordionList list={filtered} />
            </div>
        </section>
    );
}
