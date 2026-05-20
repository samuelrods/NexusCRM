import React from "react";
import { Head, usePage } from "@inertiajs/react";
import Alert from "@/Shared/Alert";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { Features } from "./Features";
import { Pricing } from "./Pricing";
import { Faq } from "./Faq";
import { TechnicalHighlights } from "./TechnicalHighlights";
import { Footer } from "./Footer";

interface UserType {
    full_name: string;
}

interface PagePropsType {
    auth: {
        user: UserType | null;
    };
}

export function LandingPage() {
    const { auth } = usePage().props as unknown as PagePropsType;

    return (
        <div className="min-h-screen bg-background selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900/40 dark:selection:text-blue-300 antialiased font-sans bg-noise">
            <Head title="Nexus — Open-Source CRM for Modern Teams" />
            <Navbar />
            <main>
                <Hero user={auth?.user} />
                <Features />
                <Pricing />
                <TechnicalHighlights />
                <Faq />
            </main>
            <Footer />
            <Alert />
        </div>
    );
}

export default LandingPage;
