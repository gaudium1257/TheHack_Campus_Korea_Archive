import "server-only";
import { cache } from "react";

export type Embeddability = "allowed" | "blocked" | "unknown";

/**
 * 사이트가 다른 페이지 안(iframe)에 들어가는 것을 허용하는지 응답 헤더로 확인합니다.
 * 빌드할 때(Vercel) 한 번 실행됩니다. 확인하지 못하면 "unknown"이고, 이때는 일단 띄웁니다.
 */
export const checkEmbeddable = cache(async function checkEmbeddable(url: string): Promise<Embeddability> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(url, { redirect: "follow", signal: controller.signal, cache: "force-cache" });
    res.body?.cancel().catch(() => {});
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
