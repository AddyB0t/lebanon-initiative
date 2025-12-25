'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Baby, Heart, AlertTriangle, Shield, Users, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ChildrenSafetyPage() {
  const t = useTranslations('childrenSafety');
  const locale = useLocale();

  const content = {
    en: {
      goodTouchTitle: 'Good Touch',
      goodTouchDesc: 'These are touches that make you feel safe, loved, and happy',
      goodTouchItems: [
        'A hug from mom, dad, or grandparents',
        'A pat on the back for doing well',
        'A high-five from a friend',
        'A doctor checking your health with parent present',
        'Holding hands with a trusted adult',
      ],
      badTouchTitle: 'Bad Touch',
      badTouchDesc: 'These are touches that make you feel uncomfortable, scared, or confused',
      badTouchItems: [
        'Any touch on private body parts',
        'Touches that are kept "secret"',
        'Touches that hurt or feel wrong',
        'Any touch that makes you feel scared',
        'Being asked to touch someone else\'s private parts',
      ],
      whatToDoTitle: 'What To Do',
      whatToDoDesc: 'If someone touches you in a way that feels wrong',
      whatToDoItems: [
        'Say "NO!" loudly and clearly',
        'Get away from the person as fast as you can',
        'Tell a trusted adult immediately',
        'Keep telling until someone helps you',
        'Remember: It is NEVER your fault',
      ],
      forParentsTitle: 'For Parents & Caregivers',
      forParentsDesc: 'How to protect your children and talk about body safety',
      forParentsItems: [
        'Use proper names for body parts',
        'Teach the difference between good and bad touches',
        'Create an open environment for questions',
        'Believe your child if they report something',
        'Know the warning signs of abuse',
        'Supervise online activities',
      ],
      privatePartsTitle: 'Private Body Parts',
      privatePartsDesc: 'Areas covered by underwear or swimsuit that only you should touch',
      warningSignsTitle: 'Warning Signs for Parents',
      warningSignsItems: [
        'Sudden changes in behavior',
        'Fear of certain people or places',
        'Nightmares or sleep problems',
        'Age-inappropriate sexual knowledge',
        'Withdrawal from friends or activities',
        'Unexplained injuries',
      ],
    },
    ar: {
      goodTouchTitle: 'اللمسة الجيدة',
      goodTouchDesc: 'هذه لمسات تجعلك تشعر بالأمان والحب والسعادة',
      goodTouchItems: [
        'عناق من الأم أو الأب أو الأجداد',
        'ربتة على الظهر عند القيام بعمل جيد',
        'تحية باليد من صديق',
        'فحص الطبيب لصحتك بوجود الوالدين',
        'إمساك اليد مع شخص بالغ موثوق',
      ],
      badTouchTitle: 'اللمسة السيئة',
      badTouchDesc: 'هذه لمسات تجعلك تشعر بعدم الارتياح أو الخوف أو الحيرة',
      badTouchItems: [
        'أي لمسة على الأماكن الخاصة من الجسم',
        'لمسات يُطلب منك إبقاؤها "سراً"',
        'لمسات تؤلم أو تشعرك بالخطأ',
        'أي لمسة تجعلك تشعر بالخوف',
        'الطلب منك لمس الأماكن الخاصة لشخص آخر',
      ],
      whatToDoTitle: 'ماذا تفعل',
      whatToDoDesc: 'إذا لمسك شخص ما بطريقة تشعرك بالخطأ',
      whatToDoItems: [
        'قل "لا!" بصوت عالٍ وواضح',
        'ابتعد عن الشخص بأسرع ما يمكن',
        'أخبر شخصاً بالغاً تثق به فوراً',
        'استمر في الإخبار حتى يساعدك أحد',
        'تذكر: هذا ليس خطأك أبداً',
      ],
      forParentsTitle: 'للآباء والأمهات ومقدمي الرعاية',
      forParentsDesc: 'كيف تحمي أطفالك وتتحدث عن سلامة الجسم',
      forParentsItems: [
        'استخدم الأسماء الصحيحة لأعضاء الجسم',
        'علّم الفرق بين اللمسات الجيدة والسيئة',
        'اخلق بيئة منفتحة للأسئلة',
        'صدّق طفلك إذا أبلغ عن شيء ما',
        'اعرف علامات التحذير من الإساءة',
        'راقب الأنشطة عبر الإنترنت',
      ],
      privatePartsTitle: 'الأماكن الخاصة من الجسم',
      privatePartsDesc: 'المناطق التي يغطيها الملابس الداخلية والتي يجب أن تلمسها أنت فقط',
      warningSignsTitle: 'علامات التحذير للآباء',
      warningSignsItems: [
        'تغيرات مفاجئة في السلوك',
        'الخوف من أشخاص أو أماكن معينة',
        'كوابيس أو مشاكل في النوم',
        'معرفة جنسية غير مناسبة للعمر',
        'الانسحاب من الأصدقاء أو الأنشطة',
        'إصابات غير مفسرة',
      ],
    },
    fr: {
      goodTouchTitle: 'Bon Toucher',
      goodTouchDesc: 'Ce sont des touches qui vous font sentir en sécurité, aimé et heureux',
      goodTouchItems: [
        'Un câlin de maman, papa ou grands-parents',
        'Une tape dans le dos pour du bon travail',
        'Un high-five d\'un ami',
        'Un médecin vérifiant votre santé avec un parent présent',
        'Tenir la main d\'un adulte de confiance',
      ],
      badTouchTitle: 'Mauvais Toucher',
      badTouchDesc: 'Ce sont des touches qui vous font sentir mal à l\'aise, effrayé ou confus',
      badTouchItems: [
        'Tout toucher sur les parties intimes du corps',
        'Des touches gardées "secrètes"',
        'Des touches qui font mal ou semblent mauvaises',
        'Tout toucher qui vous fait peur',
        'Être demandé de toucher les parties intimes de quelqu\'un',
      ],
      whatToDoTitle: 'Que Faire',
      whatToDoDesc: 'Si quelqu\'un vous touche d\'une manière qui semble incorrecte',
      whatToDoItems: [
        'Dites "NON!" fort et clairement',
        'Éloignez-vous de la personne aussi vite que possible',
        'Dites-le à un adulte de confiance immédiatement',
        'Continuez à le dire jusqu\'à ce que quelqu\'un vous aide',
        'Rappelez-vous : Ce n\'est JAMAIS votre faute',
      ],
      forParentsTitle: 'Pour les Parents et Soignants',
      forParentsDesc: 'Comment protéger vos enfants et parler de la sécurité corporelle',
      forParentsItems: [
        'Utilisez les noms corrects pour les parties du corps',
        'Enseignez la différence entre les bons et mauvais touchers',
        'Créez un environnement ouvert aux questions',
        'Croyez votre enfant s\'il signale quelque chose',
        'Connaissez les signes d\'alerte de maltraitance',
        'Supervisez les activités en ligne',
      ],
      privatePartsTitle: 'Parties Intimes du Corps',
      privatePartsDesc: 'Zones couvertes par les sous-vêtements que seul vous devez toucher',
      warningSignsTitle: 'Signes d\'Alerte pour les Parents',
      warningSignsItems: [
        'Changements soudains de comportement',
        'Peur de certaines personnes ou lieux',
        'Cauchemars ou problèmes de sommeil',
        'Connaissance sexuelle inappropriée pour l\'âge',
        'Retrait des amis ou activités',
        'Blessures inexpliquées',
      ],
    },
  };

  const c = content[locale as keyof typeof content] || content.en;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Baby className="h-8 w-8 text-pink-600" />
        </div>
        <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
        <p className="text-xl text-muted-foreground">{t('subtitle')}</p>
      </div>

      {/* Good Touch / Bad Touch Cards */}
      <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto mb-12">
        {/* Good Touch */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-green-700">{c.goodTouchTitle}</CardTitle>
            <CardDescription className="text-green-600">{c.goodTouchDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {c.goodTouchItems.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-green-700">
                  <span className="text-green-500 mt-1">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Bad Touch */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-red-700">{c.badTouchTitle}</CardTitle>
            <CardDescription className="text-red-600">{c.badTouchDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {c.badTouchItems.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-red-700">
                  <span className="text-red-500 mt-1">✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* What To Do */}
      <Card className="max-w-3xl mx-auto mb-12 border-blue-200 bg-blue-50">
        <CardHeader>
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle className="text-blue-700">{c.whatToDoTitle}</CardTitle>
          <CardDescription className="text-blue-600">{c.whatToDoDesc}</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            {c.whatToDoItems.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-blue-700">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* For Parents Section */}
      <div className="max-w-4xl mx-auto">
        <Card className="border-purple-200 bg-purple-50 mb-8">
          <CardHeader>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <CardTitle className="text-purple-700">{c.forParentsTitle}</CardTitle>
            <CardDescription className="text-purple-600">{c.forParentsDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {c.forParentsItems.map((item, index) => (
                <div key={index} className="flex items-start gap-2 text-purple-700">
                  <span className="text-purple-500 mt-1">•</span>
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Warning Signs */}
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-700">{c.warningSignsTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              {c.warningSignsItems.map((item, index) => (
                <div key={index} className="flex items-start gap-2 text-orange-700">
                  <AlertTriangle className="h-4 w-4 text-orange-500 mt-1 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Contact */}
      <Card className="max-w-2xl mx-auto mt-12 bg-destructive/10 border-destructive/30">
        <CardHeader className="text-center">
          <CardTitle className="text-destructive">
            {locale === 'ar' ? 'إذا كان طفل في خطر' : locale === 'fr' ? 'Si un enfant est en danger' : 'If a child is in danger'}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="destructive">
            <a href="tel:112">
              <Phone className="mr-2 h-4 w-4" />
              {locale === 'ar' ? 'اتصل بالطوارئ 112' : locale === 'fr' ? 'Appeler les urgences 112' : 'Call Emergency 112'}
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href="tel:+96176348299">
              <Phone className="mr-2 h-4 w-4" />
              +961 76 348 299
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
