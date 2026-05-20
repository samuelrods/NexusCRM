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
import { Building, Plus, ChevronsUpDown, Check } from "lucide-react";
import CreateOrganizationModal from "@/Components/CreateOrganizationModal";
import { cn } from "@/lib/utils";

interface OrgSwitcherProps {
    collapsed: boolean;
    auth: {
        user: {
            memberships?: Array<{
                organization: {
                    id: number;
                    name: string;
                    slug: string;
                };
            }>;
        };
        organization?: {
            id: number;
            name: string;
            slug: string;
        } | null;
    };
}

const handleOrgSelect = (orgId: number): void => {
    router.put(route("users.organization"), {
        organization_id: orgId,
    });
};

const renderMembershipItem = (
    membership: any,
    activeOrgId?: number,
): React.ReactNode => {
    const isSelected = activeOrgId === membership.organization.id;
    return (
        <DropdownMenuItem
            key={`sidebar-org-${membership.organization.id}`}
            onClick={() => handleOrgSelect(membership.organization.id)}
            className="cursor-pointer font-medium"
        >
            <div className="flex items-center gap-2 w-full">
                <Check
                    className={cn(
                        "w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0",
                        isSelected ? "opacity-100" : "opacity-0",
                    )}
                />
                <span className="truncate">{membership.organization.name}</span>
            </div>
        </DropdownMenuItem>
    );
};

const SidebarOrgSwitcher: React.FC<OrgSwitcherProps> = ({
    collapsed,
    auth,
}) => {
    const organization = auth.organization;
    const memberships = auth.user?.memberships || [];

    const triggerText =
        organization?.name && organization.name.length > 15
            ? organization.name.substring(0, 15) + "..."
            : organization?.name || "Select Organization";

    const trigger = collapsed ? (
        <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-lg"
            aria-label="Switch organization"
        >
            <Building className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </Button>
    ) : (
        <Button
            variant="outline"
            className="w-full flex items-center justify-between gap-2 px-3 py-2 h-10 border-border hover:bg-accent text-foreground rounded-lg"
        >
            <div className="flex items-center gap-2 text-left truncate">
                <Building className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span className="text-sm font-semibold truncate leading-none">
                    {triggerText}
                </span>
            </div>
            <ChevronsUpDown className="h-4 w-4 text-muted-foreground shrink-0" />
        </Button>
    );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
            <DropdownMenuContent
                align={collapsed ? "start" : "center"}
                side={collapsed ? "right" : "bottom"}
                className="w-56"
            >
                <DropdownMenuLabel>Switch Organization</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-[300px] overflow-y-auto">
                    {memberships.map((m) =>
                        renderMembershipItem(m, organization?.id),
                    )}
                </div>
                <DropdownMenuSeparator />
                <CreateOrganizationModal
                    trigger={
                        <DropdownMenuItem
                            onSelect={(e: any) => e.preventDefault()}
                            className="cursor-pointer text-blue-600 focus:text-blue-600 focus:bg-blue-50 dark:focus:bg-blue-900/20 font-medium"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            <span>Create Organization</span>
                        </DropdownMenuItem>
                    }
                />
                <DropdownMenuItem asChild>
                    <Link
                        href="/organizations"
                        className="cursor-pointer flex items-center font-medium"
                    >
                        <Building className="h-4 w-4 mr-2" />
                        <span>Manage Organizations</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default SidebarOrgSwitcher;
