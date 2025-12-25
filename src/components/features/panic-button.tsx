'use client';

import { useTranslations, useLocale } from 'next-intl';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PanicButton() {
  const t = useTranslations('panic');
  const locale = useLocale();

  const handlePanic = () => {
    // Replace current history entry and redirect to Google
    window.location.replace('https://www.google.com');
  };

  // Keyboard shortcut - ESC key to quickly exit
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        handlePanic();
      }
    });
  }

  return (
    <Button
      onClick={handlePanic}
      variant="destructive"
      size="sm"
      className={`fixed ${locale === 'ar' ? 'left-4' : 'right-4'} top-20 z-50 gap-2 shadow-lg hover:scale-105 transition-transform`}
      title={t('tooltip')}
    >
      <X className="h-4 w-4" />
      <span className="hidden sm:inline">{t('hideButton')}</span>
    </Button>
  );
}
