'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import { Menu, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import LanguageSwitcher from './language-switcher';

const navigation = [
  { key: 'home', href: '/' },
  { key: 'submitGrievance', href: '/grievance' },
  { key: 'trackGrievance', href: '/grievance/track' },
  { key: 'questionnaire', href: '/questionnaire' },
  { key: 'helplines', href: '/helplines' },
  { key: 'selfDefense', href: '/self-defense' },
  { key: 'faq', href: '/faq' },
];

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Emergency Banner */}
      <div className="bg-destructive text-destructive-foreground">
        <div className="container mx-auto flex items-center justify-center gap-2 py-1.5 text-sm">
          <Phone className="h-4 w-4" />
          <span>Emergency: 112 | Helpline: +961 76 348 299</span>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
              LGI
            </div>
            <span className="hidden font-semibold sm:inline-block">
              {locale === 'ar' ? 'مبادرة لبنان للمساواة' : 'Lebanon Gender Initiative'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />

            {/* CTA Button */}
            <Button asChild className="hidden sm:inline-flex" size="sm">
              <Link href={`/${locale}/grievance`}>
                {t('submitGrievance')}
              </Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side={locale === 'ar' ? 'right' : 'left'} className="w-[300px]">
                <nav className="flex flex-col gap-2 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.key}
                      href={`/${locale}${item.href}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 text-lg font-medium hover:bg-accent rounded-md transition-colors"
                    >
                      {t(item.key)}
                    </Link>
                  ))}
                  <div className="border-t my-4" />
                  <Button asChild className="mx-4">
                    <Link href={`/${locale}/grievance`} onClick={() => setMobileMenuOpen(false)}>
                      {t('submitGrievance')}
                    </Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
