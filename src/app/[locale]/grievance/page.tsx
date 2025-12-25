import { setRequestLocale } from 'next-intl/server';
import GrievanceForm from '@/components/features/grievance-form';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function GrievancePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container mx-auto px-4 py-12">
      <GrievanceForm />
    </div>
  );
}
