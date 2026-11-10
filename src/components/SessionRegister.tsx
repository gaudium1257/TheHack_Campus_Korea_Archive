import Image from "next/image";
import Link from "next/link";
import type { Session } from "@/content/types";
import { formatHeldAt, getProjectsBySession } from "@/lib/archive";

export function SessionRegister({ sessions }: { sessions: Session[] }) {
  return (
    <ol className="register">
      {sessions.map((s) => {
        const when = formatHeldAt(s.heldAt);
        const count = getProjectsBySession(s.slug).length;
        return (
          <li className="register__row" key={s.slug}>
            <span className="register__code">{s.code}</span>
            <span className="register__date">
              {when ? (
                <>
                  {when.date}
                  <small>
                    {when.weekday} {when.time}
                  </small>
                </>
              ) : (
                "일정 미정"
              )}
            </span>
            <div className="register__main">
              <span className="register__label">{s.label}</span>
              <h3 className="register__title">
                <Link href={`/sessions/${s.slug}`}>{s.title}</Link>
              </h3>
              <p className="register__sub">{s.subtitle}</p>
              <div className="register__meta">
                <span>{s.format}</span>
                <span>슬라이드 {s.slides.pageCount}쪽</span>
                {s.collectsProjects && <span>결과물 {count > 0 ? `${count}개` : "정리 중"}</span>}
              </div>
            </div>
            <div className="register__cover">
              <Image src={`${s.slides.imageDir}/p-01.jpg`} alt="" width={1600} height={900} sizes="176px" />
            </div>
          </li>
        );
      })}
    </ol>
  );
}
