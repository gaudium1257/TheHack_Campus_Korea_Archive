import Link from "next/link";
import { getSessions } from "@/lib/archive";
import { site } from "@/content/site";
import { TheMark } from "./Wordmark";

export function SiteFooter() {
  const sessions = getSessions();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div>
            <TheMark className="wordmark__the" />
            <p className="site-footer__statement">고려대에서 만들고, 캠퍼스 밖에서 증명합니다.</p>
          </div>
          <div className="site-footer__cols">
            <div>
              <h3>아카이브</h3>
              <ul>
                <li><Link href="/sessions">세션 기록</Link></li>
                <li><Link href="/projects">결과물</Link></li>
                <li><Link href="/members">학회원</Link></li>
                <li><Link href="/about">소개</Link></li>
              </ul>
            </div>
            <div>
              <h3>세션</h3>
              <ul>
                {sessions.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/sessions/${s.slug}`}>{s.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>연합</h3>
              <ul>
                <li>Atlas Univ</li>
                <li>서울대 · 연세대</li>
                <li>고려대 · KAIST</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="site-footer__bottom">
          <span>THE해커톤 : CAMPUS · {site.chapter} 지부</span>
          <span className="site-footer__end">
            <span>{site.term}</span>
            <a href="#top" className="to-top">
              맨 위로 ↑
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
