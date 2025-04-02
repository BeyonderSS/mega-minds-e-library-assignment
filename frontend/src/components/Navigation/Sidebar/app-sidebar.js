import { Home, BookPlus } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ModeToggle } from "../../ThemeToggle"
import Footer from "./Footer"

// Menu items.
const items = [
    { title: "Explore Books", url: "/dashboard/browse", icon: BookPlus },
    { title: "Manage Your Books", url: "/dashboard/manage-books", icon: BookPlus },
]

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel><div className="flex justify-between w-full items-center">
                        Book Management by Beyonder<ModeToggle /></div></SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url} className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100">
                                            <item.icon className="w-5 h-5" />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <Footer />
        </Sidebar>
    )
}
