"use client";

import { useEffect, useState } from "react";
import { scrollToPageTop } from "@/lib/scroll";

const SHOW_AFTER = 600; // 이만큼(px) 내려가면 버튼이 올라옵니다
const R = 22;
const CIRC = 2 * Math.PI * R;

/** 오른쪽 아래에 떠 있는 맨 위로 버튼. 테두리 원이 지금까지 읽은 만큼 채워집니다 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(window.scrollY > SHOW_AFTER);
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <button
      type="button"
      className="back-to-top"
      data-visible={visible}
      aria-label="맨 위로"
      title="맨 위로"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      onClick={scrollToPageTop}
    >
      <svg className="back-to-top__ring" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r={R} className="back-to-top__track" />
        <circle cx="24" cy="24" r={R} className="back-to-top__progress" strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - progress)} />
      </svg>
      <svg className="back-to-top__arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" strokeLinecap="square" />
      </svg>
    </button>
  );
}
