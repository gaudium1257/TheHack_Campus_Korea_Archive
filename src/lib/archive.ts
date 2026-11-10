import { members } from "@/content/members";
import { projects } from "@/content/projects";
import { sessions } from "@/content/sessions";
import type { Member, Project, Session } from "@/content/types";

/** 최신 세션이 먼저 오도록 정렬한 목록 */
export function getSessions(): Session[] {
  return [...sessions].sort((a, b) => b.code.localeCompare(a.code));
}

/** 진행 순서(오래된 것 먼저) */
export function getSessionsChronological(): Session[] {
  return [...sessions].sort((a, b) => a.code.localeCompare(b.code));
}

export function getSession(slug: string): Session | undefined {
  return sessions.find((s) => s.slug === slug);
}

export function getAdjacentSessions(slug: string) {
  const list = getSessionsChronological();
  const i = list.findIndex((s) => s.slug === slug);
  return { prev: i > 0 ? list[i - 1] : undefined, next: i >= 0 && i < list.length - 1 ? list[i + 1] : undefined };
}

export function getProjects(): Project[] {
  const order = new Map(getSessions().map((s, i) => [s.slug, i]));
  return projects
    .map((p, i) => ({ p, i }))
    .sort((a, b) => (order.get(a.p.session) ?? 99) - (order.get(b.p.session) ?? 99) || a.i - b.i)
    .map(({ p }) => p);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsBySession(sessionSlug: string): Project[] {
  return projects.filter((p) => p.session === sessionSlug);
}

export function getProjectsByMember(name: string): Project[] {
  return getProjects().filter((p) => p.members.includes(name));
}

/** 세션 안에서의 순번으로 만든 카탈로그 번호. 예: S02-07 */
export function getProjectCode(project: Project): string {
  const session = getSession(project.session);
  const index = getProjectsBySession(project.session).findIndex((p) => p.slug === project.slug) + 1;
  return `${session?.code ?? "S??"}-${String(index).padStart(2, "0")}`;
}

export function getMembers(): { staff: Member[]; members: Member[] } {
  const byName = (a: Member, b: Member) => a.name.localeCompare(b.name, "ko");
  return {
    staff: members.filter((m) => m.role === "운영진").sort(byName),
    members: members.filter((m) => m.role === "학회원").sort(byName),
  };
}

export function getMember(name: string): Member | undefined {
  return members.find((m) => m.name === name);
}

export function getStats() {
  return {
    sessions: sessions.length,
    projects: projects.length,
    members: members.length,
  };
}

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

/** "2026-11-02T18:30" → { date: "2026.11.02", weekday: "월", time: "18:30" } */
export function formatHeldAt(heldAt: string | null) {
  if (!heldAt) return null;
  const [d, t] = heldAt.split("T");
  const [y, m, day] = d.split("-").map(Number);
  const weekday = WEEKDAYS[new Date(Date.UTC(y, m - 1, day)).getUTCDay()];
  return {
    date: `${y}.${String(m).padStart(2, "0")}.${String(day).padStart(2, "0")}`,
    short: `${String(m).padStart(2, "0")}.${String(day).padStart(2, "0")}`,
    weekday,
    time: t ?? "",
  };
}

export function slidePages(session: Session): string[] {
  return Array.from({ length: session.slides.pageCount }, (_, i) => `${session.slides.imageDir}/p-${String(i + 1).padStart(2, "0")}.jpg`);
}

export function hostOf(url: string): string {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}
