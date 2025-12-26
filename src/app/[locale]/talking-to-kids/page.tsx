'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Baby,
  MessageCircle,
  Lightbulb,
  Heart,
  BookOpen,
  Users,
  Star
} from 'lucide-react';

export default function TalkingToKidsPage() {
  const t = useTranslations('talkingToKids');
  const locale = useLocale();

  const ageGroups = [
    { key: 'young', age: '3-6', color: 'bg-pink-100 text-pink-700' },
    { key: 'middle', age: '7-11', color: 'bg-blue-100 text-blue-700' },
    { key: 'teen', age: '12+', color: 'bg-purple-100 text-purple-700' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 mb-4">
          <MessageCircle className="h-8 w-8 text-orange-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      {/* Why it's Important */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            {t('whyImportant.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{t('whyImportant.description')}</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <Star className="h-4 w-4 text-yellow-500 mt-1 shrink-0" />
              <span>{t('whyImportant.point1')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Star className="h-4 w-4 text-yellow-500 mt-1 shrink-0" />
              <span>{t('whyImportant.point2')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Star className="h-4 w-4 text-yellow-500 mt-1 shrink-0" />
              <span>{t('whyImportant.point3')}</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Age-Appropriate Conversations */}
      <h2 className="text-2xl font-bold mb-6 text-center">{t('ageGroups.title')}</h2>
      <div className="grid gap-6 lg:grid-cols-3 mb-12">
        {ageGroups.map((group) => (
          <Card key={group.key}>
            <CardHeader>
              <div className={`w-12 h-12 rounded-lg ${group.color} flex items-center justify-center mb-2`}>
                <Baby className="h-6 w-6" />
              </div>
              <CardTitle>
                {t(`ageGroups.${group.key}.title`)}
                <span className="block text-sm font-normal text-muted-foreground mt-1">
                  {group.age} {locale === 'ar' ? 'سنوات' : locale === 'fr' ? 'ans' : 'years'}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
                  <span>{t(`ageGroups.${group.key}.tip1`)}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
                  <span>{t(`ageGroups.${group.key}.tip2`)}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
                  <span>{t(`ageGroups.${group.key}.tip3`)}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Key Messages to Share */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            {t('keyMessages.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-blue-50">
                <p className="font-medium text-blue-800">{t('keyMessages.message1.title')}</p>
                <p className="text-sm text-blue-600">{t('keyMessages.message1.example')}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-50">
                <p className="font-medium text-green-800">{t('keyMessages.message2.title')}</p>
                <p className="text-sm text-green-600">{t('keyMessages.message2.example')}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-purple-50">
                <p className="font-medium text-purple-800">{t('keyMessages.message3.title')}</p>
                <p className="text-sm text-purple-600">{t('keyMessages.message3.example')}</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-50">
                <p className="font-medium text-orange-800">{t('keyMessages.message4.title')}</p>
                <p className="text-sm text-orange-600">{t('keyMessages.message4.example')}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conversation Starters */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            {t('starters.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="p-3 bg-white rounded-lg border">
              <p className="italic text-muted-foreground">"{t('starters.starter1')}"</p>
            </li>
            <li className="p-3 bg-white rounded-lg border">
              <p className="italic text-muted-foreground">"{t('starters.starter2')}"</p>
            </li>
            <li className="p-3 bg-white rounded-lg border">
              <p className="italic text-muted-foreground">"{t('starters.starter3')}"</p>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
