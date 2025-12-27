'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Play, Clock, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  selfDefenseVideos,
  getVideoTitle,
  getVideoDescription,
  getVideosByCategory,
  type SelfDefenseVideo,
} from '@/lib/constants/videos';

export default function SelfDefensePage() {
  const t = useTranslations('selfDefense');
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedVideo, setSelectedVideo] = useState<SelfDefenseVideo | null>(null);

  const categories = [
    { key: 'all', label: t('categories.all') },
    { key: 'basic', label: t('categories.basic') },
    { key: 'escape', label: t('categories.escape') },
    { key: 'awareness', label: t('categories.awareness') },
    { key: 'prevention', label: t('categories.prevention') },
  ];

  const filteredVideos = getVideosByCategory(activeCategory);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield className="h-8 w-8 text-accent-foreground" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('title')}</h1>
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

      {/* Selected Video Player */}
      {selectedVideo && (
        <Card className="mb-8">
          <CardContent className="p-0">
            <div className="aspect-video w-full">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.youtube_id}?autoplay=1`}
                title={getVideoTitle(selectedVideo, locale)}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-t-xl"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{getVideoTitle(selectedVideo, locale)}</h2>
              <p className="text-muted-foreground">{getVideoDescription(selectedVideo, locale)}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Videos Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredVideos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            locale={locale}
            isSelected={selectedVideo?.id === video.id}
            onSelect={() => setSelectedVideo(video)}
            t={t}
          />
        ))}
      </div>

      {/* Safety Tips Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          {locale === 'ar' ? 'نصائح السلامة العامة' : locale === 'fr' ? 'Conseils de sécurité généraux' : 'General Safety Tips'}
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <SafetyTipCard
            title={locale === 'ar' ? 'كوني على دراية بمحيطك' : locale === 'fr' ? 'Soyez consciente de votre environnement' : 'Be Aware of Your Surroundings'}
            description={locale === 'ar' ? 'انتبهي دائماً لمن حولك وتجنبي المناطق المعزولة' : locale === 'fr' ? 'Faites toujours attention à votre entourage et évitez les zones isolées' : 'Always pay attention to who is around you and avoid isolated areas'}
          />
          <SafetyTipCard
            title={locale === 'ar' ? 'ثقي بحدسك' : locale === 'fr' ? 'Faites confiance à votre instinct' : 'Trust Your Instincts'}
            description={locale === 'ar' ? 'إذا شعرت أن شيئاً ما غير صحيح، غادري فوراً' : locale === 'fr' ? 'Si quelque chose vous semble anormal, partez immédiatement' : 'If something feels wrong, leave immediately'}
          />
          <SafetyTipCard
            title={locale === 'ar' ? 'احتفظي بهاتفك مشحوناً' : locale === 'fr' ? 'Gardez votre téléphone chargé' : 'Keep Your Phone Charged'}
            description={locale === 'ar' ? 'تأكدي من أن هاتفك مشحون دائماً للاتصال في حالات الطوارئ' : locale === 'fr' ? 'Assurez-vous que votre téléphone est toujours chargé pour les urgences' : 'Make sure your phone is always charged for emergencies'}
          />
          <SafetyTipCard
            title={locale === 'ar' ? 'أخبري شخصاً ما' : locale === 'fr' ? 'Dites à quelqu\'un' : 'Tell Someone'}
            description={locale === 'ar' ? 'دائماً أخبري شخصاً تثقين به إلى أين أنت ذاهبة' : locale === 'fr' ? 'Dites toujours à quelqu\'un de confiance où vous allez' : 'Always tell someone you trust where you are going'}
          />
          <SafetyTipCard
            title={locale === 'ar' ? 'تعلمي التقنيات الأساسية' : locale === 'fr' ? 'Apprenez les techniques de base' : 'Learn Basic Techniques'}
            description={locale === 'ar' ? 'حتى الحركات البسيطة يمكن أن تساعدك على الهروب من موقف خطير' : locale === 'fr' ? 'Même des mouvements simples peuvent vous aider à échapper à une situation dangereuse' : 'Even simple moves can help you escape a dangerous situation'}
          />
          <SafetyTipCard
            title={locale === 'ar' ? 'استخدمي صوتك' : locale === 'fr' ? 'Utilisez votre voix' : 'Use Your Voice'}
            description={locale === 'ar' ? 'صرخة قوية وحازمة يمكن أن تردع المهاجم وتجذب الانتباه' : locale === 'fr' ? 'Un cri fort et ferme peut dissuader un agresseur et attirer l\'attention' : 'A loud, firm yell can deter an attacker and attract attention'}
          />
        </div>
      </div>
    </div>
  );
}

function VideoCard({
  video,
  locale,
  isSelected,
  onSelect,
  t,
}: {
  video: SelfDefenseVideo;
  locale: string;
  isSelected: boolean;
  onSelect: () => void;
  t: ReturnType<typeof useTranslations>;
}) {
  const title = getVideoTitle(video, locale);
  const description = getVideoDescription(video, locale);

  const categoryLabel = {
    basic: t('categories.basic'),
    escape: t('categories.escape'),
    awareness: t('categories.awareness'),
    prevention: t('categories.prevention'),
  }[video.category];

  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
      onClick={onSelect}
    >
      <div className="relative">
        <img
          src={`https://img.youtube.com/vi/${video.youtube_id}/maxresdefault.jpg`}
          alt={title}
          className="w-full aspect-video object-cover rounded-t-xl"
          onError={(e) => {
            // Fallback to hqdefault if maxresdefault doesn't exist
            e.currentTarget.src = `https://img.youtube.com/vi/${video.youtube_id}/hqdefault.jpg`;
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity rounded-t-xl">
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
            <Play className="h-8 w-8 text-primary ml-1" />
          </div>
        </div>
        <Badge className="absolute bottom-2 right-2 bg-black/70">
          <Clock className="h-3 w-3 mr-1" />
          {video.duration}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base line-clamp-2">{title}</CardTitle>
        </div>
        <Badge variant="secondary" className="w-fit">
          {categoryLabel}
        </Badge>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

function SafetyTipCard({ title, description }: { title: string; description: string }) {
  return (
    <Card className="bg-accent/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
