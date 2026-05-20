import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import Sidebar from "./Sidebar";
import Alert from "./Alert";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Button } from "@/Components/ui/button";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }: any) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { auth } = usePage().props;

    useEffect(() => {
        if (typeof window !== "undefined" && window.innerWidth < 640) {
            setSidebarOpen(false);
        }
    }, []);

    // Update Ziggy defaults during render to keep it in sync with auth.organization
    if (auth.organization && typeof window !== "undefined" && window.Ziggy) {
        window.Ziggy.defaults = {
            organization: auth.organization.slug,
        };
    }

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="h-screen flex flex-col bg-background overflow-hidden">
            <Alert />

            {/* Mobile Header */}
            <header className="flex sm:hidden items-center justify-between px-4 h-14 border-b border-border bg-card shrink-0">
                <span className="font-bold text-blue-600 dark:text-blue-400">
                    {auth.organization?.name || "Nexus"}
                </span>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                    className="h-9 w-9 rounded-lg"
                    aria-label="Toggle menu"
                >
                    <Menu className="h-5 w-5 text-muted-foreground" />
                </Button>
            </header>

            <div className="flex flex-1 overflow-hidden relative">
                {/* Mobile Backdrop */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm sm:hidden"
                        onClick={toggleSidebar}
                    />
                )}
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    toggleSidebar={toggleSidebar}
                />
                <main
                    id="content"
                    className={cn(
                        "flex-1 overflow-y-auto px-4 py-8 transition-all duration-300",
                        sidebarOpen ? "sm:ml-64" : "sm:ml-20",
                    )}
                >
                    <div className="w-full">{children}</div>

                    <footer className="mt-auto pt-12 pb-6 text-center">
                        <p className="text-[10px] text-muted-foreground/50 uppercase tracking-widest font-medium">
                            Demo Environment &bull; Database Resets Every 24
                            Hours
                        </p>
                    </footer>
                </main>
            </div>
        </div>
    );
};

export default Layout;
