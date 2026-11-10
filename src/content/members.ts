import type { Member } from "./types";

// OT(2026.10.05) 기준 명단. 이름과 학과는 공개에 동의된 정보만 적습니다. 연락처는 적지 않습니다.

export const members: Member[] = [
  { name: "김민서", major: "컴퓨터학과", role: "운영진", duty: "개발 교육" },
  { name: "김태호", major: "컴퓨터학과", role: "운영진", duty: "개발 교육" },
  { name: "안희성", major: "경영학과", role: "운영진", duty: "지부 운영 · 개발 교육" },

  { name: "고세영", major: "인공지능학과", role: "학회원" },
  { name: "고우민", major: "스마트보안학부", role: "학회원" },
  { name: "김경범", major: "스마트보안학부", role: "학회원" },
  { name: "김상후", major: "컴퓨터학과", role: "학회원" },
  { name: "김재우", major: "전기전자공학부", role: "학회원" },
  { name: "문정우", major: "컴퓨터학과", role: "학회원" },
  { name: "선종하", major: "스마트보안학부", role: "학회원" },
  { name: "송지석", major: "인공지능학과", role: "학회원" },
  { name: "이용현", major: "인공지능학과", role: "학회원" },
  { name: "이채령", role: "학회원" }, // 학과 확인 필요
  { name: "정도윤", major: "컴퓨터학과", role: "학회원" },
  { name: "정민재", major: "인공지능학과", role: "학회원" },
  { name: "진의찬", major: "스마트보안학부", role: "학회원" },
  { name: "황윤하", major: "스마트보안학부", role: "학회원" },
];
