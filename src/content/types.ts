// 아카이브 콘텐츠의 형태. 나중에 Supabase로 옮길 때도 이 구조를 테이블로 그대로 씁니다.

export type Note = {
  title: string;
  body: string;
};

export type Session = {
  /** URL에 쓰는 이름. /sessions/[slug] */
  slug: string;
  /** 화면에 보이는 회차 이름. 예: "OT", "2회차" */
  label: string;
  /** 목록 정렬과 카탈로그 번호에 쓰는 코드. 예: "S00", "S02" */
  code: string;
  title: string;
  subtitle: string;
  /** "YYYY-MM-DDTHH:mm" (한국 시간). 모르면 null */
  heldAt: string | null;
  /** 진행 형식. 예: "2인 1조 · 7팀" */
  format: string;
  summary: string;
  /** 세션에서 다룬 내용, 순서대로 */
  agenda: Note[];
  practice?: {
    title: string;
    brief: string;
    items: Note[];
    challenge?: string;
  };
  /** 실습에서 확인한 기준 */
  checklist?: Note[];
  slides: {
    /** public/ 아래 PDF 경로 */
    pdf: string;
    /** public/ 아래 슬라이드 이미지 폴더. p-01.jpg, p-02.jpg … */
    imageDir: string;
    pageCount: number;
    /** 슬라이드 내용이 실제 진행과 다를 때 붙이는 안내 */
    note?: string;
  };
  /** 학회원 결과물을 받는 세션인지 (OT는 false) */
  collectsProjects: boolean;
};

export type Member = {
  name: string;
  /** 모르면 비워 둡니다. 화면에 표시하지 않습니다 */
  major?: string;
  role: "운영진" | "학회원";
  /** 운영진의 담당. 예: "개발 교육" */
  duty?: string;
};

export type Project = {
  /** URL에 쓰는 이름. 영문 소문자와 하이픈. /projects/[slug] */
  slug: string;
  /** 세션 slug. 예: "02" */
  session: string;
  title: string;
  /** 카드에 들어가는 한 줄 소개 */
  summary: string;
  /** 상세 페이지 본문. 문단은 빈 줄로 구분. 제출자가 자랑하고 싶은 내용을 여기에 */
  description?: string;
  /** members.ts의 name과 똑같이 */
  members: string[];
  demoUrl?: string;
  repoUrl?: string;
  /** public/ 아래 스크린샷 경로. 예: "/projects/02/anam-weather.jpg" (16:10 권장).
   *  비워 두면 카드 썸네일에 사이트 첫 화면을 그대로 띄웁니다. 직접 고른 이미지를 쓰고 싶을 때만 적습니다 */
  image?: string;
  tags: string[];
  /** 상세 페이지에 사이트를 직접 띄울지. 기본은 자동 판단(사이트가 허용하면 띄움). false면 띄우지 않음 */
  embed?: boolean;
};
