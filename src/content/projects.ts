import type { Project } from "./types";

// 학회원 결과물. 세션이 끝나면 여기에 추가합니다. 작성 방법은 README.md를 보세요.
// 카탈로그 번호(S02-01 …)는 세션 안에서 이 배열에 적힌 순서대로 붙습니다. 순서는 제출 순서를 따릅니다.
// 학번 등 이름·학과 외의 개인정보는 적지 않습니다.

export const projects: Project[] = [
  // ── 2회차 · Supabase로 데이터베이스 연결하기 (2026.11.02) ──
  {
    slug: "ieum",
    session: "02",
    title: "이음",
    summary: "끝말잇기 사이트입니다. 이어 쓸 단어의 글자 수도 조절할 수 있습니다.",
    members: ["김재우", "이용현"],
    demoUrl: "https://ieum-wordchain.vercel.app",
    tags: ["끝말잇기"],
  },
  {
    slug: "attendance-code-share",
    session: "02",
    title: "출석코드 공유소",
    summary:
      "LMS 출석 코드(숫자 4자리, 10분 유효)를 올리고, 확인받은 만큼 다른 사람의 코드를 볼 수 있는 실시간 공유 웹사이트입니다.",
    description: "과목을 목록에서 찾아 고를 수 있게 해 입력 오타를 줄였습니다.",
    // 함께한 팀원 이름 확인 중
    members: ["이채령"],
    demoUrl: "https://attendence-code-three.vercel.app",
    tags: ["실시간"],
  },
  {
    slug: "anam-food-rating",
    session: "02",
    title: "안암 맛집 평가 플랫폼",
    summary: "안암의 음식점을 직접 등록하고, 이미 등록된 음식점에 분야별로 점수를 매기는 플랫폼입니다.",
    members: ["진의찬", "안희성"],
    demoUrl: "https://supabase-project-coral.vercel.app/",
    tags: ["안암"],
  },
  {
    slug: "campus-team-manager",
    session: "02",
    title: "대학교 팀플 매니저",
    summary: "팀플의 역할 분담을 돕고, 진행 현황과 자료조사 비교를 한곳에서 효율적으로 할 수 있게 만든 서비스입니다.",
    members: ["선종하", "황윤하"],
    demoUrl: "https://campus-team-manager.vercel.app/",
    tags: ["팀플"],
  },
  {
    slug: "ieobom",
    session: "02",
    title: "이어봄",
    summary: "앞사람의 문장에 한 문장씩 이어 쓰며 함께 결말을 만들어가는 공동 창작 웹사이트입니다.",
    description: "여러 사람이 앞사람의 문장에 한 문장씩 이어 쓰며, 혼자서는 떠올리기 어려운 결말을 함께 만들어갑니다.",
    members: ["정민재", "고세영"],
    demoUrl: "https://kugitjae.github.io/ieobom/",
    tags: ["공동 창작"],
  },
  {
    slug: "triptogether",
    session: "02",
    title: "triptogether",
    summary: "해외여행에서 쓰는 웹. 경비를 한 번에 정산하고, 사진을 한 번에 영상으로 만들고, 다닌 곳으로 지도를 채워 갑니다.",
    members: ["문정우", "정도윤"],
    demoUrl: "https://triptogether-pi.vercel.app",
    tags: ["여행"],
  },
];
