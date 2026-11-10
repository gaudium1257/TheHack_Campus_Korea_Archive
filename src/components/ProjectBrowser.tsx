"use client";

import { useState } from "react";

type Option = { slug: string; label: string; count: number };

/** 세션별 필터. 카드는 서버에서 그린 것을 받아 data-session으로 거릅니다. */
export function ProjectBrowser({ options, total, children }: { options: Option[]; total: number; children: React.ReactNode }) {
  const [active, setActive] = useState<string>("all");
  return (
    <div data-filter={active}>
      <div className="filter" role="group" aria-label="세션으로 거르기">
        <button type="button" aria-pressed={active === "all"} onClick={() => setActive("all")}>
          전체<span className="mono">{total}</span>
        </button>
        {options.map((o) => (
          <button key={o.slug} type="button" aria-pressed={active === o.slug} onClick={() => setActive(o.slug)}>
            {o.label}
            <span className="mono">{o.count}</span>
          </button>
        ))}
      </div>
      <style>{active === "all" ? "" : `[data-filter] [data-session]:not([data-session="${active}"]){display:none}`}</style>
      {children}
    </div>
  );
}
