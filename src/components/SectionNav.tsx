"use client";

import { useEffect, useRef, useState } from "react";

export type SectionNavItem = { id: string; label: string };

/**
 * 페이지 안 섹션으로 이동하는 메뉴. 머리글 아래에 붙어 있고, 누르면 해당 섹션까지 부드럽게 이동합니다
 * (부드러운 이동은 globals.css의 scroll-behavior. "동작 줄이기" 설정이면 바로 이동).
 * 지금 보고 있는 섹션 아래로 밑줄이 따라 움직입니다.
 */
export function SectionNav({ items, label = "이 페이지의 섹션" }: { items: SectionNavItem[]; label?: string }) {
  const [active, setActive] = useState(items[0]?.id);
  const listRef = useRef<HTMLUListElement>(null);
  const barRef = useRef<HTMLLIElement>(null);

  // 화면 위쪽 띠(머리글 바로 아래)에 걸린 섹션을 현재 섹션으로
  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;
    const pick = () => {
      const line = window.innerHeight * 0.3;
      let current = sections[0].id;
      for (const s of sections) if (s.getBoundingClientRect().top - line <= 0) current = s.id;
      // 페이지 끝에 닿으면 마지막 섹션
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = sections[sections.length - 1].id;
      setActive(current);
    };
    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, [items]);

  // 밑줄을 현재 메뉴 아래로 옮기고, 좁은 화면에서는 현재 메뉴가 보이게 가로로 스크롤
  useEffect(() => {
    const list = listRef.current;
    const bar = barRef.current;
    const link = list?.querySelector<HTMLAnchorElement>(`a[href="#${active}"]`);
    if (!list || !bar || !link) return;
    bar.style.transform = `translateX(${link.offsetLeft}px)`;
    bar.style.width = `${link.offsetWidth}px`;
    bar.style.opacity = "1";
    const left = link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2;
    list.scrollTo({ left: Math.max(0, left) });
  }, [active]);

  return (
    <nav className="section-nav" aria-label={label}>
      <div className="container">
        <ul ref={listRef}>
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} aria-current={active === item.id ? "location" : undefined} onClick={() => setActive(item.id)}>
                {item.label}
              </a>
            </li>
          ))}
          <li ref={barRef} className="section-nav__bar" role="presentation" aria-hidden="true" />
        </ul>
      </div>
    </nav>
  );
}
