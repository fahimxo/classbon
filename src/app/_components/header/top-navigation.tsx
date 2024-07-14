"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const menuItem: NavigationMenuItem[] = [
  { title: "صفحه اصلی", href: "/" },
  { title: "دوره های ریکت و نکست", href: "/courses" },
  { title: "مطالب و مقالات", href: "/blog" },
];

const TopNavigation: React.FC = () => {
  const pathName = usePathname();

  return (
    <ul className="flex gap-x-8 mr-12">
      {menuItem.map((item) => (
        <li key={item.title}>
          <Link
            className={`dark:hover:text-primary transition-colors pb-2 ${
              pathName === item.href
                ? " border-b-2 dark:text-primary dark:border-primary/30"
                : ""
            }`}
            href={item.href}
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default TopNavigation;
