import {
  SidebarGroupLabel,
  SidebarGroupContent,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { LINKS } from "../../constants";
import Link from "next/link";
import { ActiveLink } from "../layout/active-link";

export const NotesSidebar = () => {

  return (
    <Sidebar side="left" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            {LINKS.map((link) => {
              return (
                <SidebarMenuItem key={link.name}>
                  <SidebarMenuButton>
                    <ActiveLink href={link.href}>
                      <div className="flex items-center gap-2 text-lg">
                        <link.icon />
                        {link.name}
                      </div>
                    </ActiveLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
