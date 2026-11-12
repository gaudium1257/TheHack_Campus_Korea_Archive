import Link from "next/link";
import type { Member } from "@/content/types";
import { getProjectCode, getProjectsByMember } from "@/lib/archive";

/** 이름 오른쪽의 작은 외부 링크 버튼 */
function PersonLink({ member }: { member: Member }) {
  if (!member.link) return null;
  return (
    <a
      className="person__link"
      href={member.link.url}
      target="_blank"
      rel="noopener"
      aria-label={`${member.name} ${member.link.label} (새 창)`}
      title={member.link.label}
    >
      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
        <path d="M3.5 8.5 8.5 3.5M4.5 3.5h4v4" strokeLinecap="square" />
      </svg>
    </a>
  );
}

/** 학회원 칸. compact는 홈에서 쓰는 짧은 형태(결과물 수만 표시) */
export function PersonCard({ member, compact = false }: { member: Member; compact?: boolean }) {
  const works = getProjectsByMember(member.name);
  if (compact) {
    return (
      <li className="person person--compact">
        {/* 이름 링크가 칸 전체를 덮고(::after), 포트폴리오 버튼만 그 위에 따로 눌립니다 */}
        <span className="person__head">
          <Link className="person__name person__cover-link" href={`/members#${encodeURIComponent(member.name)}`}>
            {member.name}
          </Link>
          <PersonLink member={member} />
        </span>
        {member.major && <span className="person__major">{member.major}</span>}
        <span className="person__count mono">{member.role === "운영진" ? "운영진" : works.length > 0 ? `결과물 ${works.length}` : "—"}</span>
      </li>
    );
  }
  return (
    <li className="person" id={member.name}>
      <span className="person__head">
        <span className="person__name">{member.name}</span>
        <PersonLink member={member} />
      </span>
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
