'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  AlertTriangle,
  Eye,
  Phone,
  Shield,
  Heart,
  MessageCircle,
  Lock,
  Ban,
  HandMetal,
  Smartphone,
  Users
} from 'lucide-react';

export default function RelationshipAbusePage() {
  const t = useTranslations('relationshipAbuse');
  const locale = useLocale();

  const warningSigns = [
    { icon: Eye, key: 'monitoring' },
    { icon: Smartphone, key: 'digital' },
    { icon: Lock, key: 'control' },
    { icon: MessageCircle, key: 'emotional' },
    { icon: AlertTriangle, key: 'anger' },
    { icon: HandMetal, key: 'physical' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
          <Shield className="h-8 w-8 text-red-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      {/* Emergency Banner */}
      <Card className="bg-destructive/10 border-destructive/30 mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Phone className="h-6 w-6 text-destructive" />
              <div>
                <p className="font-semibold text-destructive">{t('emergency.title')}</p>
                <p className="text-sm text-muted-foreground">{t('emergency.subtitle')}</p>
              </div>
            </div>
            <Button asChild variant="destructive">
              <a href="tel:+96176348299">
                <Phone className="mr-2 h-4 w-4" />
                {t('emergency.callNow')}
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Warning Signs */}
      <h2 className="text-2xl font-bold mb-6 text-center">{t('warningSigns.title')}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-12">
        {warningSigns.map((sign) => (
          <Card key={sign.key} className="border-red-100">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <sign.icon className="h-5 w-5 text-red-500" />
                {t(`warningSigns.${sign.key}.title`)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• {t(`warningSigns.${sign.key}.sign1`)}</li>
                <li>• {t(`warningSigns.${sign.key}.sign2`)}</li>
                <li>• {t(`warningSigns.${sign.key}.sign3`)}</li>
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Safety Tips */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-500" />
            {t('safetyTips.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">1.</span>
                <span>{t('safetyTips.tip1')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">2.</span>
                <span>{t('safetyTips.tip2')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">3.</span>
                <span>{t('safetyTips.tip3')}</span>
              </li>
            </ul>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">4.</span>
                <span>{t('safetyTips.tip4')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">5.</span>
                <span>{t('safetyTips.tip5')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">6.</span>
                <span>{t('safetyTips.tip6')}</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* How to Help */}
      <Card className="bg-blue-50/50 border-blue-200 mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Users className="h-5 w-5" />
            {t('howToHelp.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{t('howToHelp.description')}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="p-3 bg-white rounded-lg border">
              <p className="font-medium text-sm">{t('howToHelp.step1')}</p>
            </div>
            <div className="p-3 bg-white rounded-lg border">
              <p className="font-medium text-sm">{t('howToHelp.step2')}</p>
            </div>
            <div className="p-3 bg-white rounded-lg border">
              <p className="font-medium text-sm">{t('howToHelp.step3')}</p>
            </div>
            <div className="p-3 bg-white rounded-lg border">
              <p className="font-medium text-sm">{t('howToHelp.step4')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resources */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>{t('resources.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="flex-1">
              <Link href={`/${locale}/helplines`}>
                <Phone className="mr-2 h-4 w-4" />
                {t('resources.helplines')}
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href={`/${locale}/grievance`}>
                {t('resources.reportAnonymously')}
              </Link>
            </Button>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            {t('resources.source')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
