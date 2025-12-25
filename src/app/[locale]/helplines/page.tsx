'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Phone, MessageCircle, MessageSquare, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  helplines,
  getHelplineName,
  getHelplineDescription,
  getHelplinesByCategory,
  type Helpline,
} from '@/lib/constants/helplines';

export default function HelplinesPage() {
  const t = useTranslations('helplines');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: t('categories.all') },
    { key: 'emergency', label: t('categories.emergency') },
    { key: 'domestic_violence', label: t('categories.domestic_violence') },
    { key: 'shelter', label: t('categories.shelter') },
    { key: 'mental_health', label: t('categories.mental_health') },
    { key: 'legal', label: t('categories.legal') },
  ];

  const filteredHelplines = getHelplinesByCategory(activeCategory);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
        <p className="text-xl text-muted-foreground">{t('subtitle')}</p>
      </div>

      {/* Category Tabs */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
        <TabsList className="flex flex-wrap h-auto gap-2 justify-center">
          {categories.map((cat) => (
            <TabsTrigger key={cat.key} value={cat.key} className="px-4">
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Helplines Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredHelplines.map((helpline) => (
          <HelplineCard key={helpline.id} helpline={helpline} locale={locale} tCommon={tCommon} />
        ))}
      </div>
    </div>
  );
}

function HelplineCard({
  helpline,
  locale,
  tCommon,
}: {
  helpline: Helpline;
  locale: string;
  tCommon: ReturnType<typeof useTranslations>;
}) {
  const name = getHelplineName(helpline, locale);
  const description = getHelplineDescription(helpline, locale);
  const hours = locale === 'ar' ? helpline.hours_ar : locale === 'fr' ? helpline.hours_fr : helpline.hours_en;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
          {hours === '24/7' && (
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <Clock className="h-3 w-3 mr-1" />
              {tCommon('available247')}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-end space-y-4">
        {/* Phone Number Display */}
        <div className="text-center py-4 bg-muted rounded-lg">
          <p className="text-2xl font-bold tracking-wider">{helpline.phone_display}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          {/* Call Button */}
          <Button asChild className="flex-1" size="lg">
            <a href={`tel:${helpline.phone_number}`}>
              <Phone className="mr-2 h-5 w-5" />
              {tCommon('callNow')}
            </a>
          </Button>

          {/* WhatsApp Button */}
          {helpline.whatsapp_number && (
            <Button asChild variant="outline" size="lg" className="flex-1">
              <a
                href={`https://wa.me/${helpline.whatsapp_number.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5 text-green-600" />
                {tCommon('whatsapp')}
              </a>
            </Button>
          )}

          {/* SMS Button */}
          {helpline.has_sms && (
            <Button asChild variant="outline" size="lg" className="flex-1">
              <a href={`sms:${helpline.phone_number}`}>
                <MessageSquare className="mr-2 h-5 w-5" />
                {tCommon('sms')}
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
