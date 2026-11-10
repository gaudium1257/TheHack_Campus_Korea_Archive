"use client";

import { useEffect, useState } from "react";

type Device = "desktop" | "mobile";

/** 결과물 사이트를 페이지 안에 띄우는 창. 사이트가 막혀 있으면 fallback을 보여줍니다. */
export function LiveEmbed({ url, title, host, fallback }: { url: string; title: string; host: string; fallback: React.ReactNode }) {
  const [device, setDevice] = useState<Device>("desktop");
  const [loaded, setLoaded] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  // 하이드레이션 전에 iframe이 먼저 로드되면 onLoad를 놓치므로, 마운트한 뒤에 iframe을 붙입니다
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // 일부 사이트는 load 이벤트가 늦거나 오지 않으므로 일정 시간 뒤에는 그냥 보여줍니다
  useEffect(() => {
    if (!mounted || loaded) return;
    const t = setTimeout(() => setLoaded(true), 8000);
    return () => clearTimeout(t);
  }, [mounted, loaded, reloadKey]);

  return (
    <div className={`live live--${device}`}>
      <div className="live__bar">
        <span className="live__dot" aria-hidden="true" />
        <span className="live__host mono">{host}</span>
        <div className="live__actions">
          <div className="live__toggle" role="group" aria-label="보기 크기">
            <button type="button" aria-pressed={device === "desktop"} onClick={() => setDevice("desktop")}>
              데스크톱
            </button>
            <button type="button" aria-pressed={device === "mobile"} onClick={() => setDevice("mobile")}>
              모바일
            </button>
          </div>
          <button
            type="button"
            className="live__icon"
            onClick={() => {
              setLoaded(false);
              setReloadKey((k) => k + 1);
            }}
            aria-label="다시 불러오기"
          >
            ↻
          </button>
          <a className="live__open" href={url} target="_blank" rel="noopener">
            새 창에서 열기
          </a>
        </div>
      </div>
      <div className="live__stage">
        <div className="live__viewport">
          {!loaded && <div className="live__placeholder">{fallback}</div>}
          {mounted && (
          <iframe
            key={reloadKey}
            src={url}
            title={`${title} 실행 화면`}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals allow-downloads"
            allow="clipboard-write; fullscreen; geolocation"
            onLoad={() => setLoaded(true)}
            data-loaded={loaded}
          />
          )}
        </div>
      </div>
      <p className="live__hint">학회원이 배포한 실제 서비스입니다. 화면 안에서 바로 써 볼 수 있고, 로그인 같은 일부 기능은 새 창에서 열어야 동작할 수 있습니다.</p>
    </div>
  );
}
