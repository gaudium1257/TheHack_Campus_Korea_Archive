"use client";

import { useEffect, useRef, useState } from "react";

const FRAME_W = 1280;
const FRAME_H = 800;

/**
 * 결과물 사이트의 첫 화면을 카드 썸네일로 띄웁니다.
 * 1280×800 데스크톱 크기로 그린 뒤 카드 폭에 맞게 줄이고, 조작은 막아 카드 클릭이 그대로 동작하게 합니다.
 * 카드가 화면 가까이 왔을 때만 불러오고, 불러오기 전에는 children(표지)을 보여줍니다.
 */
export function LiveThumb({ url, children }: { url: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / FRAME_W));
    ro.observe(el);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  // load 이벤트가 오지 않는 사이트도 있으므로 일정 시간 뒤에는 그냥 보여줍니다
  useEffect(() => {
    if (!visible || loaded) return;
    const t = setTimeout(() => setLoaded(true), 8000);
    return () => clearTimeout(t);
  }, [visible, loaded]);

  return (
    <div ref={ref} className="live-thumb">
      {!loaded && <div className="live-thumb__cover">{children}</div>}
      {visible && scale > 0 && (
        <div className="live-thumb__frame" style={{ transform: `scale(${scale})` }}>
          <iframe
            src={url}
            title=""
            aria-hidden="true"
            tabIndex={-1}
            loading="lazy"
            scrolling="no"
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-scripts allow-same-origin"
            width={FRAME_W}
            height={FRAME_H}
            onLoad={() => setLoaded(true)}
            data-loaded={loaded}
          />
        </div>
      )}
    </div>
  );
}
