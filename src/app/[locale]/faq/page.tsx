'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { HelpCircle, ChevronDown, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqItems, getFAQQuestion, getFAQAnswer, getFAQsByCategory } from '@/lib/constants/faq';

export default function FAQPage() {
  const t = useTranslations('faq');
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { key: 'all', label: locale === 'ar' ? 'الكل' : locale === 'fr' ? 'Tous' : 'All' },
    { key: 'general', label: locale === 'ar' ? 'عام' : locale === 'fr' ? 'Général' : 'General' },
    { key: 'grievance', label: locale === 'ar' ? 'الشكاوى' : locale === 'fr' ? 'Plaintes' : 'Grievances' },
    { key: 'privacy', label: locale === 'ar' ? 'الخصوصية' : locale === 'fr' ? 'Confidentialité' : 'Privacy' },
    { key: 'support', label: locale === 'ar' ? 'الدعم' : locale === 'fr' ? 'Soutien' : 'Support' },
  ];

  const filteredFAQs = getFAQsByCategory(activeCategory);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <HelpCircle className="h-8 w-8 text-primary" />
        </div>
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

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          {filteredFAQs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} className="border rounded-lg px-4">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-medium">{getFAQQuestion(faq, locale)}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                {getFAQAnswer(faq, locale)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Still Have Questions */}
      <Card className="max-w-2xl mx-auto mt-12 bg-primary/5 border-primary/20">
        <CardHeader className="text-center">
          <CardTitle>
            {locale === 'ar' ? 'هل لديك أسئلة أخرى؟' : locale === 'fr' ? 'Vous avez encore des questions ?' : 'Still have questions?'}
          </CardTitle>
          <CardDescription>
            {locale === 'ar' ? 'تواصلي معنا مباشرة للحصول على المساعدة' : locale === 'fr' ? 'Contactez-nous directement pour obtenir de l\'aide' : 'Contact us directly for assistance'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <a href="tel:+96176348299">
              <Phone className="mr-2 h-4 w-4" />
              {locale === 'ar' ? 'اتصلي الآن' : locale === 'fr' ? 'Appeler maintenant' : 'Call Now'}
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href="https://wa.me/96176348299" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
