import { MetadataRoute } from "next";
import config from "@/config";
import { serviceAreas } from "@/data/serviceAreas";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${config.domainName}`;
  const routes = [
    "",
    "/services",
    "/gallery",
    "/about",
    "/contact",
    "/service-areas",
    ...serviceAreas.map((a) => `/service-areas/${a.slug}`),
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
