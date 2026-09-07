import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/work", "/services", "/about", "/testimonials", "/book", "/contact"];
  const now = new Date();

  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: now,
    changeFrequency: route === "/work" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/work" || route === "/book" ? 0.9 : 0.7,
  }));
}
