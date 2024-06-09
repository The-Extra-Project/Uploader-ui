export type SiteConfig = {
    name: string
    description: string
    url: string
    ogImage: string
    links: {
      twitter: string
      github: string
    }
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
  }
  

