"use client";

import { useEffect, useState } from "react";
import { scrollToPageTop } from "@/lib/scroll";

const SHOW_AFTER = 600; // 이만큼(px) 내려가면 버튼이 올라옵니다

/** 오른쪽 아래에 떠 있는 맨 위로 버튼 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisible(window.scrollY > SHOW_AFTER);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
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
      <svg className="back-to-top__arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" strokeLinecap="square" />
      </svg>
    </button>
  );
}
