import type { Metadata } from "next";
import { EmptyProjects, ProjectCard } from "@/components/ProjectCard";
import { ProjectBrowser } from "@/components/ProjectBrowser";
import { getProjects, getProjectsBySession, getSessions } from "@/lib/archive";

export const metadata: Metadata = {
  title: "결과물",
  description: "THE해커톤 : CAMPUS 고려대 지부 학회원이 세션에서 만들고 배포한 서비스.",
};

export default function ProjectsPage() {
  const projects = getProjects();
  const options = getSessions()
    .filter((s) => s.collectsProjects)
    .map((s) => ({ slug: s.slug, label: s.label, count: getProjectsBySession(s.slug).length }))
    .filter((o) => o.count > 0);

  return (
    <>
      <header className="page-head">
        <div className="horizon horizon--low" />
        <div className="container page-head__inner">
          <span className="eyebrow eyebrow--rose">Works · {projects.length}</span>
          <h1>결과물</h1>
          <p>학회원이 세션에서 직접 만들고 배포한 서비스입니다. 카드를 누르면 만든 사람과 배포 링크, 세션 기록을 볼 수 있습니다.</p>
        </div>
      </header>
      <section className="section" style={{ paddingTop: 0, borderTop: 0 }}>
        <div className="container">
          {projects.length > 0 ? (
            <ProjectBrowser options={options} total={projects.length}>
              <div className="project-grid">
                {projects.map((p) => (
                  <div key={p.slug} data-session={p.session}>
                    <ProjectCard project={p} />
                  </div>
                ))}
              </div>
            </ProjectBrowser>
          ) : (
            <EmptyProjects title="결과물을 정리하고 있습니다">
              학회원이 만든 서비스를 모으는 중입니다. 정리되는 대로 세션별로 이곳에 올라옵니다.
            </EmptyProjects>
          )}
        </div>
      </section>
    </>
  );
}
