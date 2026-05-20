import { Network } from "lucide-react";

export function FooterLogo() {
    return (
        <div className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-lg flex items-center justify-center">
                <Network className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-lg font-bold text-foreground">Nexus</span>
        </div>
    );
}

export function FooterLinks() {
    const links = [
        { label: "About", href: "#" },
        { label: "Privacy", href: "#" },
        { label: "GitHub", href: "#" },
    ];
    return (
        <div className="flex gap-6">
            {links.map((link, idx) => (
                <a
                    key={idx}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-xs font-bold"
                >
                    {link.label}
                </a>
            ))}
        </div>
    );
}

export function Footer() {
    return (
        <footer className="bg-card border-t border-border py-10">
            <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                <FooterLogo />
                <p className="text-muted-foreground text-xs font-semibold">
                    © {new Date().getFullYear()} samuelrods. All rights
                    reserved.
                </p>
                <FooterLinks />
            </div>
        </footer>
    );
}
