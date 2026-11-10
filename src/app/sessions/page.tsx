import type { Metadata } from "next";
import { SessionRegister } from "@/components/SessionRegister";
import { getSessions } from "@/lib/archive";

export const metadata: Metadata = {
  title: "세션 기록",
  description: "THE해커톤 : CAMPUS 고려대 지부 정규 세션의 주제, 실습 과제, 슬라이드 기록.",
};

export default function SessionsPage() {
  const sessions = getSessions();
  return (
    <>
      <header className="page-head">
        <div className="horizon horizon--low" />
        <div className="container page-head__inner">
          <span className="eyebrow eyebrow--rose">Sessions · {sessions.length}</span>
          <h1>세션 기록</h1>
          <p>매주 한 번 열리는 정규 세션의 기록입니다. 세션마다 다룬 내용, 실습 과제와 확인 기준, 당일 슬라이드, 학회원 결과물을 함께 남깁니다.</p>
        </div>
      </header>
      <section className="section" style={{ paddingTop: 0, borderTop: 0 }}>
        <div className="container">
          <SessionRegister sessions={sessions} />
        </div>
      </section>
    </>
  );
}
