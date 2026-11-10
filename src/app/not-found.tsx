import Link from "next/link";

export default function NotFound() {
  return (
    <header className="page-head">
      <div className="horizon horizon--low" />
      <div className="container page-head__inner">
        <span className="eyebrow eyebrow--rose">404</span>
        <h1>기록을 찾을 수 없습니다</h1>
        <p>주소가 바뀌었거나 아직 공개되지 않은 기록입니다.</p>
        <Link className="arrow-link" href="/sessions">
          세션 기록으로
        </Link>
      </div>
    </header>
  );
}
