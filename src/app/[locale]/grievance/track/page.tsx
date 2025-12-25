'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getStatusColor, type GrievanceStatus } from '@/lib/constants/grievance-types';
import { toast } from 'sonner';

interface GrievanceResult {
  tracking_code: string;
  status: GrievanceStatus;
  grievance_type: string;
  created_at: string;
  status_updated_at: string;
}

export default function TrackPage() {
  const t = useTranslations('grievance.track');
  const tTypes = useTranslations('grievance.types');
  const locale = useLocale();
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GrievanceResult | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch(`/api/grievance/${code}`);
      if (!response.ok) {
        if (response.status === 404) {
          toast.error(locale === 'ar' ? 'لم يتم العثور على الشكوى' : 'Grievance not found');
        } else {
          throw new Error('Failed to fetch');
        }
        return;
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Track error:', error);
      toast.error(locale === 'ar' ? 'حدث خطأ' : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      locale === 'ar' ? 'ar-LB' : locale === 'fr' ? 'fr-FR' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="mx-auto max-w-lg">
        <CardHeader className="text-center">
          <CardTitle>{t('title')}</CardTitle>
          <CardDescription>{t('enterCode')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleTrack} className="flex gap-2">
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder={t('codePlaceholder')}
              className="flex-1 font-mono text-lg"
              maxLength={12}
            />
            <Button type="submit" disabled={isLoading || !code.trim()}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  {t('trackButton')}
                </>
              )}
            </Button>
          </form>

          {result && (
            <div className="border rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {locale === 'ar' ? 'الحالة' : 'Status'}
                </span>
                <Badge className={`${getStatusColor(result.status)} text-white`}>
                  {t(`status.${result.status}`)}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {locale === 'ar' ? 'النوع' : 'Type'}
                </span>
                <span className="font-medium">{tTypes(result.grievance_type)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {locale === 'ar' ? 'تاريخ التقديم' : 'Submitted'}
                </span>
                <span>{formatDate(result.created_at)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {locale === 'ar' ? 'آخر تحديث' : 'Last Updated'}
                </span>
                <span>{formatDate(result.status_updated_at)}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
