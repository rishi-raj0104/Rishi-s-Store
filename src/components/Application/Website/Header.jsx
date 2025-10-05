"use client";
import {
  USER_DASHBOARD,
  WEBSITE_HOME,
  WEBSITE_LOGIN,
  WEBSITE_SHOP,
} from "@/routes/WebsiteRoute";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import Cart from "./Cart";
import { VscAccount } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { HiMiniBars3 } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import Search from "./Search";
import logo from "@/assets/images/logo_white.png";
import userImg from "@/assets/images/user.png";

const Header = () => {
  const [showSearch, setshowSearch] = useState(false);
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const auth = useSelector((store) => store.authStore.auth);
  return (
    <div className="bg-white border-b lg:px-32 px-4">
      <div className="flex justify-between items-center lg:py-5 py-3">
        <Link href={WEBSITE_HOME}>
          <Image
            src={logo}
            width={logo.width}
            height={logo.height}
            alt="logo"
            className="lg:w-56 w-40"
          />
        </Link>
        <div className="flex justify-between gap-50">
          <nav
            className={`lg:relative lg:w-auto 
            lg:h-auto lg:top-0 lg:left-0 lg:p-0 bg-white fixed z-50 top-0 w-full h-screen transition-all ${
              isMobileMenu ? "left-0" : "-left-full"
            }`}
          >
            <div className="lg:hidden flex justify-between items-center bg-gray-50 py-3 border-b px-3">
              <Image
                src={logo}
                width={logo.width}
                height={logo.height}
                alt="logo"
                className="lg:w-56 w-40"
              />
              <button type="button" className="lg:hidden block">
                <IoMdClose
                  size={25}
                  className="text-gray-900 hover:text-primary"
                  onClick={() => setIsMobileMenu(false)}
                />
              </button>
            </div>

            <ul className="lg:flex justify-center items-center gap-10 px-3">
              <li className="text-gray-900 hover:text-primary hover:font-semibold">
                <Link href={WEBSITE_HOME} className="block py-2">
                  Home
                </Link>
              </li>
              <li className="text-gray-900 hover:text-primary hover:font-semibold">
                <Link href="/about" className="block py-2">
                  About
                </Link>
              </li>
              <li className="text-gray-900 hover:text-primary hover:font-semibold">
                <Link href={WEBSITE_SHOP} className="block py-2">
                  Shop
                </Link>
              </li>
              <li className="text-gray-900 hover:text-primary hover:font-semibold">
                <Link
                  href={`${WEBSITE_SHOP}?category=t-shirts`}
                  className="block py-2"
                >
                  T-shirt
                </Link>
              </li>
              <li className="text-gray-900 hover:text-primary hover:font-semibold">
                <Link
                  href={`${WEBSITE_SHOP}?category=hoodies`}
                  className="block py-2"
                >
                  Hoodies
                </Link>
              </li>
              <li className="text-gray-900 hover:text-primary hover:font-semibold">
                <Link
                  href={`${WEBSITE_SHOP}?category=oversized`}
                  className="block py-2"
                >
                  Oversized
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex justify-between items-center gap-8">
            <button type="button">
              <IoIosSearch
                onClick={() => setshowSearch(!showSearch)}
                className="text-gray-900 hover:text-primary cursor-pointer"
                size={25}
              />
            </button>
            <Cart></Cart>

            {!auth ? (
              <Link href={WEBSITE_LOGIN}>
                <VscAccount
                  className="text-gray-900 hover:text-primary cursor-pointer"
                  size={25}
                />
              </Link>
            ) : (
              <Link href={USER_DASHBOARD}>
                <Avatar>
                  <AvatarImage
                    src={auth?.avatar?.url || userImg.src}
                  ></AvatarImage>
                </Avatar>
              </Link>
            )}

            <button
              type="button"
              className="lg:hidden block"
              onClick={() => setIsMobileMenu(true)}
            >
              <HiMiniBars3
                size={25}
                className="text-gray-900 hover:text-primary"
              />
            </button>
          </div>
        </div>
      </div>
      <Search isShow={showSearch}></Search>
    </div>
  );
};

export default Header;
