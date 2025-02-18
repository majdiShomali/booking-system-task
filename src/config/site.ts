export const siteConfig = {
  name: "المستشار",
  url: "",
  ogImage: "",
  description:
    "ابداء رحلتك مع المستشار ",
  links: {
    twitter: "",
    github: "",
  },
  pages:{
    login:"/auth/login",
    signup:"/auth/signup",
    PIONEER:{
      home:"/dashboard",
      profile:"/dashboard/profile",
    },
    USER:{
      home:"/",
      profile:"/profile"

    }
  }
}

export type SiteConfig = typeof siteConfig

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}
