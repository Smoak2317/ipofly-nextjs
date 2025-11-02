import { MetadataRoute } from "next";
import { fetchAllIPOs, slugify } from "@/lib/api";

const SITE_URL = "https://smoak2317.github.io/ipofly-frontend";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const ipos = await fetchAllIPOs();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/mainboard`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/sme`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/upcoming`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/ongoing`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.8,
    },
  ];

  const ipoPages: MetadataRoute.Sitemap = ipos.map((ipo) => ({
    url: `${SITE_URL}/ipo/${slugify(ipo.name)}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...ipoPages];
}