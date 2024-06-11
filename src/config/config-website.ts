import { DashboardConfig, SiteConfig } from "@/types";


export const dashboardConfig: DashboardConfig = {
    mainNav: [
        {
            title: "Home",
            href: "/",
        },
        {
            title: "mainpage",
            href: "/mainpage",
        },
        {
            title: "Contact",
            href: "/contact",
        },
    ],
    sidebarNav: [
        {
            title: "About",
            href: "/",
        },
    ]
}

export const siteConfig: SiteConfig = {
    name: "Uploader",
    description:
      "An SaaS application that allows the clients to get their open source application deployed and delievered on scale .",
    url: "https://extralabs.xyz",
    ogImage: "https://extralabs.xyz/",
    links: {
      twitter: "https://twitter.com/extralabs",
      github: "https://github.com/The-extra-project",
    },
    tos: "https://extralabs.xyz/terms-of-use-extra-uploader",
  }
  




