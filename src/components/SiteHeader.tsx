"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
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
      <div className="masthead-strip">
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
                <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined}>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
    </>
  );
}
