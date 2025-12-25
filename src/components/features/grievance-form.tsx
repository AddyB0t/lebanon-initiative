'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { villages, getVillageName } from '@/lib/constants/villages';
import { grievanceTypes, type GrievanceType } from '@/lib/constants/grievance-types';
import { toast } from 'sonner';

const formSchema = z.object({
  complainant_name: z.string().optional(),
  complainant_email: z.string().email().optional().or(z.literal('')),
  complainant_phone: z.string().optional(),
  is_anonymous: z.boolean().optional().default(true),
  village_id: z.string().optional(),
  custom_location: z.string().optional(),
  grievance_type: z.enum([
    'harassment',
    'domestic_violence',
    'workplace_discrimination',
    'sexual_assault',
    'child_abuse',
    'economic_abuse',
    'stalking',
    'forced_marriage',
    'honor_violence',
    'other',
  ]),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  incident_date: z.string().optional(),
});

type GrievanceFormData = z.infer<typeof formSchema>;

export default function GrievanceForm() {
  const t = useTranslations('grievance');
  const locale = useLocale();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isAnonymous, setIsAnonymous] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      is_anonymous: true,
      grievance_type: undefined as unknown as GrievanceFormData['grievance_type'],
      description: '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      // Validate file size (10MB max)
      const validFiles = newFiles.filter((file) => file.size <= 10 * 1024 * 1024);
      if (validFiles.length !== newFiles.length) {
        toast.error('Some files exceeded the 10MB limit');
      }
      setFiles((prev) => [...prev, ...validFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: GrievanceFormData) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          formData.append(key, String(value));
        }
      });
      formData.append('preferred_language', locale);

      // Append files
      files.forEach((file) => {
        formData.append('files', file);
      });

      const response = await fetch('/api/grievance', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit grievance');
      }

      const result = await response.json();
      router.push(`/${locale}/grievance/success?code=${result.tracking_code}`);
    } catch (error) {
      console.error('Submit error:', error);
      toast.error(t('form.error') || 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('subtitle')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Anonymous Toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="is_anonymous"
              checked={isAnonymous}
              onChange={(e) => {
                setIsAnonymous(e.target.checked);
                setValue('is_anonymous', e.target.checked);
              }}
              className="h-4 w-4 rounded border-gray-300"
            />
            <Label htmlFor="is_anonymous">{t('form.anonymous')}</Label>
          </div>

          {/* Contact Info (shown if not anonymous) */}
          {!isAnonymous && (
            <div className="space-y-4 border rounded-lg p-4 bg-muted/30">
              <div>
                <Label htmlFor="complainant_name">{t('form.name')}</Label>
                <Input
                  id="complainant_name"
                  {...register('complainant_name')}
                  placeholder={t('form.namePlaceholder')}
                />
              </div>
              <div>
                <Label htmlFor="complainant_email">{t('form.email')}</Label>
                <Input
                  id="complainant_email"
                  type="email"
                  {...register('complainant_email')}
                  placeholder={t('form.emailPlaceholder')}
                />
              </div>
              <div>
                <Label htmlFor="complainant_phone">{t('form.phone')}</Label>
                <Input
                  id="complainant_phone"
                  {...register('complainant_phone')}
                  placeholder={t('form.phonePlaceholder')}
                />
              </div>
            </div>
          )}

          {/* Village */}
          <div>
            <Label>{t('form.village')}</Label>
            <Select onValueChange={(value) => setValue('village_id', value)}>
              <SelectTrigger>
                <SelectValue placeholder={t('form.selectVillage')} />
              </SelectTrigger>
              <SelectContent>
                {villages.map((village) => (
                  <SelectItem key={village.id} value={village.id}>
                    {getVillageName(village, locale)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Custom Location */}
          <div>
            <Label htmlFor="custom_location">{t('form.otherLocation')}</Label>
            <Input
              id="custom_location"
              {...register('custom_location')}
              placeholder={locale === 'ar' ? 'إذا لم تجد قريتك في القائمة' : 'If your village is not in the list'}
            />
          </div>

          {/* Grievance Type */}
          <div>
            <Label>{t('form.grievanceType')}</Label>
            <Select onValueChange={(value) => setValue('grievance_type', value as GrievanceType)}>
              <SelectTrigger>
                <SelectValue placeholder={t('form.selectType')} />
              </SelectTrigger>
              <SelectContent>
                {grievanceTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.icon} {t(`types.${type.id}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.grievance_type && (
              <p className="text-sm text-destructive mt-1">{errors.grievance_type.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">{t('form.description')}</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder={t('form.descriptionPlaceholder')}
              rows={6}
            />
            {errors.description && (
              <p className="text-sm text-destructive mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Incident Date */}
          <div>
            <Label htmlFor="incident_date">{t('form.incidentDate')}</Label>
            <Input id="incident_date" type="date" {...register('incident_date')} />
          </div>

          {/* File Upload */}
          <div>
            <Label>{t('form.uploadEvidence')}</Label>
            <p className="text-sm text-muted-foreground mb-2">{t('form.uploadHint')}</p>
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <input
                type="file"
                id="file-upload"
                multiple
                accept="image/*,.pdf,audio/*,video/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload className="h-8 w-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {locale === 'ar' ? 'انقر للتحميل' : 'Click to upload'}
                </span>
              </label>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-muted rounded-lg p-2"
                  >
                    <span className="text-sm truncate flex-1">{file.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('form.submitting')}
              </>
            ) : (
              t('form.submitButton')
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
