import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectCover } from "@/components/ProjectCard";
import { projects } from "@/content/projects";
import { formatHeldAt, getMember, getProject, getProjectCode, getSession, hostOf } from "@/lib/archive";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

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

        <div className="project-shot">
          {project.image ? (
            <Image src={project.image} alt={`${project.title} 화면`} width={1600} height={1000} priority sizes="(max-width: 1240px) 100vw, 1240px" />
          ) : (
            <ProjectCover project={project} large />
          )}
        </div>

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
            <dt>사용한 것</dt>
            <dd>
              <span className="chips">
                {project.tags.map((t) => (
                  <span className="chip" key={t}>{t}</span>
                ))}
              </span>
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
