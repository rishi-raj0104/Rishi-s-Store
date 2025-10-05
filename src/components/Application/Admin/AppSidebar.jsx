"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarMenuSub,
  useSidebar,
} from "@/components/ui/sidebar";
import { LuChevronRight } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AdminAppSidebarMenu } from "@/lib/adminSidebarMenu";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import Link from "next/link";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import logo from "@/assets/images/logo_white.png";
import logo_black from "@/assets/images/logo_black.png";
const AppSidebar = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <Sidebar className="z-50">
      <SidebarHeader className="border-b h-14 p-0">
        <div className="flex justify-between items-center px-4">
          <Image
            src={logo}
            width={logo.width}
            height={logo.height}
            className="block dark:hidden h-[50px] w-auto"
            alt="logo dark"
          />
          <Image
            src={logo_black}
            width={logo.width}
            height={logo.height}
            className="hidden dark:block h-[50px] w-auto"
            alt="logo white"
          />
          <Button
            onClick={toggleSidebar}
            type="button"
            size="icon"
            className="md:hidden"
          >
            <IoMdClose></IoMdClose>
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-3">
        <SidebarMenu>
          {AdminAppSidebarMenu.map((menu, index) => (
            <Collapsible key={index} className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    asChild
                    className="font-semibold px-2 py-5"
                  >
                    <Link href={menu?.url}>
                      <menu.icon />
                      <span>{menu.title}</span>
                      {menu.submenu && menu.submenu.length > 0 && (
                        <LuChevronRight className="ml-auto transition-transform-duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                {menu.submenu && menu.submenu.length > 0 && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {menu.submenu.map((submenuItem, subMenuIndex) => (
                        <SidebarMenuButton
                          asChild
                          key={subMenuIndex}
                          className="px-2 py-5"
                        >
                          <Link href={submenuItem?.url}>
                            {submenuItem.title}
                          </Link>
                        </SidebarMenuButton>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
