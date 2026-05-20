import React from "react";
import { Link, router } from "@inertiajs/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";
import { UserCircle, LogOut, LayoutDashboard } from "lucide-react";

interface UserProfileProps {
    collapsed: boolean;
    auth: {
        user: {
            full_name: string;
            email: string;
        };
        organization?: {
            slug: string;
        } | null;
    };
}

const handleSignOut = (): void => {
    router.post("/logout");
};

const SidebarUserProfile: React.FC<UserProfileProps> = ({
    collapsed,
    auth,
}) => {
    const user = auth.user;
    const organization = auth.organization;

    const dashboardRoute = organization
        ? route("dashboard", { organization: organization.slug })
        : route("organizations.index");

    const trigger = collapsed ? (
        <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-lg"
            data-testid="user-profile-button"
            aria-label="User profile menu"
        >
            <UserCircle className="h-6 w-6" />
        </Button>
    ) : (
        <Button
            variant="ghost"
            className="w-full flex items-center justify-start gap-3 px-3 py-2 h-14 border border-transparent hover:bg-accent text-foreground rounded-lg overflow-hidden"
            data-testid="user-profile-button"
        >
            <UserCircle className="h-8 w-8 text-muted-foreground shrink-0" />
            <div className="flex flex-col text-left min-w-0">
                <span className="text-sm font-semibold truncate leading-none mb-1">
                    {user?.full_name}
                </span>
                <span className="text-xs text-muted-foreground truncate leading-none">
                    {user?.email}
                </span>
            </div>
        </Button>
    );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
            <DropdownMenuContent
                align={collapsed ? "start" : "end"}
                side={collapsed ? "right" : "top"}
                className="w-56"
            >
                <DropdownMenuLabel>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-foreground">
                            {user?.full_name}
                        </span>
                        <span className="text-xs text-muted-foreground truncate">
                            {user?.email}
                        </span>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link
                        href={dashboardRoute}
                        className="cursor-pointer flex items-center font-medium"
                    >
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        <span>Dashboard</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link
                        href={route("profile.edit")}
                        className="cursor-pointer flex items-center font-medium"
                    >
                        <UserCircle className="h-4 w-4 mr-2" />
                        <span>Profile</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={handleSignOut}
                    className="cursor-pointer text-red-600 focus:text-red-600 font-medium"
                >
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Sign out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default SidebarUserProfile;
