"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavLinkProps {
  link: string;
  title: string;
  isSelected?: boolean;
  disabled?: boolean;
}

const navPaths: NavLinkProps[] = [
  {
    title: "Overview",
    link: "/",
  },
  {
    title: "Single Prior Auth",
    link: "/single-prior",
  },
  {
    title: "Bulk Prior Auth",
    link: "/bulk",
    disabled: true,
  },
];

const NavLink = ({ link, title, isSelected, disabled }: NavLinkProps) => {
  return (
    <div>
      {!disabled ? (
        <Link href={link} key={title}>
          <div
            className={`transition-colors  ${
              isSelected
                ? "bg-gray-200 text-gray-700"
                : "text-gray-500 hover:bg-gray-100"
            } px-4 pt-2 pb-4 rounded-t-lg`}
          >
            <p className="">{title}</p>
          </div>
        </Link>
      ) : (
        <div className={`transition-colors px-4 py-2 rounded-t-lg`}>
          <p className="text-gray-500">{title}</p>
        </div>
      )}
    </div>
  );
};

const NavBar = () => {
  const pathname = usePathname();
  //class to make sticky: sticky top-0
  return (
    <div className="w-full border-b-2 z-50 backdrop-blur px-6 pt-6">
      {/* <div className="flex flex-row justify-between items-center mb-3 max-w-7xl mx-auto">
        <div className="relative w-16 h-8">
          <Image
            alt="logo"
            src="logo.svg"
            layout="fill"
            className="object-contain drop-shadow-lg"
          />
        </div>
      </div> */}

      <div className="flex flex-row space-x-1 max-w-7xl mx-auto">
        <div className="relative w-14 h-8 mr-6 mt-1">
          {/* Use next image as it is rendered from server, for dynamic images, use <img> tag */}
          <Image
            alt="logo"
            src="logo.svg"
            layout="fill"
            className="object-contain drop-shadow-lg"
          />
        </div>
        {navPaths.map((item: NavLinkProps) => (
          <NavLink
            key={item.link}
            title={item.title}
            link={item.link}
            isSelected={pathname === item.link}
            disabled={item.disabled}
          />
        ))}
      </div>
    </div>
  );
};

export default NavBar;
