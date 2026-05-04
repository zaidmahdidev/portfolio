export const projectIds = [
  "agriculture",
  "dairy",
  "diesel",
  "advisor",
  "alahally",
  "thikr",
] as const;

export type ProjectId = (typeof projectIds)[number];

export const projectAssets: Record<
  ProjectId,
  { image: string; accent: "emerald" | "sky" | "amber" | "violet" | "rose" | "cyan" }
> = {
  agriculture: {
    image: "/images/portfolio/agriculture.webp",
    accent: "emerald",
  },
  dairy: { image: "/images/portfolio/dairy_app.webp", accent: "sky" },
  diesel: { image: "/images/portfolio/diesel.webp", accent: "amber" },
  advisor: {
    image: "/images/portfolio/AgriculturalAdvisor_app.webp",
    accent: "violet",
  },
  alahally: { image: "/images/portfolio/alahally_app.webp", accent: "rose" },
  thikr: { image: "/images/portfolio/thikr_app.webp", accent: "cyan" },
};
