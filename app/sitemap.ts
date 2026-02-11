import { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { Projects } from "@/config/projects";
import { experiences } from "@/config/experience";
import { skills } from "@/config/skills";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Main pages
  const routes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/skills`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contributions`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  // Individual project pages for SEO
  const projectPages = Projects.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: project.endDate || new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Individual experience pages for SEO
  const experiencePages = experiences.map((exp) => ({
    url: `${baseUrl}/experience/${exp.id}`,
    lastModified: exp.endDate === "Present" ? new Date() : exp.endDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Individual skill detail pages for SEO
  const skillPages = skills.map((skill) => ({
    url: `${baseUrl}/skills/${skill.name.toLowerCase().replace(/\s+/g, "-")}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...projectPages, ...experiencePages, ...skillPages];
}
