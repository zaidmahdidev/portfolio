export const projectIds = [
  "dairy",
  "diesel",
  "advisor",
  "agriculture",
  "alahally",
  "thikr",
  "dhabi",
  "topmedia",
  "mazboot",
  "sanad",
  "setuply",
  "masaa",
] as const;

export type ProjectId = (typeof projectIds)[number];

export const projectAssets: Record<
  ProjectId,
  { 
    image: string; 
    accent: "emerald" | "sky" | "amber" | "violet" | "rose" | "cyan";
    githubUrl?: string;
    playStoreUrl?: string;
    appStoreUrl?: string;
    webUrl?: string;
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
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.dhabi.dhabi_user",
    appStoreUrl: "https://apps.apple.com/sa/app/%D8%A7%D9%84%D8%B8%D8%A8%D9%8A/id6778683408"
  },
  topmedia: {
    image: "/images/portfolio/top_media.png",
    accent: "sky",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.zaid.topmedia"
  },
  mazboot: {
    image: "/images/portfolio/mazboot.png",
    accent: "emerald",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.abaad.inspection",
    appStoreUrl: "https://apps.apple.com/sa/app/%D9%85%D8%B6%D8%A8%D9%88%D8%B7/id6783663918"
  },
  sanad: {
    image: "/images/portfolio/sanad.webp",
    accent: "emerald",
    webUrl: "https://sanad-web-gamma.vercel.app/",
  },
  setuply: {
    image: "/images/portfolio/setuply.webp",
    accent: "violet",
    webUrl: "https://setuply-web.vercel.app/",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.zaid.setupply",
    // TODO: replace with the real App Store link once the app is published
    appStoreUrl: "https://apps.apple.com/app/setuply/id0000000000",
  },
  masaa: {
    image: "/images/portfolio/masaa.webp",
    accent: "sky",
    webUrl: "https://masaa-web.vercel.app/",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.abaad.masaa",
    // TODO: replace with the real App Store link once the app is published
    appStoreUrl: "https://apps.apple.com/app/masaa/id0000000000",
  },
};
