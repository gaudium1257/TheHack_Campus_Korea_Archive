import type { Metadata } from "next";
import { PersonCard } from "@/components/PersonCard";
import { getMembers } from "@/lib/archive";

export const metadata: Metadata = {
  title: "학회원",
  description: "THE해커톤 : CAMPUS 고려대 지부 운영진과 학회원.",
};

export default function MembersPage() {
  const { staff, members } = getMembers();
  return (
    <>
      <header className="page-head">
        <div className="horizon horizon--low" />
        <div className="container page-head__inner">
          <span className="eyebrow eyebrow--rose">People · {staff.length + members.length}</span>
          <h1>고려대, 만드는 사람들</h1>
          <p>전공과 경험에 상관없이 직접 만들어 보고 싶은 사람들이 모였습니다. 각자 세션에서 만든 결과물이 이름 아래에 쌓입니다.</p>
        </div>
      </header>

      <section className="section" style={{ borderTop: 0, paddingTop: 0 }}>
        <div className="container section__grid">
          <div className="section__head">
            <span className="eyebrow">Staff · {staff.length}</span>
            <h2>운영진</h2>
            <p>지부 운영과 개발 교육을 맡습니다.</p>
          </div>
          <div className="section__body">
            <ul className="people">
              {staff.map((m) => (
                <PersonCard key={m.name} member={m} />
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container section__grid">
          <div className="section__head section__head--sticky">
            <span className="eyebrow">Members · {members.length}</span>
            <h2>학회원</h2>
            <p>가나다순입니다.</p>
          </div>
          <div className="section__body">
            <ul className="people">
              {members.map((m) => (
                <PersonCard key={m.name} member={m} />
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
