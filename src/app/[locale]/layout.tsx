import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import PanicButton from '@/components/features/panic-button';
import ChatWidget from '@/components/features/chat-widget';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const fontClass = locale === 'ar' ? 'font-arabic' : inter.variable;

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        {locale === 'ar' && (
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        )}
      </head>
      <body
        className={`${fontClass} min-h-screen bg-background text-foreground antialiased`}
        style={{ fontFamily: locale === 'ar' ? "'Noto Sans Arabic', sans-serif" : undefined }}
      >
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <PanicButton />
          <ChatWidget />
          <Toaster position={dir === 'rtl' ? 'top-left' : 'top-right'} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
