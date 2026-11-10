# CLAUDE.md

THE해커톤 : CAMPUS 고려대학교 지부의 공식 아카이브 사이트. 정규 세션마다 학회원이 만든 결과물을 모으는 것이 목적입니다. 사용자와 학회원은 한국어를 씁니다. 화면 문구와 커밋 메시지는 한국어로 씁니다.

## 명령

- `npm run dev` — 개발 서버
- `npm run build` — 프로덕션 빌드. 변경 후 반드시 통과시킵니다
- `npm run lint` — `tsc --noEmit` 타입 검사

## 구조

- Next.js 16 App Router, TypeScript, 정적 생성(SSG). 배포는 Vercel(*.vercel.app)
- 데이터는 `src/content/` 아래 TypeScript 파일: `sessions.ts`, `members.ts`, `projects.ts`, 타입은 `types.ts`
- 데이터 조회와 표기 함수는 `src/lib/archive.ts`에 모읍니다. 페이지에서 배열을 직접 거르지 말고 여기 함수를 씁니다
- 동적 경로(`/sessions/[slug]`, `/projects/[slug]`)는 `generateStaticParams` + `dynamicParams = false`
- 결과물 상세는 `demoUrl`을 iframe(`LiveEmbed`)으로 띄웁니다. `src/lib/embed.ts`가 사이트의 응답 코드와 X-Frame-Options·CSP를 확인해, 오류(4xx·5xx)를 내거나 임베드를 막은 사이트는 표지로 대신합니다. 결과물이 보이는 페이지는 `revalidate = 3600`이라 한 시간마다 다시 확인합니다. 카드 썸네일도 같은 사이트 첫 화면을 1280×800으로 그려 줄여 띄웁니다(`LiveThumb`, 화면에 보일 때만 로드). 우선순위는 `image` → 사이트 첫 화면 → 표지. 강제로 끄려면 결과물에 `embed: false`
- 세션 슬라이드: `public/sessions/<slug>/slides.pdf`와 `slides/p-01.jpg …` (1600px, `pdftoppm`으로 생성. 방법은 README)

## 세션 기록의 사실관계

- OT 2026.10.05, 2회차 2026.11.02(Supabase), 3회차 2026.11.09(API와 크롤링). 1회차를 포함해 OT와 2회차 사이 정규 세션은 휴회
- 슬라이드 표지의 회차 표기(3회차, 4회차)와 2회차 슬라이드의 "지난 세션 10.12"는 실제와 다릅니다. 사이트에서는 위 회차를 쓰고, 세션 페이지의 슬라이드 위에 `slides.note`로 안내합니다. 슬라이드 원본은 고치지 않습니다
- OT 슬라이드 PDF는 원본에서 2쪽(외부 출연진 사진)과 44쪽(운영진 검토용)을 뺐습니다

## 개인정보

- 학회원은 이름과 학과만 공개합니다. 전화번호, 인스타그램, 이메일 등 연락처는 사이트 어디에도 넣지 않습니다
- 결과물에 학회원 이름을 적을 때는 `members.ts`의 이름과 똑같이 씁니다
- 결과물은 학회원 설문으로 받습니다. 설문의 학번은 사이트에 옮기지 않습니다. 모르는 팀원·학과는 비워 두고 코드 주석으로 "확인 필요"를 남깁니다

## 디자인

- Tailwind 같은 유틸리티 프레임워크나 기본 컴포넌트 키트를 쓰지 않습니다. 모든 스타일은 `src/app/globals.css`의 토큰(`--ink-*`, `--fg-*`, `--crimson`, `--rose`, `--line*`, `--t-*`)으로 작성합니다. 새 색이나 글자 크기를 하드코딩하지 말고 토큰을 씁니다
- 방향: 세션 슬라이드의 검붉은 바탕 + 크림슨 + 분홍을 쓰되, 기관 아카이브처럼 가는 선, 카탈로그 번호(S02, S02-01), 정돈된 목록으로 정리합니다. 다크 단일 테마
- 글꼴: 본문과 제목은 Pretendard Variable, 번호·라벨은 IBM Plex Mono(`.mono`, `.eyebrow`)
- 한국어 줄바꿈은 `word-break: keep-all`. 제목은 `text-wrap: balance`
- 모서리는 거의 직각(카드에 큰 radius 금지), 그림자·그라데이션은 표지와 지평선 장식에만. 이모지 금지
- 지평선 빛(`.horizon`)은 슬라이드 표지에서 가져온 장식입니다. 홈 히어로, 세션 머리, 마무리 섹션에만 씁니다
- 새 화면은 데스크톱(1440)과 모바일(390)에서 가로 스크롤이 생기지 않는지 확인합니다

## 다음 단계 (예정)

1. Supabase로 결과물 제출 받기: `/submit` 폼, 세션별 제출 코드, 같은 사람·같은 세션 재제출은 수정으로 처리, 스크린샷은 Storage. 쓰기는 API Route에서만 하고 secret 키는 Vercel 환경변수에만 둡니다
2. 운영진 페이지(세션 등록, 제출 열기/닫기, 숨김), 학회원 개인 페이지
3. Heat Project(7–10주) 지부별 리더보드
