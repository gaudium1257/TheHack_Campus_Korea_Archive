import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { sessions } from "@/content/sessions";

const base = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/sessions", "/projects", "/members", "/about"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}` })),
    ...sessions.map((s) => ({ url: `${base}/sessions/${s.slug}` })),
    ...projects.map((p) => ({ url: `${base}/projects/${p.slug}` })),
  ];
}
