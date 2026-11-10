"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";
import { Wordmark } from "./Wordmark";

/** 상단 메뉴는 홈의 섹션을 가리킵니다. 각 항목의 전체 페이지는 page로 연결해 다른 페이지에서 활성 표시에 씁니다 */
const NAV = [
  { id: "sessions", label: "세션 기록", page: "/sessions" },
  { id: "works", label: "결과물", page: "/projects" },
  { id: "members", label: "학회원", page: "/members" },
  { id: "about", label: "소개", page: "/about" },
];

/** 홈에서 지금 화면 위쪽에 걸린 섹션. 히어로를 보고 있으면 null */
function useHomeSection(enabled: boolean) {
  const [current, setCurrent] = useState<string | null>(null);
  useEffect(() => {
    if (!enabled) {
      setCurrent(null);
      return;
    }
    const pick = () => {
      const line = window.innerHeight * 0.3;
      let found: string | null = null;
      for (const item of NAV) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top - line <= 0) found = item.id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) found = NAV[NAV.length - 1].id;
      setCurrent(found);
    };
    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, [enabled]);
  return [current, setCurrent] as const;
}

export function SiteHeader() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [homeSection, setHomeSection] = useHomeSection(onHome);
  const navRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  const activeId = onHome
    ? homeSection
    : (NAV.find((item) => pathname === item.page || pathname.startsWith(`${item.page}/`))?.id ?? null);

  // 밑줄을 현재 메뉴 아래로 옮깁니다
  useEffect(() => {
    const bar = barRef.current;
    const link = activeId ? navRef.current?.querySelector<HTMLAnchorElement>(`a[data-id="${activeId}"]`) : null;
    if (!bar) return;
    if (!link) {
      bar.style.opacity = "0";
      return;
    }
    bar.style.transform = `translateX(${link.offsetLeft}px)`;
    bar.style.width = `${link.offsetWidth}px`;
    bar.style.opacity = "1";
  }, [activeId]);

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
          <nav className="site-nav" aria-label="주요 메뉴" ref={navRef}>
            {NAV.map((item) => (
              <Link
                key={item.id}
                href={`/#${item.id}`}
                data-id={item.id}
                aria-current={activeId === item.id ? (onHome ? "location" : "page") : undefined}
                onClick={(e) => {
                  // 홈에서는 페이지를 바꾸지 않고 해당 섹션까지 부드럽게 스크롤 (globals.css의 scroll-behavior를 따름)
                  // 다른 페이지에서는 홈의 그 위치로 바로 이동
                  if (!onHome) return;
                  const el = document.getElementById(item.id);
                  if (!el) return;
                  e.preventDefault();
                  setHomeSection(item.id);
                  el.scrollIntoView({ block: "start" });
                  window.history.pushState(null, "", `#${item.id}`);
                }}
              >
                {item.label}
              </Link>
            ))}
            <span ref={barRef} className="site-nav__bar" aria-hidden="true" />
          </nav>
          <ThemeToggle />
        </div>
      </header>
    </>
  );
}
