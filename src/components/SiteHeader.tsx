"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";
import { Wordmark } from "./Wordmark";

const NAV = [
  { href: "/sessions", label: "세션 기록" },
  { href: "/projects", label: "결과물" },
  { href: "/members", label: "학회원" },
  { href: "/about", label: "소개" },
];

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <>
      <div className="masthead-strip" id="top">
        <div className="container">
          <span>THE해커톤 : CAMPUS · {site.chapter}</span>
          <span className="hide-sm">Archive {site.termCode}</span>
        </div>
      </div>
      <header className="site-header">
        <div className="container">
          <Wordmark />
          <nav className="site-nav" aria-label="주요 메뉴">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={(e) => {
                    // 지금 보고 있는 페이지의 메뉴를 다시 누르면 맨 위로 부드럽게 (globals.css의 scroll-behavior를 따름)
                    if (pathname === item.href) {
                      e.preventDefault();
                      window.scrollTo({ top: 0 });
                    }
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <ThemeToggle />
        </div>
      </header>
    </>
  );
}
