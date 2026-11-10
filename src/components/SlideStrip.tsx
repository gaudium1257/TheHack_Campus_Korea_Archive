"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export function SlideStrip({ pages, title, pdf }: { pages: string[]; title: string; pdf: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const step = useCallback((d: number) => setIndex((i) => Math.min(pages.length - 1, Math.max(0, i + d))), [pages.length]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (!dialog.open) return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  const num = (i: number) => String(i + 1).padStart(2, "0");

  return (
    <div className="slides">
      <div className="slides__bar">
        <span className="eyebrow">{pages.length}쪽 · 눌러서 크게 보기</span>
        <a className="arrow-link arrow-link--out" href={pdf} target="_blank" rel="noopener">
          PDF로 보기
        </a>
      </div>
      <div className="slides__track" tabIndex={0} aria-label={`${title} 슬라이드`}>
        {pages.map((src, i) => (
          <figure className="slides__item" key={src}>
            <button type="button" onClick={() => open(i)} aria-label={`${i + 1}쪽 크게 보기`}>
              <Image src={src} alt={`${title} 슬라이드 ${i + 1}쪽`} width={1600} height={900} sizes="380px" loading="lazy" />
            </button>
            <figcaption>P.{num(i)}</figcaption>
          </figure>
        ))}
      </div>
      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label="슬라이드 크게 보기"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
      >
        <div className="lightbox__frame">
          <Image src={pages[index]} alt={`${title} 슬라이드 ${index + 1}쪽`} width={1600} height={900} sizes="96vw" />
          <div className="lightbox__bar">
            <span>
              P.{num(index)} / {num(pages.length - 1)}
            </span>
            <div>
              <button type="button" onClick={() => step(-1)} disabled={index === 0}>
                이전
              </button>
              <button type="button" onClick={() => step(1)} disabled={index === pages.length - 1}>
                다음
              </button>
              <button type="button" onClick={() => dialogRef.current?.close()}>
                닫기
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}
