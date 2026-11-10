import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "소개",
  description: "THE해커톤 : CAMPUS와 Atlas Univ 연합, 고려대 지부의 운영 방식과 커리큘럼.",
};

const WEEKS = Array.from({ length: 10 }, (_, i) => i + 1);

export default function AboutPage() {
  return (
    <>
      <header className="page-head">
        <div className="horizon horizon--low" />
        <div className="container page-head__inner">
          <span className="eyebrow eyebrow--rose">About</span>
          <h1>만들고, 배포하고, 증명하는 학회</h1>
          <p>
            THE해커톤 : CAMPUS는 서울대 · 연세대 · 고려대 · KAIST가 함께하는 연합 빌더 커뮤니티 Atlas Univ의 학교별 활동입니다. 고려대 지부는 2026년 2학기에
            시작했습니다.
          </p>
        </div>
      </header>

      <section className="section" style={{ borderTop: 0, paddingTop: 0 }}>
        <div className="container section__grid">
          <div className="section__head">
            <span className="eyebrow">Mission</span>
            <h2>무엇을 하나요</h2>
          </div>
          <div className="section__body prose">
            <p>
              학교별로 해커톤을 진행해, <strong>실제 문제를 해결하는 앱과 서비스를 직접 기획하고 만듭니다.</strong> 만든 것은 멘토의 피드백으로 개선하고
              발표하며 경쟁합니다.
            </p>
            <p>
              아이디어를 나누는 데서 그치지 않고, 학생들이 실제로 쓸 수 있는 서비스를 만들어 배포하고 실제 사용자 반응을 확인하는 것이 목표입니다. 바이브코딩이나
              해커톤이 처음이어도, 전공과 코딩 경험에 상관없이 함께합니다.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container section__grid">
          <div className="section__head">
            <span className="eyebrow">Programs</span>
            <h2>세 가지 프로그램</h2>
            <p>학교 안의 운영과 연합 활동을 연결합니다.</p>
          </div>
          <div className="section__body">
            <div className="pillars">
              <div>
                <span className="eyebrow">THE해커톤</span>
                <h3>실전 해커톤</h3>
                <p>실전 해커톤과 학교 간 연결, 외부 협력의 기회를 설계합니다.</p>
              </div>
              <div>
                <span className="eyebrow here">CAMPUS · 이 아카이브</span>
                <h3>학교별 정기 활동</h3>
                <p>학교별 구성원이 정기 모임과 프로젝트를 주도하는 대학생 활동입니다.</p>
              </div>
              <div>
                <span className="eyebrow">DREAMERS</span>
                <h3>배움을 나누는 멘토링</h3>
                <p>배운 것을 중고등학생에게 나누는 AI 교육 · 멘토링 활동입니다. 해커톤 세션을 거친 학회원이 멘토로 참여합니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container section__grid">
          <div className="section__head">
            <span className="eyebrow">Curriculum</span>
            <h2>한 학기 10주</h2>
            <p>바이브코딩 교육으로 기본기를 다진 뒤 매주 한 번 정기 세션을 엽니다.</p>
          </div>
          <div className="section__body">
            <div className="timeline" aria-hidden="true">
              {WEEKS.map((w) => (
                <span key={w} className={`timeline__week ${w <= 6 ? "timeline__week--pre" : "timeline__week--heat"}`} />
              ))}
            </div>
            <div className="timeline__labels">
              <div>
                <span className="eyebrow">1–6주 · Pre-Heat</span>
                <h3>학교별 해커톤 세션</h3>
                <p>세션 두 번을 묶어 2주 단위 해커톤을 세 번 반복하며 실력과 팀워크를 쌓습니다.</p>
              </div>
              <div>
                <span className="eyebrow eyebrow--rose">7–10주 · Heat</span>
                <h3>Heat Project</h3>
                <p>학교 지부별로 경쟁합니다. 학생들이 실제로 쓸 서비스를 기획 · 제작 · 배포하고, 사용 수와 수익을 겨룹니다.</p>
              </div>
            </div>
            <div className="cycle">
              <div>
                <span className="eyebrow">첫 주</span>
                <h3>주제 공유 · 팀 배정</h3>
                <p>주제를 공유하고 팀을 랜덤으로 배정한 뒤 초기 빌딩을 시작합니다.</p>
              </div>
              <div>
                <span className="eyebrow">주중</span>
                <h3>중간 멘토링</h3>
                <p>현업 멘토에게 방향과 구현에 대한 피드백을 받습니다.</p>
              </div>
              <div>
                <span className="eyebrow">둘째 주</span>
                <h3>발표 · 피드백</h3>
                <p>결과물을 발표하고 피드백을 받아 다음 사이클로 이어갑니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container section__grid">
          <div className="section__head">
            <span className="eyebrow">Network</span>
            <h2>함께하는 사람들</h2>
          </div>
          <div className="section__body prose">
            <p>IT · AI · 창업 분야의 다양한 학회원과 협업하고, 토스 PO, 600만 다운로드 앱 제작자, YC F25 창업자 등 현업 멘토와 교류합니다.</p>
            <p>
              <Link className="arrow-link" href="/members">
                고려대 지부 학회원 보기
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
