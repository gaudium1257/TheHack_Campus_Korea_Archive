import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/types";
import { getProjectCode, getSession } from "@/lib/archive";

export function ProjectCover({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <div className={`cover${large ? " cover--lg" : ""}`} aria-hidden="true">
      <span className="cover__code">{getProjectCode(project)}</span>
      <span className="cover__title">{project.title}</span>
    </div>
  );
}

export function ProjectCard({ project, showSession = true }: { project: Project; showSession?: boolean }) {
  const session = getSession(project.session);
  return (
    <article className="project-card">
      <div className="project-card__media">
        {project.image ? (
          <Image src={project.image} alt="" width={1280} height={800} sizes="(max-width: 700px) 100vw, 400px" />
        ) : (
          <ProjectCover project={project} />
        )}
      </div>
      <div className="project-card__body">
        <span className="project-card__code">
          {getProjectCode(project)}
          {showSession && session ? ` · ${session.label}` : ""}
        </span>
        <h3 className="project-card__title">
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        <p className="project-card__summary">{project.summary}</p>
        <p className="project-card__members">{project.members.join(" · ")}</p>
      </div>
    </article>
  );
}

export function EmptyProjects({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="empty">
      <span className="eyebrow eyebrow--rose">준비 중</span>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}
