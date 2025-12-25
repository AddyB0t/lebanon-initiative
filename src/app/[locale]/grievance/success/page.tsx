'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { CheckCircle, Copy, Search, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

function SuccessContent() {
  const t = useTranslations('grievance.success');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const trackingCode = searchParams.get('code') || 'N/A';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(trackingCode);
    toast.success(locale === 'ar' ? 'تم النسخ' : 'Copied to clipboard');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="mx-auto max-w-lg text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl">{t('title')}</CardTitle>
          <CardDescription className="text-base">{t('message')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">{t('trackingCode')}</p>
            <div className="flex items-center justify-center gap-2">
              <code className="text-2xl font-bold tracking-wider">{trackingCode}</code>
              <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">{t('saveCode')}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="default">
              <Link href={`/${locale}/grievance/track`}>
                <Search className="mr-2 h-4 w-4" />
                {t('trackLink')}
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/${locale}/grievance`}>
                <FileText className="mr-2 h-4 w-4" />
                {t('submitAnother')}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="mx-auto max-w-lg text-center">
        <CardContent className="py-12">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
        </CardContent>
      </Card>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SuccessContent />
    </Suspense>
  );
}
