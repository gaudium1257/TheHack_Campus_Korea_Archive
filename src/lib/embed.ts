import "server-only";
import { cache } from "react";

/**
 * allowed     다른 페이지 안에 띄워도 됨
 * blocked     사이트가 X-Frame-Options·CSP로 막아 둠
 * unavailable 사이트가 오류(4xx·5xx)를 내고 있음
 * unknown     확인하지 못함 (일단 띄움)
 */
export type Embeddability = "allowed" | "blocked" | "unavailable" | "unknown";

/** 사이트를 썸네일·실행 창으로 띄울지 */
export function shouldEmbed(status: Embeddability) {
  return status === "allowed" || status === "unknown";
}

/**
 * 사이트가 정상 응답하는지, 다른 페이지 안(iframe)에 들어가는 것을 허용하는지 확인합니다.
 * 결과는 한 시간 동안 캐시되고, 페이지가 다시 만들어질 때(revalidate) 새로 확인합니다.
 */
export const checkEmbeddable = cache(async function checkEmbeddable(url: string): Promise<Embeddability> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(url, { redirect: "follow", signal: controller.signal, next: { revalidate: 3600 } });
    res.body?.cancel().catch(() => {});
    if (!res.ok) return "unavailable";
    const xfo = res.headers.get("x-frame-options")?.toLowerCase() ?? "";
    if (xfo.includes("deny") || xfo.includes("sameorigin")) return "blocked";
    const csp = res.headers.get("content-security-policy")?.toLowerCase() ?? "";
    const ancestors = csp
      .split(";")
      .map((d) => d.trim())
      .find((d) => d.startsWith("frame-ancestors"));
    if (ancestors && !/\s\*(\s|$)/.test(`${ancestors} `)) return "blocked";
    return "allowed";
  } catch {
    return "unknown";
  } finally {
    clearTimeout(timer);
  }
});
