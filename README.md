# THE해커톤 : CAMPUS 고려대 아카이브

THE해커톤 : CAMPUS 고려대학교 지부의 공식 아카이브입니다. 정규 세션의 기록(주제, 다룬 내용, 실습, 슬라이드)과 학회원이 세션에서 만들고 배포한 결과물을 모읍니다.

- Next.js 16 (App Router) · TypeScript
- 스타일: 직접 작성한 CSS (`src/app/globals.css`), 글꼴 Pretendard · IBM Plex Mono
- 데이터: 지금은 `src/content/*.ts` 파일. 제출 기능을 붙일 때 Supabase로 옮깁니다.

## 실행

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 배포 전 확인
```

## Vercel 배포

1. Vercel에서 **Add New → Project**로 이 저장소를 가져옵니다.
2. Framework Preset은 **Next.js**가 자동으로 잡힙니다. Build Command, Output Directory, 환경변수 모두 기본값 그대로 둡니다.
3. **Deploy**를 누르면 `프로젝트이름.vercel.app` 주소가 생깁니다. 이후 연결된 브랜치에 push할 때마다 다시 배포됩니다.

## 콘텐츠 추가

### 결과물 추가 (`src/content/projects.ts`)

```ts
{
  slug: "anam-weather",            // 주소에 쓰는 영문 이름: /projects/anam-weather
  session: "03",                   // 세션 slug: "02", "03" …
  title: "오늘 안암 날씨",
  summary: "기상청 API로 등굣길 옷차림을 추천합니다.",
  description: "자세한 소개. 문단은 빈 줄로 구분합니다.", // 선택
  members: ["김민서"],              // members.ts의 이름과 똑같이
  demoUrl: "https://anam-weather.vercel.app",       // 선택
  repoUrl: "https://github.com/…",                  // 선택
  image: "/projects/03/anam-weather.jpg",           // 선택, public/ 아래. 16:10 권장
  tags: ["기상청 API", "Next.js"],
},
```

스크린샷이 없으면 카탈로그 번호와 제목으로 만든 표지가 대신 들어갑니다. 카탈로그 번호(`S03-01`)는 세션 안에서 적은 순서대로 자동으로 붙습니다.

### 세션 추가 (`src/content/sessions.ts`)

1. 슬라이드 PDF를 `public/sessions/<slug>/slides.pdf`로 넣습니다.
2. 슬라이드 이미지를 만듭니다 (poppler 필요).
   ```bash
   mkdir -p public/sessions/04/slides
   pdftoppm -jpeg -jpegopt quality=82 -scale-to-x 1600 -scale-to-y -1 public/sessions/04/slides.pdf public/sessions/04/slides/p
   ```
3. `sessions.ts` 배열 끝에 세션을 추가하고 `slides.pageCount`를 쪽수에 맞춥니다.

### 학회원 (`src/content/members.ts`)

이름과 학과만 적습니다. 연락처는 적지 않습니다.

## 폴더 구조

```
src/
  app/          페이지 (홈, 세션, 결과물, 학회원, 소개)
  components/   머리글, 바닥글, 세션 목록, 결과물 카드, 슬라이드 보기
  content/      세션 · 학회원 · 결과물 데이터
  lib/          데이터 조회와 날짜 표기
public/sessions 세션별 슬라이드 PDF와 이미지
```
