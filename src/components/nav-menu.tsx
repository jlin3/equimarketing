"use client";

import { siteConfig } from "@/lib/config";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import React, { useRef, useState } from "react";

interface NavItem {
  name: string;
  href: string;
}

const navs: NavItem[] = siteConfig.nav.links;

export function NavMenu() {
  const ref = useRef<HTMLUListElement>(null);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  
  const [left, setLeft] = useState(0);
  const [width, setWidth] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isManualScroll, setIsManualScroll] = useState(false);

  // Find if current path matches a nav item
  const currentPageNav = navs.find((nav) => nav.href === pathname);

  React.useEffect(() => {
    // Only initialize nav indicator on homepage
    if (!isHomePage) {
      // If on a page that matches a nav item, highlight that
      if (currentPageNav) {
        const navItem = ref.current?.querySelector(
          `[href="${currentPageNav.href}"]`,
        )?.parentElement;
        if (navItem) {
          const rect = navItem.getBoundingClientRect();
          setLeft(navItem.offsetLeft);
          setWidth(rect.width);
          setIsReady(true);
        }
      }
      return;
    }

    // Initialize with first nav item on homepage
    const firstItem = ref.current?.querySelector(
      `[href="#${navs[0].href.substring(1)}"]`,
    )?.parentElement;
    if (firstItem) {
      const rect = firstItem.getBoundingClientRect();
      setLeft(firstItem.offsetLeft);
      setWidth(rect.width);
      setIsReady(true);
    }
  }, [isHomePage, currentPageNav]);

  React.useEffect(() => {
    // Only track scroll on homepage
    if (!isHomePage) return;

    const handleScroll = () => {
      // Skip scroll handling during manual click scrolling
      if (isManualScroll) return;

      const sections = navs
        .filter((item) => item.href.startsWith("#"))
        .map((item) => item.href.substring(1));

      // Find the section closest to viewport top
      let closestSection = sections[0];
      let minDistance = Infinity;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const distance = Math.abs(rect.top - 100);
          if (distance < minDistance) {
            minDistance = distance;
            closestSection = section;
          }
        }
      }

      // Update active section and nav indicator
      setActiveSection(closestSection);
      const navItem = ref.current?.querySelector(
        `[href="#${closestSection}"]`,
      )?.parentElement;
      if (navItem) {
        const rect = navItem.getBoundingClientRect();
        setLeft(navItem.offsetLeft);
        setWidth(rect.width);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isManualScroll, isHomePage]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: NavItem,
  ) => {
    // If it's a page link (not an anchor), let it navigate normally
    if (!item.href.startsWith("#")) {
      return;
    }

    // If we're not on the homepage, navigate to homepage with anchor
    if (!isHomePage) {
      // Let the browser handle navigation to /#anchor
      e.currentTarget.href = "/" + item.href;
      return;
    }

    e.preventDefault();

    const targetId = item.href.substring(1);
    const element = document.getElementById(targetId);

    if (element) {
      setIsManualScroll(true);
      setActiveSection(targetId);
      
      const navItem = e.currentTarget.parentElement;
      if (navItem) {
        const rect = navItem.getBoundingClientRect();
        setLeft(navItem.offsetLeft);
        setWidth(rect.width);
      }

      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 100;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setTimeout(() => {
        setIsManualScroll(false);
      }, 500);
    }
  };

  const isActive = (item: NavItem) => {
    if (!isHomePage) {
      // On other pages, highlight if the path matches
      return item.href === pathname;
    }
    // On homepage, highlight based on scroll position
    return item.href.startsWith("#") && activeSection === item.href.substring(1);
  };

  return (
    <div className="w-full hidden md:block">
      <ul
        className="relative mx-auto flex w-fit rounded-full h-11 px-2 items-center justify-center"
        ref={ref}
      >
        {navs.map((item) => (
          <li
            key={item.name}
            className={`z-10 cursor-pointer h-full flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
              isActive(item)
                ? "text-primary"
                : "text-primary/60 hover:text-primary"
            } tracking-tight`}
          >
            <a href={item.href} onClick={(e) => handleClick(e, item)}>
              {item.name}
            </a>
          </li>
        ))}
        {isReady && (
          <motion.li
            animate={{ left, width }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute inset-0 my-1.5 rounded-full bg-accent/60 border border-border"
          />
        )}
      </ul>
    </div>
  );
}
