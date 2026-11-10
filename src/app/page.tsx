import Link from "next/link";
import { PersonCard } from "@/components/PersonCard";
import { EmptyProjects, ProjectCard } from "@/components/ProjectCard";
import { SessionRegister } from "@/components/SessionRegister";
import { site } from "@/content/site";
import { getMembers, getProjects, getSessions, getStats } from "@/lib/archive";

const WEEKS = Array.from({ length: 10 }, (_, i) => i + 1);

// 결과물 카드의 사이트 상태를 한 시간마다 새로 확인합니다
export const revalidate = 3600;

export default function HomePage() {
  const stats = getStats();
  const sessions = getSessions();
  const recent = getProjects().slice(0, 6);
  const { staff, members } = getMembers();

  return (
    <>
      <section className="hero">
        <div className="horizon" />
        <div className="container hero__inner">
          <span className="eyebrow eyebrow--rose">THE해커톤 : CAMPUS · {site.chapter} 지부 아카이브</span>
          <h1 className="hero__title">
            고려대,
            <br />
            <em>만드는</em> 사람들
          </h1>
          <p className="hero__lead">
            고려대에서 시작해, 세상에 내놓을 것을 만듭니다. 정규 세션의 기록과 학회원이 직접 만들고 배포한 서비스를 이곳에 남깁니다.
          </p>
          <dl className="facts">
            <div>
              <dt>세션</dt>
              <dd>{String(stats.sessions).padStart(2, "0")}</dd>
            </div>
            <div>
              <dt>결과물</dt>
              <dd>{String(stats.projects).padStart(2, "0")}</dd>
            </div>
            <div>
              <dt>학회원</dt>
              <dd>{String(stats.members).padStart(2, "0")}</dd>
            </div>
            <div>
              <dt>학기</dt>
              <dd>{site.termCode}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section" id="sessions">
        <div className="container section__grid">
          <div className="section__head section__head--sticky">
            <span className="eyebrow">Sessions</span>
            <h2>세션 기록</h2>
            <p>정규 세션마다 다룬 내용과 실습 과제, 슬라이드를 남깁니다. 최신 세션이 위에 있습니다.</p>
            <Link className="arrow-link" href="/sessions">
              전체 세션
            </Link>
          </div>
          <div className="section__body">
            <SessionRegister sessions={sessions} />
          </div>
        </div>
      </section>

      <section className="section" id="works">
        <div className="container section__grid">
          <div className="section__head section__head--sticky">
            <span className="eyebrow">Works · {stats.projects}</span>
            <h2>결과물</h2>
            <p>학회원이 세션에서 만들고 배포한 서비스입니다. 최근 것부터 보여줍니다.</p>
            {recent.length > 0 && (
              <Link className="arrow-link" href="/projects">
                모든 결과물 {stats.projects}개
              </Link>
            )}
          </div>
          <div className="section__body">
            {recent.length > 0 ? (
              <div className="project-grid">
                {recent.map((p) => (
                  <ProjectCard key={p.slug} project={p} />
                ))}
              </div>
            ) : (
              <EmptyProjects title="결과물을 정리하고 있습니다">
                학회원이 만든 서비스를 모으는 중입니다. 정리되는 대로 세션별로 이곳에 올라옵니다.
              </EmptyProjects>
            )}
          </div>
        </div>
      </section>

      <section className="section" id="members">
        <div className="container section__grid">
          <div className="section__head section__head--sticky">
            <span className="eyebrow">People · {stats.members}</span>
            <h2>학회원</h2>
            <p>운영진 {staff.length}명과 학회원 {members.length}명입니다. 이름을 누르면 각자 만든 결과물을 볼 수 있습니다.</p>
            <Link className="arrow-link" href="/members">
              학회원 전체
            </Link>
          </div>
          <div className="section__body">
            <ul className="people people--compact">
              {[...staff, ...members].map((m) => (
                <PersonCard key={m.name} member={m} compact />
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="container section__grid">
          <div className="section__head section__head--sticky">
            <span className="eyebrow">About</span>
            <h2>소개</h2>
            <p>서울대 · 연세대 · 고려대 · KAIST가 함께하는 연합 빌더 커뮤니티 Atlas Univ의 학교별 활동입니다.</p>
            <Link className="arrow-link" href="/about">
              학회 소개 전체
            </Link>
          </div>
          <div className="section__body home-about">
            <p className="home-about__lead">
              학교별로 해커톤을 진행해 실제 문제를 해결하는 앱과 서비스를 직접 기획하고 만듭니다. 멘토의 피드백으로 개선하고, 발표하며 경쟁합니다.
            </p>
            <div className="pillars">
              <div>
                <span className="eyebrow">THE해커톤</span>
                <h3>실전 해커톤</h3>
                <p>실전 해커톤과 학교 간 연결, 외부 협력의 기회를 설계합니다.</p>
              </div>
              <div>
                <span className="eyebrow here">CAMPUS · 이 아카이브</span>
                <h3>학교별 정기 활동</h3>
                <p>학교별 구성원이 정기 모임과 프로젝트를 주도합니다.</p>
              </div>
              <div>
                <span className="eyebrow">DREAMERS</span>
                <h3>배움을 나누는 멘토링</h3>
                <p>배운 것을 중고등학생에게 나누는 AI 교육 · 멘토링입니다.</p>
              </div>
            </div>
            <div>
              <div className="timeline" aria-hidden="true">
                {WEEKS.map((w) => (
                  <span key={w} className={`timeline__week ${w <= 6 ? "timeline__week--pre" : "timeline__week--heat"}`} />
                ))}
              </div>
              <div className="timeline__labels">
                <div>
                  <span className="eyebrow">1–6주 · Pre-Heat</span>
                  <h3>학교별 해커톤 세션</h3>
                  <p>세션 두 번을 묶은 2주 해커톤을 반복하며 실력과 팀워크를 쌓습니다.</p>
                </div>
                <div>
                  <span className="eyebrow eyebrow--rose">7–10주 · Heat</span>
                  <h3>Heat Project</h3>
                  <p>학교에서 실제로 쓸 서비스를 만들어 배포하고, 사용 수와 수익을 겨룹니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="closing">
        <div className="horizon horizon--low" />
        <div className="container closing__inner">
          <span className="eyebrow eyebrow--rose">Korea University · Builders</span>
          <h2>고려대에서 만들고, 캠퍼스 밖에서 증명합니다</h2>
          <p>다음으로 보여줄 결과물은, 여러분 것입니다.</p>
        </div>
      </section>
    </>
  );
}
