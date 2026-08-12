export const projectIds = [
  "agriculture",
  "dairy",
  "diesel",
  "advisor",
  "alahally",
  "thikr",
  "dhabi",
  "topmedia",
] as const;

export type ProjectId = (typeof projectIds)[number];

export const projectAssets: Record<
  ProjectId,
  { 
    image: string; 
    accent: "emerald" | "sky" | "amber" | "violet" | "rose" | "cyan";
    githubUrl?: string;
    playStoreUrl?: string;
  }
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
  alahally: { 
    image: "/images/portfolio/alahally_app.webp", 
    accent: "rose",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.zaid.mathbah_app"
  },
  thikr: { 
    image: "/images/portfolio/thikr_app.webp", 
    accent: "cyan",
    githubUrl: "https://github.com/zaidmahdidev/thekr-app",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.zaid.thekr_app"
  },
  dhabi: {
    image: "/images/portfolio/dhabi.png",
    accent: "amber",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.dhabi.dhabi_user"
  },
  topmedia: {
    image: "/images/portfolio/top_media.png",
    accent: "sky",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.zaid.topmedia"
  },
};
