import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { dashboardConfig } from "@/config/config-website"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/siteconfig"


interface MainpageLayoutProps {
    children: React.ReactNode
}

export default async function MainpageLayout({
    children
}: MainpageLayoutProps) {

    return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={dashboardConfig.mainNav} />
          <nav>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "px-4"
              )}
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )



}