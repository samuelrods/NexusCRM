import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Menu, X, Network } from "lucide-react";
import { ModeToggle } from "@/Components/ModeToggle";
import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";

interface UserType {
    full_name: string;
}

interface PagePropsType {
    auth: {
        user: UserType | null;
    };
}

interface NavLinkItem {
    href: string;
    label: string;
}

interface NavLinksListProps {
    links: NavLinkItem[];
    isOpen: boolean;
    onItemClick: () => void;
}

function useScrollState(threshold: number): boolean {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > threshold);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [threshold]);

    return scrolled;
}

export function NavLogo() {
    return (
        <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-lg flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
                <Network className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-extrabold font-display text-foreground tracking-tight">
                Nexus
            </span>
        </Link>
    );
}

export function NavActionButtons({ user }: { user: UserType | null }) {
    return (
        <div className="flex items-center gap-3">
            <ModeToggle />
            {user ? (
                <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition-all duration-200"
                    asChild
                >
                    <Link href="/dashboard">Dashboard</Link>
                </Button>
            ) : (
                <>
                    <Link
                        href="/login"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
                    >
                        Log in
                    </Link>
                    <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition-all duration-200"
                        asChild
                    >
                        <Link href="/register">Get started</Link>
                    </Button>
                </>
            )}
        </div>
    );
}

export function NavLinksList({
    links,
    isOpen,
    onItemClick,
}: NavLinksListProps) {
    const listClass =
        "flex flex-col p-4 md:p-0 mt-4 font-medium border border-border rounded-xl bg-card md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent";

    return (
        <div
            className={cn(
                "items-center justify-between w-full md:flex md:w-auto md:order-1",
                !isOpen && "hidden md:block",
            )}
        >
            <ul className={listClass}>
                {links.map((link) => (
                    <li key={link.href}>
                        <a
                            href={link.href}
                            onClick={onItemClick}
                            className="block py-2 px-3 text-muted-foreground rounded-lg hover:text-foreground hover:bg-accent md:hover:bg-transparent transition-colors md:p-0"
                        >
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function Navbar() {
    const { auth } = usePage().props as unknown as PagePropsType;
    const [isOpen, setIsOpen] = useState(false);
    const scrolled = useScrollState(20);
    const links = [
        { href: "#home", label: "Home" },
        { href: "#features", label: "Features" },
        { href: "#pricing", label: "Pricing" },
        { href: "#faq", label: "F.A.Q" },
    ];

    return (
        <nav
            className={cn(
                "sticky top-0 z-50 transition-all duration-300 w-full",
                scrolled
                    ? "bg-card border-b border-border shadow-sm"
                    : "bg-background border-b border-transparent",
            )}
        >
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 gap-4">
                <NavLogo />
                <div className="flex md:order-2 space-x-3 items-center">
                    <NavActionButtons user={auth?.user} />
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-muted-foreground rounded-lg md:hidden hover:bg-accent"
                    >
                        {isOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
                <NavLinksList
                    links={links}
                    isOpen={isOpen}
                    onItemClick={() => setIsOpen(false)}
                />
            </div>
        </nav>
    );
}
