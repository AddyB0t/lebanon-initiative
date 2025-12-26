'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Heart,
  MessageCircle,
  Users,
  BookOpen,
  Lightbulb,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

export default function GenderSensitivityPage() {
  const t = useTranslations('genderSensitivity');
  const locale = useLocale();

  const principles = [
    { icon: MessageCircle, key: 'language' },
    { icon: Users, key: 'inclusion' },
    { icon: Heart, key: 'respect' },
    { icon: BookOpen, key: 'awareness' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 mb-4">
          <Heart className="h-8 w-8 text-pink-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      {/* What is Gender Sensitivity */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            {t('whatIs.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{t('whatIs.description')}</p>
        </CardContent>
      </Card>

      {/* Core Principles */}
      <h2 className="text-2xl font-bold mb-6 text-center">{t('principles.title')}</h2>
      <div className="grid gap-6 md:grid-cols-2 mb-12">
        {principles.map((principle) => (
          <Card key={principle.key}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <principle.icon className="h-5 w-5 text-primary" />
                {t(`principles.${principle.key}.title`)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-3">{t(`principles.${principle.key}.description`)}</p>
              <ul className="space-y-1">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  <span>{t(`principles.${principle.key}.example1`)}</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  <span>{t(`principles.${principle.key}.example2`)}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Do's and Don'ts */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <CheckCircle className="h-5 w-5" />
              {t('dos.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>{t('dos.item1')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>{t('dos.item2')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>{t('dos.item3')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>{t('dos.item4')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>{t('dos.item5')}</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="h-5 w-5" />
              {t('donts.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-red-600">✗</span>
                <span>{t('donts.item1')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600">✗</span>
                <span>{t('donts.item2')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600">✗</span>
                <span>{t('donts.item3')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600">✗</span>
                <span>{t('donts.item4')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600">✗</span>
                <span>{t('donts.item5')}</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      <Card className="bg-primary/5 border-primary/20 text-center">
        <CardContent className="pt-6">
          <p className="text-lg font-medium mb-2">{t('cta.message')}</p>
          <p className="text-muted-foreground">{t('cta.subtext')}</p>
        </CardContent>
      </Card>
    </div>
  );
}
