import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EmptyProjects, ProjectCard } from "@/components/ProjectCard";
import { SlideStrip } from "@/components/SlideStrip";
import { sessions } from "@/content/sessions";
import { formatHeldAt, getAdjacentSessions, getProjectsBySession, getSession, slidePages } from "@/lib/archive";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return sessions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const session = getSession((await params).slug);
  if (!session) return {};
  return {
    title: `${session.label} · ${session.title}`,
    description: session.summary,
    openGraph: { images: [{ url: `${session.slides.imageDir}/p-01.jpg`, width: 1600, height: 900 }] },
  };
}

export default async function SessionPage({ params }: Props) {
  const session = getSession((await params).slug);
  if (!session) notFound();

  const when = formatHeldAt(session.heldAt);
  const works = getProjectsBySession(session.slug);
  const { prev, next } = getAdjacentSessions(session.slug);
  const num = session.code.replace("S", "");

  return (
    <>
      <header className="session-head">
        <div className="horizon horizon--low" />
        <div className="container session-head__grid">
          <div className="session-head__text">
            <nav className="breadcrumb" aria-label="위치">
              <Link href="/sessions">세션 기록</Link>
              <span aria-hidden="true">/</span>
              <span>{session.label}</span>
            </nav>
            <div className="session-head__code">
              <span className="num">{num}</span>
              <span className="eyebrow eyebrow--rose">{session.label === "OT" ? "Orientation" : `Session ${num}`}</span>
            </div>
            <h1>{session.title}</h1>
            <p className="session-head__sub">{session.subtitle}</p>
          </div>
          <div className="session-head__cover">
            <Image src={`${session.slides.imageDir}/p-01.jpg`} alt={`${session.title} 표지`} width={1600} height={900} priority sizes="(max-width: 860px) 100vw, 520px" />
          </div>
        </div>
      </header>

      <div className="container">
        <dl className="spec">
          <div>
            <dt>일시</dt>
            <dd>{when ? `${when.date} (${when.weekday}) ${when.time}` : "일정 미정"}</dd>
          </div>
          <div>
            <dt>진행</dt>
            <dd>{session.format}</dd>
          </div>
          <div>
            <dt>결과물</dt>
            <dd>{session.collectsProjects ? (works.length > 0 ? `${works.length}개` : "정리 중") : "해당 없음"}</dd>
          </div>
          <div>
            <dt>자료</dt>
            <dd>
              <a className="text-link" href={session.slides.pdf} target="_blank" rel="noopener">
                슬라이드 PDF
              </a>
            </dd>
          </div>
        </dl>
      </div>

      <section className="section" style={{ borderTop: 0 }}>
        <div className="container section__grid">
          <div className="section__head">
            <span className="eyebrow">Overview</span>
            <h2>개요</h2>
          </div>
          <div className="section__body prose">
            <p>{session.summary}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container section__grid">
          <div className="section__head section__head--sticky">
            <span className="eyebrow">Agenda</span>
            <h2>다룬 내용</h2>
            <p>세션에서 설명한 순서대로 적었습니다.</p>
          </div>
          <div className="section__body">
            <ol className="steps">
              {session.agenda.map((a) => (
                <li key={a.title}>
                  <div>
                    <h3>{a.title}</h3>
                    <p>{a.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {session.practice && (
        <section className="section">
          <div className="container section__grid">
            <div className="section__head section__head--sticky">
              <span className="eyebrow">Practice</span>
              <h2>실습</h2>
              <p>{session.format}</p>
            </div>
            <div className="section__body practice">
              <h3 className="practice__title">{session.practice.title}</h3>
              <p className="practice__brief">{session.practice.brief}</p>
              <div className="tiles">
                {session.practice.items.map((item) => (
                  <div key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                ))}
              </div>
              {session.practice.challenge && (
                <p className="challenge">
                  <span className="eyebrow">도전 과제</span>
                  <span>{session.practice.challenge}</span>
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {session.checklist && (
        <section className="section">
          <div className="container section__grid">
            <div className="section__head">
              <span className="eyebrow">Criteria</span>
              <h2>확인 기준</h2>
              <p>시연 화면만 보지 않고, 실제로 동작하는지 이 기준으로 확인했습니다.</p>
            </div>
            <div className="section__body">
              <ul className="checklist">
                {session.checklist.map((c) => (
                  <li key={c.title}>
                    <strong>{c.title}</strong>
                    <span>{c.body}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <div className="section__head" style={{ marginBottom: 28 }}>
            <span className="eyebrow">Slides</span>
            <h2>당일 슬라이드</h2>
          </div>
          <SlideStrip pages={slidePages(session)} title={session.title} pdf={session.slides.pdf} />
        </div>
      </section>

      {session.collectsProjects && (
        <section className="section" id="works">
          <div className="container section__grid">
            <div className="section__head section__head--sticky">
              <span className="eyebrow">Works · {works.length}</span>
              <h2>이 세션의 결과물</h2>
              <p>학회원이 이 세션에서 만들고 배포한 서비스입니다.</p>
            </div>
            <div className="section__body">
              {works.length > 0 ? (
                <div className="project-grid">
                  {works.map((p) => (
                    <ProjectCard key={p.slug} project={p} showSession={false} />
                  ))}
                </div>
              ) : (
                <EmptyProjects title="결과물을 정리하고 있습니다">
                  학회원에게 받은 결과물을 정리하는 대로 이곳에 올라옵니다.
                </EmptyProjects>
              )}
            </div>
          </div>
        </section>
      )}

      <div className="container">
        <nav className="pager" aria-label="다른 세션">
          {prev ? (
            <Link href={`/sessions/${prev.slug}`}>
              <span className="eyebrow">← 이전 · {prev.label}</span>
              <span className="pager__title">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/sessions/${next.slug}`} className="pager__next">
              <span className="eyebrow">다음 · {next.label} →</span>
              <span className="pager__title">{next.title}</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </>
  );
}
