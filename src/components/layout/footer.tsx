'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Phone, Mail, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const year = new Date().getFullYear();

  const quickLinks = [
    { key: 'submitGrievance', href: '/grievance' },
    { key: 'trackGrievance', href: '/grievance/track' },
    { key: 'helplines', href: '/helplines' },
    { key: 'selfDefense', href: '/self-defense' },
    { key: 'faq', href: '/faq' },
  ];

  const resourceLinks = [
    { key: 'childrenSafety', href: '/children-safety' },
    { key: 'health', href: '/health' },
  ];

  return (
    <footer className="bg-muted/50 border-t">
      {/* Emergency Bar */}
      <div className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              <span className="font-semibold">{t('emergency')}</span>
            </div>
            <div className="hidden sm:block">|</div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              <span className="font-semibold">{t('helpline')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                LGI
              </div>
              <span className="font-semibold">
                {locale === 'ar' ? 'مبادرة لبنان للمساواة' : 'Lebanon Gender Initiative'}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {locale === 'ar'
                ? 'مساحة آمنة للنساء والأطفال في جنوب لبنان'
                : 'A safe space for women and children in South Lebanon'}
            </p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+961 76 348 299</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@lebanongenderinitiative.online</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{locale === 'ar' ? 'جنوب لبنان' : 'South Lebanon'}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">
              {locale === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">
              {locale === 'ar' ? 'الموارد' : 'Resources'}
            </h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Admin */}
          <div>
            <h3 className="font-semibold mb-4">
              {locale === 'ar' ? 'إدارة' : 'Admin'}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${locale}/admin`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {tNav('admin')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p className="flex items-center gap-1">
              © {year} {t('copyright')}
            </p>
            <p className="flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-destructive" /> for Lebanon
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
