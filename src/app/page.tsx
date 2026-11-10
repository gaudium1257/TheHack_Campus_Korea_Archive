import Link from "next/link";
import { EmptyProjects, ProjectCard } from "@/components/ProjectCard";
import { SessionRegister } from "@/components/SessionRegister";
import { site } from "@/content/site";
import { getProjects, getSessions, getStats } from "@/lib/archive";

// 결과물 카드의 사이트 상태를 한 시간마다 새로 확인합니다
export const revalidate = 3600;

export default function HomePage() {
  const stats = getStats();
  const sessions = getSessions();
  const recent = getProjects().slice(0, 6);

  return (
    <>
      <section className="hero">
        <div className="horizon" />
        <div className="container hero__inner">
          <span className="eyebrow eyebrow--rose">THE해커톤 : CAMPUS · {site.chapter} 지부 아카이브</span>
          <h1 className="hero__title">
            고대,
            <br />
            <em>만드는</em> 사람들
          </h1>
          <p className="hero__lead">
            고대에서 시작해, 세상에 내놓을 것을 만듭니다. 정규 세션의 기록과 학회원이 직접 만들고 배포한 서비스를 이곳에 남깁니다.
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

      <section className="section">
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

      <section className="section">
        <div className="container section__grid">
          <div className="section__head section__head--sticky">
            <span className="eyebrow">Works</span>
            <h2>최근 결과물</h2>
            <p>학회원이 세션에서 만들고 배포한 서비스입니다.</p>
            {recent.length > 0 && (
              <Link className="arrow-link" href="/projects">
                모든 결과물
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

      <section className="closing">
        <div className="horizon horizon--low" />
        <div className="container closing__inner">
          <span className="eyebrow eyebrow--rose">Korea University · Builders</span>
          <h2>고대에서 만들고, 캠퍼스 밖에서 증명합니다</h2>
          <p>2주 단위의 짧은 해커톤으로 기본기를 쌓고, 학기 후반에는 학교에서 실제로 쓰일 서비스를 만들어 배포합니다.</p>
          <Link className="arrow-link" href="/about">
            학회 소개
          </Link>
        </div>
      </section>
    </>
  );
}
