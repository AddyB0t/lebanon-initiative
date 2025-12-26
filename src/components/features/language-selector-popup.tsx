'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const languages = [
  { code: 'ar', name: 'العربية', nativeName: 'Arabic', flag: '🇱🇧' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', nativeName: 'French', flag: '🇫🇷' },
];

export default function LanguageSelectorPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  useEffect(() => {
    // Check if user has already selected a language
    const hasSelectedLanguage = localStorage.getItem('lgi-language-selected');
    if (!hasSelectedLanguage) {
      // Show popup after a short delay for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSelectLanguage = (langCode: string) => {
    // Mark that user has selected a language
    localStorage.setItem('lgi-language-selected', 'true');
    setIsOpen(false);

    // If selecting a different language, redirect
    if (langCode !== currentLocale) {
      // Get path without locale prefix
      const pathWithoutLocale = pathname.replace(/^\/(ar|en|fr)/, '') || '/';
      router.push(`/${langCode}${pathWithoutLocale}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Globe className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl">
            Choose Your Language
          </DialogTitle>
          <DialogDescription className="text-center">
            اختر لغتك المفضلة | Choisissez votre langue
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-4">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant={lang.code === currentLocale ? 'default' : 'outline'}
              className="w-full justify-start gap-3 h-14 text-lg"
              onClick={() => handleSelectLanguage(lang.code)}
            >
              <span className="text-2xl">{lang.flag}</span>
              <span className="font-semibold">{lang.name}</span>
              {lang.code !== 'en' && (
                <span className="text-muted-foreground text-sm ml-auto">
                  ({lang.nativeName})
                </span>
              )}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
