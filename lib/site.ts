/** Public CV path (place file in /public/cv.pdf) */
export const CV_URL = "/cv.pdf";

/** Profile photo in /public (e.g. images/zaid.png) */
export const PROFILE_IMAGE_SRC = "/images/zaid.png";

export const person = {
  name: "Zaid Mahdi",
  emailPrimary: "zaidmhdi33@gmail.com",
  emailSecondary: "zaidmahdi2022@gmail.com",
  phoneE164: "+966559291894",
  phoneDisplay: "+966 55 929 1894",
  phoneYemen1: "+967 774 814 210",
  phoneYemen2: "+967 01 371 447",
  address: "Mathbah, 60th St.",
} as const;

export const socialLinks = [
  {
    href: "https://github.com/zaidmahdidev",
    key: "github" as const,
  },
  {
    href: "https://www.facebook.com/profile.php?id=100010296126041",
    key: "facebook" as const,
  },
  {
    href: "https://api.whatsapp.com/send/?phone=966559291894&text&type=phone_number&app_absent=0",
    key: "whatsapp" as const,
  },
  {
    href: "https://www.linkedin.com/in/zaid-mhdi-381192325?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    key: "linkedin" as const,
  },
  {
    href: "https://instagram.com/zaidmahdidevv?igshid=MzNINGNkZWQ4Mg==",
    key: "instagram" as const,
  },
  {
    href: "https://t.me/zaidmahdidev",
    key: "telegram" as const,
  },
] as const;
