import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import {
  FileText,
  Phone,
  Shield,
  Heart,
  Baby,
  ArrowRight,
  Scale,
  MessageCircle,
  AlertTriangle,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent locale={locale} />;
}

function HomeContent({ locale }: { locale: string }) {
  const t = useTranslations('home');
  const tNav = useTranslations('nav');

  const features = [
    {
      key: 'grievance',
      href: '/grievance',
      icon: FileText,
      color: 'bg-primary/10 text-primary',
    },
    {
      key: 'helplines',
      href: '/helplines',
      icon: Phone,
      color: 'bg-destructive/10 text-destructive',
    },
    {
      key: 'selfDefense',
      href: '/self-defense',
      icon: Shield,
      color: 'bg-accent/20 text-accent-foreground',
    },
  ];

  const additionalServices = [
    { key: 'childrenSafety', href: '/children-safety', icon: Baby, color: 'bg-pink-100 text-pink-700' },
    { key: 'health', href: '/health', icon: Heart, color: 'bg-red-100 text-red-700' },
  ];

  const genderEducation = [
    { key: 'genderPerspectives', href: '/gender-perspectives', icon: Scale, color: 'bg-blue-100 text-blue-700' },
    { key: 'genderSensitivity', href: '/gender-sensitivity', icon: BookOpen, color: 'bg-purple-100 text-purple-700' },
    { key: 'talkingToKids', href: '/talking-to-kids', icon: MessageCircle, color: 'bg-orange-100 text-orange-700' },
    { key: 'relationshipAbuse', href: '/relationship-abuse', icon: AlertTriangle, color: 'bg-red-100 text-red-700' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {t('hero.title')}
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              {t('hero.subtitle')}
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              {t('hero.description')}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href={`/${locale}/grievance`}>
                  {t('hero.cta')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="destructive" size="lg" className="w-full sm:w-auto">
                <a href="tel:+96176348299">
                  <Phone className="mr-2 h-5 w-5" />
                  {t('hero.emergency')}
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      </section>

      {/* Main Features */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            {features.map((feature) => (
              <Link key={feature.key} href={`/${locale}${feature.href}`}>
                <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
                  <CardHeader className="text-center">
                    <div className={`w-14 h-14 rounded-lg ${feature.color} flex items-center justify-center mb-4 mx-auto`}>
                      <feature.icon className="h-7 w-7" />
                    </div>
                    <CardTitle>{t(`features.${feature.key}.title`)}</CardTitle>
                    <CardDescription>{t(`features.${feature.key}.description`)}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>

          {/* Additional Services as Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            {additionalServices.map((service) => (
              <Link key={service.key} href={`/${locale}${service.href}`}>
                <Button variant="outline" size="lg" className="w-full sm:w-auto gap-3 px-6 py-6 h-auto">
                  <div className={`w-10 h-10 rounded-lg ${service.color} flex items-center justify-center`}>
                    <service.icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-base">{tNav(service.key)}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gender Awareness & Safety Education */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              {locale === 'ar' ? 'التوعية الجندرية والتثقيف حول السلامة' :
               locale === 'fr' ? 'Sensibilisation au Genre et Éducation à la Sécurité' :
               'Gender Awareness & Safety Education'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {locale === 'ar' ? 'تعرفي على حقوقك وكيفية حماية نفسك وأطفالك' :
               locale === 'fr' ? 'Apprenez vos droits et comment vous protéger' :
               'Learn about your rights and how to protect yourself and your children'}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {genderEducation.map((item) => (
              <Link key={item.key} href={`/${locale}${item.href}`}>
                <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
                  <CardContent className="pt-6 text-center">
                    <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center mb-3 mx-auto`}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-sm">{t(`genderEducation.${item.key}`)}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">
                  {locale === 'ar' ? 'هل تحتاجين إلى مساعدة فورية؟' :
                   locale === 'fr' ? 'Besoin d\'aide immédiate ?' :
                   'Need Immediate Help?'}
                </CardTitle>
                <CardDescription className="text-base">
                  {locale === 'ar' ? 'تواصلي معنا الآن - نحن هنا لمساعدتك' :
                   locale === 'fr' ? 'Contactez-nous maintenant - nous sommes là pour vous aider' :
                   'Contact us now - we are here to help you'}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="default" size="lg">
                  <a href="tel:+96176348299">
                    <Phone className="mr-2 h-5 w-5" />
                    {locale === 'ar' ? 'اتصلي الآن' : locale === 'fr' ? 'Appeler maintenant' : 'Call Now'}
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="https://wa.me/96176348299" target="_blank" rel="noopener noreferrer">
                    {locale === 'ar' ? 'واتساب' : 'WhatsApp'}
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
