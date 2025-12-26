'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Users,
  Scale,
  Briefcase,
  Shield,
  Globe,
  Heart,
  GraduationCap,
  Accessibility,
  Target
} from 'lucide-react';

export default function GenderPerspectivesPage() {
  const t = useTranslations('genderPerspectives');
  const locale = useLocale();

  const focusAreas = [
    { icon: Users, key: 'leadership', color: 'bg-blue-100 text-blue-700' },
    { icon: Briefcase, key: 'economic', color: 'bg-green-100 text-green-700' },
    { icon: Shield, key: 'violence', color: 'bg-red-100 text-red-700' },
    { icon: Globe, key: 'peace', color: 'bg-purple-100 text-purple-700' },
    { icon: Heart, key: 'humanitarian', color: 'bg-pink-100 text-pink-700' },
    { icon: GraduationCap, key: 'youth', color: 'bg-yellow-100 text-yellow-700' },
    { icon: Accessibility, key: 'disabilities', color: 'bg-indigo-100 text-indigo-700' },
    { icon: Target, key: 'sustainable', color: 'bg-teal-100 text-teal-700' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Scale className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      {/* What is Gender Perspective */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{t('whatIs.title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{t('whatIs.description')}</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>{t('whatIs.point1')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>{t('whatIs.point2')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>{t('whatIs.point3')}</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Key Focus Areas */}
      <h2 className="text-2xl font-bold mb-6 text-center">{t('focusAreas.title')}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-12">
        {focusAreas.map((area) => (
          <Card key={area.key} className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className={`w-12 h-12 rounded-lg ${area.color} flex items-center justify-center mx-auto mb-3`}>
                <area.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">{t(`focusAreas.${area.key}.title`)}</h3>
              <p className="text-sm text-muted-foreground">{t(`focusAreas.${area.key}.description`)}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Why it Matters */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>{t('whyMatters.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold mb-2">{t('whyMatters.forWomen.title')}</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• {t('whyMatters.forWomen.point1')}</li>
                <li>• {t('whyMatters.forWomen.point2')}</li>
                <li>• {t('whyMatters.forWomen.point3')}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">{t('whyMatters.forCommunity.title')}</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• {t('whyMatters.forCommunity.point1')}</li>
                <li>• {t('whyMatters.forCommunity.point2')}</li>
                <li>• {t('whyMatters.forCommunity.point3')}</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
