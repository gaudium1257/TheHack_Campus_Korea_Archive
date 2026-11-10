import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LiveEmbed } from "@/components/LiveEmbed";
import { ProjectCover } from "@/components/ProjectCard";
import { projects } from "@/content/projects";
import { formatHeldAt, getMember, getProject, getProjectCode, getSession, hostOf } from "@/lib/archive";
import { checkEmbeddable, shouldEmbed } from "@/lib/embed";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
// 한 시간마다 다시 만들어 사이트 상태(오류·임베드 허용)를 새로 확인합니다
export const revalidate = 3600;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: project.image ? { images: [{ url: project.image }] } : undefined,
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const session = getSession(project.session);
  const when = formatHeldAt(session?.heldAt ?? null);
  const status = project.demoUrl ? await checkEmbeddable(project.demoUrl) : null;
  const canEmbed = project.demoUrl !== undefined && project.embed !== false && status !== null && shouldEmbed(status);

  const still = project.image ? (
    <Image src={project.image} alt={`${project.title} 화면`} width={1600} height={1000} priority sizes="(max-width: 1240px) 100vw, 1240px" />
  ) : (
    <ProjectCover project={project} large />
  );

  return (
    <>
      <div className="container">
        <header className="project-head">
          <nav className="breadcrumb" aria-label="위치">
            <Link href="/projects">결과물</Link>
            <span aria-hidden="true">/</span>
            <span>{getProjectCode(project)}</span>
          </nav>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
          {(project.demoUrl || project.repoUrl) && (
            <div className="buttons">
              {project.demoUrl && (
                <a className="button button--primary" href={project.demoUrl} target="_blank" rel="noopener">
                  서비스 열기 · {hostOf(project.demoUrl)}
                </a>
              )}
              {project.repoUrl && (
                <a className="button" href={project.repoUrl} target="_blank" rel="noopener">
                  GitHub
                </a>
              )}
            </div>
          )}
        </header>

        {canEmbed && project.demoUrl ? (
          <LiveEmbed url={project.demoUrl} title={project.title} host={hostOf(project.demoUrl)} fallback={<ProjectCover project={project} large />} />
        ) : (
          <div className="project-shot">{still}</div>
        )}
        {status === "unavailable" && (
          <p className="notice">지금은 서비스가 오류를 내고 있어 화면을 띄우지 않았습니다. 서비스가 복구되면 자동으로 다시 표시됩니다.</p>
        )}

        <dl className="spec" style={{ marginTop: 40 }}>
          <div>
            <dt>세션</dt>
            <dd>{session ? <Link className="text-link" href={`/sessions/${session.slug}`}>{session.label} · {session.title}</Link> : "—"}</dd>
          </div>
          <div>
            <dt>만든 사람</dt>
            <dd>
              {project.members.map((name, i) => (
                <span key={name}>
                  {i > 0 && " · "}
                  {getMember(name) ? <Link className="text-link" href={`/members#${encodeURIComponent(name)}`}>{name}</Link> : name}
                </span>
              ))}
            </dd>
          </div>
          <div>
            <dt>날짜</dt>
            <dd>{when ? when.date : "—"}</dd>
          </div>
          <div>
            <dt>키워드</dt>
            <dd>
              {project.tags.length > 0 ? (
                <span className="chips">
                  {project.tags.map((t) => (
                    <span className="chip" key={t}>{t}</span>
                  ))}
                </span>
              ) : (
                "—"
              )}
            </dd>
          </div>
        </dl>
      </div>

      {project.description && (
        <section className="section" style={{ borderTop: 0 }}>
          <div className="container section__grid">
            <div className="section__head">
              <span className="eyebrow">About</span>
              <h2>소개</h2>
            </div>
            <div className="section__body prose">
              {project.description.split(/\n\s*\n/).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </section>
      )}
      <div style={{ height: 80 }} />
    </>
  );
}
