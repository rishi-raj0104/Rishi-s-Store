import {
  USER_DASHBOARD,
  WEBSITE_HOME,
  WEBSITE_LOGIN,
  WEBSITE_REGISTER,
  WEBSITE_SHOP,
} from "@/routes/WebsiteRoute";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineMail, MdOutlinePhone } from "react-icons/md";
import { TiSocialFacebookCircular } from "react-icons/ti";
import logo from "@/assets/images/logo_white.png";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-10 py-10 lg:px-32 px-4">
        <div className="lg:col-span-1 md:col-span-2 col-span-1">
          <Image
            src={logo}
            width={383}
            height={146}
            alt="logo"
            className="lg:w-56 w-40 mb-2"
          />
          <p className="text-gray-900 text-sm">
            Rishi's Store is your trusted destination for quality and
            convenience. From fashion to essentials, we bring everything you
            need right to your doorstep. Shop smart, live better — only at
            Rishi's Store.
          </p>
        </div>
        <div>
          <h4 className="text-xl font-bold uppercase mb-5">Categories</h4>
          <ul>
            <li className="mb-2 text-gray-900">
              <Link href={`${WEBSITE_SHOP}?category=t-shirts`}>T-shirt</Link>
            </li>
            <li className="mb-2 text-gray-900">
              <Link href={`${WEBSITE_SHOP}?category=hoodies`}>Hoodies</Link>
            </li>
            <li className="mb-2 text-gray-900">
              <Link href={`${WEBSITE_SHOP}?category=oversized`}>Oversized</Link>
            </li>
            <li className="mb-2 text-gray-900">
              <Link href={`${WEBSITE_SHOP}?category=full-sleeves`}>
                Full Sleeves
              </Link>
            </li>
            <li className="mb-2 text-gray-900">
              <Link href={`${WEBSITE_SHOP}?category=polo`}>Polo</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-bold uppercase mb-5">Usefull Links</h4>
          <ul>
            <li className="mb-2 text-gray-900">
              <Link href={WEBSITE_HOME}>Home</Link>
            </li>
            <li className="mb-2 text-gray-900">
              <Link href={WEBSITE_SHOP}>Shop</Link>
            </li>
            <li className="mb-2 text-gray-900">
              <Link href="/about">About</Link>
            </li>
            <li className="mb-2 text-gray-900">
              <Link href={WEBSITE_REGISTER}>Register</Link>
            </li>
            <li className="mb-2 text-gray-900">
              <Link href={WEBSITE_LOGIN}>Login</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-bold uppercase mb-5">Help Center</h4>
          <ul>
            <li className="mb-2 text-gray-900">
              <Link href={WEBSITE_REGISTER}>Register</Link>
            </li>
            <li className="mb-2 text-gray-900">
              <Link href={WEBSITE_LOGIN}>Login</Link>
            </li>
            <li className="mb-2 text-gray-900">
              <Link href={USER_DASHBOARD}>My Account</Link>
            </li>
            <li className="mb-2 text-gray-900">
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li className="mb-2 text-gray-900">
              <Link href="/terms-and-conditions">Terms & Conditions</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-bold uppercase mb-5">Contact Us</h4>
          <ul>
            <li className="mb-2 text-gray-900 flex gap-2">
              <IoLocationOutline size={20} />
              <span className="text-sm">Noida, 201301</span>
            </li>
            <li className="mb-2 text-gray-900 flex gap-2">
              <MdOutlinePhone size={20} />
              <Link
                href="tel:+91-7000000000"
                className="hover:text-primary text-sm"
              >
                +91-7000000000
              </Link>
            </li>
            <li className="mb-2 text-gray-900 flex gap-2">
              <MdOutlineMail size={20} />
              <Link
                href="mailto:support@estore.com"
                className="hover:text-primary text-sm"
              >
                support@estore.com
              </Link>
            </li>
          </ul>
          <div className="flex gap-5 mt-5">
            <Link href="#">
              <AiOutlineYoutube className="text-primary" size={25} />
            </Link>
            <Link href="#">
              <FaInstagram className="text-primary" size={25} />
            </Link>
            <Link href="#">
              <FaWhatsapp className="text-primary" size={25} />
            </Link>
            <Link href="#">
              <TiSocialFacebookCircular className="text-primary" size={25} />
            </Link>
            <Link href="#">
              <FiTwitter className="text-primary" size={25} />
            </Link>
          </div>
        </div>
      </div>
      <div className="py-5 bg-gray-100">
        <p className="text-center">
          © {new Date().getFullYear()} Estore. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
