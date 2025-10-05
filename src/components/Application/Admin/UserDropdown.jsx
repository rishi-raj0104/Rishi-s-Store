import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // From image_9779e0.png
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoShirtOutline } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import LogoutButton from "./LogoutButton";
import { useSelector } from "react-redux";
import Link from "next/link";
import { ADMIN_ORDER_SHOW, ADMIN_PRODUCT_ADD } from "@/routes/AdminPanelRoutes";
const UserDropdown = () => {
  const auth = useSelector((store) => store.authStore.auth);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          {" "}
          <AvatarImage src="https://github.com/shadcn.png" />{" "}
          <AvatarFallback>CN</AvatarFallback>{" "}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="me-5 w-44 ">
        <DropdownMenuLabel>
          <p className="font-semibold">{auth?.name}</p>
        </DropdownMenuLabel>{" "}
        <DropdownMenuItem asChild>
          <Link href={ADMIN_PRODUCT_ADD} className="cursor-pointer">
            <IoShirtOutline />
            New Product
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={ADMIN_ORDER_SHOW} className="cursor-pointer">
            <MdOutlineShoppingBag />
            Orders
          </Link>
        </DropdownMenuItem>
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
