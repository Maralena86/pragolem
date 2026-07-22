"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { RiMenuLine } from "@remixicon/react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

type NavHref = "/tours" | "/about" | "/reviews" | "/faq" | "/contact";

type NavItem = {
  href: NavHref;
  label: string;
};

function isPathActive(pathname: string, href: NavHref) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = useMemo<NavItem[]>(
    () => [
      { href: "/tours", label: t("nav.tours") },
      { href: "/about", label: t("nav.about") },
      { href: "/reviews", label: t("nav.reviews") },
      { href: "/faq", label: t("nav.faq") },
      { href: "/contact", label: t("nav.contact") },
    ],
    [t]
  );

  return (
    <header className="border-b">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-2 px-4 py-3 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-2">
          <Image src="/pragolem-logo.avif" alt="" width={20} height={20} className="size-5" aria-hidden="true" />
          <span className="font-semibold tracking-tight">{t("brand")}</span>
        </Link>

        <NavigationMenu className="ml-4 hidden flex-1 justify-start md:flex" viewport={false}>
          <NavigationMenuList className="gap-1">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    isPathActive(pathname, item.href) && "bg-muted"
                  )}
                >
                  {item.label}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <LanguageSwitcher />
          <Button asChild size="sm">
            <Link href="/booking">{t("bookingCta")}</Link>
          </Button>
        </div>

        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button type="button" variant="ghost" size="icon-sm" aria-label={t("openMenu")}>
              <RiMenuLine className="size-4" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[88vw] max-w-sm">
            <SheetHeader>
              <SheetTitle>{t("menuTitle")}</SheetTitle>
            </SheetHeader>
            <div className="flex h-full flex-col gap-3 px-4 pb-4">
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <SheetClose key={item.href} asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "rounded-none px-2 py-2 text-sm",
                        isPathActive(pathname, item.href) ? "bg-muted font-medium" : "text-muted-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <Separator />
              <LanguageSwitcher onLocaleChange={() => setIsMobileOpen(false)} />
              <SheetClose asChild>
                <Button asChild className="mt-1">
                  <Link href="/booking">{t("bookingCta")}</Link>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
