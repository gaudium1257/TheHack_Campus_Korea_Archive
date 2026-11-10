import Link from "next/link";

/** 슬라이드의 선으로 그린 THE 로고를 단순화한 표시 */
export function TheMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 116 22" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="square">
        <path d="M1 1H33M17 1V21" />
        <path d="M41 1V21M75 1V21M41 11H75" />
        <path d="M83 1V21M83 1H115M83 11H112M83 21H115" />
      </g>
    </svg>
  );
}

export function Wordmark() {
  return (
    <Link href="/" className="wordmark" aria-label="THE해커톤 CAMPUS 아카이브 홈">
      <TheMark className="wordmark__the" />
      <span className="wordmark__text">
        <span className="wordmark__name">해커톤 : CAMPUS</span>
        <span className="wordmark__sub">Korea University Archive</span>
      </span>
    </Link>
  );
}
