export const siteConfig = {
  name: "المستشار",
  url: "",
  ogImage: "",
  description:[
    " ابداء رحلتك مع المستشار ",
   " احصل على استشارة خبير في أي وقت وأي مكان"],

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
      profile:"/profile",
      pioneers:"/pioneers"
    }
  }
}

export type SiteConfig = typeof siteConfig

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}
