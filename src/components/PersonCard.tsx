import Link from "next/link";
import type { Member } from "@/content/types";
import { getProjectCode, getProjectsByMember } from "@/lib/archive";

/** 학회원 칸. compact는 홈에서 쓰는 짧은 형태(결과물 수만 표시) */
export function PersonCard({ member, compact = false }: { member: Member; compact?: boolean }) {
  const works = getProjectsByMember(member.name);
  if (compact) {
    return (
      <li className="person person--compact">
        <Link href={`/members#${encodeURIComponent(member.name)}`}>
          <span className="person__name">{member.name}</span>
          {member.major && <span className="person__major">{member.major}</span>}
          <span className="person__count mono">{member.role === "운영진" ? "운영진" : works.length > 0 ? `결과물 ${works.length}` : "—"}</span>
        </Link>
      </li>
    );
  }
  return (
    <li className="person" id={member.name}>
      <span className="person__name">{member.name}</span>
      {member.major && <span className="person__major">{member.major}</span>}
      {member.duty && <span className="person__duty">{member.duty}</span>}
      {works.length > 0 ? (
        <ul className="person__works">
          {works.map((p) => (
            <li key={p.slug}>
              <Link href={`/projects/${p.slug}`}>
                <span className="mono">{getProjectCode(p)}</span>
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        member.role === "학회원" && <span className="person__none">결과물 정리 중</span>
      )}
    </li>
  );
}
