"use client";
import React from "react";
import ThemeSwitch from "./ThemeSwitch";
import UserDropdown from "./UserDropdown";
import { Button } from "@/components/ui/button";
import { RiMenu4Fill } from "react-icons/ri";
import { useSidebar } from "@/components/ui/sidebar";
import AdminSearch from "./AdminSearch";
import Image from "next/image";
import AdminMobileSearch from "./AdminMobileSearch";
import logo from "@/assets/images/logo_white.png";
import logo_black from "@/assets/images/logo_black.png";

const Topbar = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <div className="fixed border h-14 w-full top-0 left-0 z-30 md:pl-72 md:pe-8 px-5 flex justify-between items-center bg-white dark:bg-card">
      <div className="flex items-center md:hidden">
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
          alt="logo"
          className="hidden dark:block h-[50px] w-auto"
        />
      </div>

      <div className="md:block hidden">
        <AdminSearch></AdminSearch>
      </div>

      <div className="flex items-center gap-2">
        <AdminMobileSearch></AdminMobileSearch>
        <ThemeSwitch />
        <UserDropdown />
        <Button
          onClick={toggleSidebar}
          type="button"
          size="icon"
          className="ms-2 md:hidden"
        >
          <RiMenu4Fill />
        </Button>
      </div>
    </div>
  );
};

export default Topbar;
