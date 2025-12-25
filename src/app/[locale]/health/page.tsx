'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Heart, AlertCircle, Calendar, Phone, CheckCircle, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HealthPage() {
  const t = useTranslations('health');
  const locale = useLocale();

  const content = {
    en: {
      breastCancerTitle: 'Breast Cancer Awareness',
      breastCancerIntro: 'Early detection saves lives. Learn how to perform self-examinations and recognize warning signs.',
      selfExamTitle: 'Self-Examination Guide',
      selfExamSteps: [
        'Stand in front of a mirror with arms at sides',
        'Look for changes in breast shape, size, or skin',
        'Raise arms and look for the same changes',
        'Lie down and use finger pads to examine each breast',
        'Move in circular patterns from outer edge to nipple',
        'Check for lumps, thickening, or changes',
        'Repeat while standing or in shower',
      ],
      warningSignsTitle: 'Warning Signs',
      warningSigns: [
        'A new lump in breast or underarm',
        'Thickening or swelling of part of the breast',
        'Irritation or dimpling of breast skin',
        'Redness or flaky skin on nipple or breast',
        'Pulling in of the nipple',
        'Nipple discharge other than breast milk',
        'Any change in breast size or shape',
        'Pain in any area of the breast',
      ],
      whenToSeeTitle: 'When to See a Doctor',
      whenToSeeItems: [
        'If you notice any of the warning signs',
        'If you feel any new lump or change',
        'For regular screening (yearly after age 40)',
        'If you have family history of breast cancer',
        'If you experience unexplained breast pain',
      ],
      preventionTitle: 'Prevention Tips',
      preventionItems: [
        'Maintain a healthy weight',
        'Exercise regularly (at least 30 minutes daily)',
        'Limit alcohol consumption',
        'Avoid smoking',
        'Breastfeed if possible',
        'Eat a balanced diet rich in fruits and vegetables',
        'Get regular screenings',
      ],
      screeningTitle: 'Screening Recommendations',
      screeningItems: [
        'Ages 20-39: Monthly self-exams, clinical exam every 3 years',
        'Ages 40+: Yearly mammogram and clinical exam',
        'High risk: May need earlier and more frequent screening',
      ],
      generalHealthTitle: 'General Women\'s Health Tips',
      generalHealthItems: [
        'Schedule regular check-ups with your doctor',
        'Stay physically active',
        'Eat a nutritious, balanced diet',
        'Get enough sleep (7-8 hours)',
        'Manage stress through healthy activities',
        'Stay hydrated',
        'Don\'t skip vaccinations',
        'Take care of your mental health',
      ],
    },
    ar: {
      breastCancerTitle: 'التوعية بسرطان الثدي',
      breastCancerIntro: 'الاكتشاف المبكر ينقذ الأرواح. تعلمي كيفية إجراء الفحص الذاتي والتعرف على علامات التحذير.',
      selfExamTitle: 'دليل الفحص الذاتي',
      selfExamSteps: [
        'قفي أمام المرآة مع وضع الذراعين على الجانبين',
        'ابحثي عن تغييرات في شكل الثدي أو حجمه أو الجلد',
        'ارفعي ذراعيك وابحثي عن نفس التغييرات',
        'استلقي واستخدمي أطراف الأصابع لفحص كل ثدي',
        'تحركي بحركات دائرية من الحافة الخارجية إلى الحلمة',
        'تحققي من الكتل أو التثخن أو التغييرات',
        'كرري أثناء الوقوف أو في الحمام',
      ],
      warningSignsTitle: 'علامات التحذير',
      warningSigns: [
        'كتلة جديدة في الثدي أو تحت الإبط',
        'تثخن أو تورم جزء من الثدي',
        'تهيج أو تجعد في جلد الثدي',
        'احمرار أو جلد متقشر على الحلمة أو الثدي',
        'انسحاب الحلمة إلى الداخل',
        'إفرازات من الحلمة غير حليب الثدي',
        'أي تغيير في حجم أو شكل الثدي',
        'ألم في أي منطقة من الثدي',
      ],
      whenToSeeTitle: 'متى تزورين الطبيب',
      whenToSeeItems: [
        'إذا لاحظتِ أي علامة من علامات التحذير',
        'إذا شعرتِ بأي كتلة جديدة أو تغيير',
        'للفحص المنتظم (سنوياً بعد سن 40)',
        'إذا كان لديك تاريخ عائلي لسرطان الثدي',
        'إذا كنتِ تعانين من ألم ثدي غير مفسر',
      ],
      preventionTitle: 'نصائح الوقاية',
      preventionItems: [
        'حافظي على وزن صحي',
        'مارسي الرياضة بانتظام (30 دقيقة على الأقل يومياً)',
        'قللي من استهلاك الكحول',
        'تجنبي التدخين',
        'أرضعي طفلك رضاعة طبيعية إن أمكن',
        'تناولي نظاماً غذائياً متوازناً غنياً بالفواكه والخضروات',
        'احصلي على فحوصات منتظمة',
      ],
      screeningTitle: 'توصيات الفحص',
      screeningItems: [
        'الأعمار 20-39: فحص ذاتي شهري، فحص سريري كل 3 سنوات',
        'الأعمار 40+: تصوير ماموغرام سنوي وفحص سريري',
        'عالية الخطورة: قد تحتاجين فحصاً مبكراً ومتكرراً أكثر',
      ],
      generalHealthTitle: 'نصائح عامة لصحة المرأة',
      generalHealthItems: [
        'حددي مواعيد فحوصات منتظمة مع طبيبك',
        'ابقي نشيطة بدنياً',
        'تناولي نظاماً غذائياً مغذياً ومتوازناً',
        'احصلي على نوم كافٍ (7-8 ساعات)',
        'تحكمي في التوتر من خلال أنشطة صحية',
        'اشربي كمية كافية من الماء',
        'لا تتجاهلي التطعيمات',
        'اعتني بصحتك النفسية',
      ],
    },
    fr: {
      breastCancerTitle: 'Sensibilisation au Cancer du Sein',
      breastCancerIntro: 'La détection précoce sauve des vies. Apprenez à effectuer des auto-examens et à reconnaître les signes d\'alerte.',
      selfExamTitle: 'Guide d\'Auto-Examen',
      selfExamSteps: [
        'Tenez-vous devant un miroir, bras le long du corps',
        'Cherchez des changements de forme, taille ou peau du sein',
        'Levez les bras et cherchez les mêmes changements',
        'Allongez-vous et utilisez le bout des doigts pour examiner chaque sein',
        'Déplacez-vous en mouvements circulaires du bord extérieur vers le mamelon',
        'Vérifiez les bosses, épaississements ou changements',
        'Répétez debout ou sous la douche',
      ],
      warningSignsTitle: 'Signes d\'Alerte',
      warningSigns: [
        'Une nouvelle bosse dans le sein ou l\'aisselle',
        'Épaississement ou gonflement d\'une partie du sein',
        'Irritation ou fossette de la peau du sein',
        'Rougeur ou peau squameuse sur le mamelon ou le sein',
        'Rétraction du mamelon',
        'Écoulement du mamelon autre que le lait maternel',
        'Tout changement de taille ou forme du sein',
        'Douleur dans n\'importe quelle zone du sein',
      ],
      whenToSeeTitle: 'Quand Consulter un Médecin',
      whenToSeeItems: [
        'Si vous remarquez l\'un des signes d\'alerte',
        'Si vous sentez une nouvelle bosse ou un changement',
        'Pour un dépistage régulier (annuel après 40 ans)',
        'Si vous avez des antécédents familiaux de cancer du sein',
        'Si vous avez une douleur mammaire inexpliquée',
      ],
      preventionTitle: 'Conseils de Prévention',
      preventionItems: [
        'Maintenez un poids santé',
        'Faites de l\'exercice régulièrement (au moins 30 minutes par jour)',
        'Limitez la consommation d\'alcool',
        'Évitez de fumer',
        'Allaitez si possible',
        'Mangez une alimentation équilibrée riche en fruits et légumes',
        'Faites des dépistages réguliers',
      ],
      screeningTitle: 'Recommandations de Dépistage',
      screeningItems: [
        'Âges 20-39 : Auto-examen mensuel, examen clinique tous les 3 ans',
        'Âges 40+ : Mammographie annuelle et examen clinique',
        'Risque élevé : Peut nécessiter un dépistage plus précoce et fréquent',
      ],
      generalHealthTitle: 'Conseils de Santé Générale pour les Femmes',
      generalHealthItems: [
        'Planifiez des examens réguliers avec votre médecin',
        'Restez physiquement active',
        'Mangez une alimentation nutritive et équilibrée',
        'Dormez suffisamment (7-8 heures)',
        'Gérez le stress par des activités saines',
        'Restez hydratée',
        'Ne sautez pas les vaccinations',
        'Prenez soin de votre santé mentale',
      ],
    },
  };

  const c = content[locale as keyof typeof content] || content.en;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="h-8 w-8 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
        <p className="text-xl text-muted-foreground">{t('subtitle')}</p>
      </div>

      {/* Breast Cancer Section */}
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8 border-pink-200 bg-pink-50">
          <CardHeader>
            <CardTitle className="text-pink-700 text-2xl">{c.breastCancerTitle}</CardTitle>
            <CardDescription className="text-pink-600 text-base">{c.breastCancerIntro}</CardDescription>
          </CardHeader>
        </Card>

        {/* Self-Exam Guide */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Stethoscope className="h-5 w-5 text-blue-600" />
              </div>
              <CardTitle>{c.selfExamTitle}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {c.selfExamSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Warning Signs */}
        <Card className="mb-8 border-red-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <CardTitle className="text-red-700">{c.warningSignsTitle}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              {c.warningSigns.map((sign, index) => (
                <div key={index} className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                  <span>{sign}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* When to See Doctor */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Calendar className="h-5 w-5 text-orange-600" />
              </div>
              <CardTitle>{c.whenToSeeTitle}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {c.whenToSeeItems.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Prevention */}
        <Card className="mb-8 border-green-200 bg-green-50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <CardTitle className="text-green-700">{c.preventionTitle}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              {c.preventionItems.map((item, index) => (
                <div key={index} className="flex items-start gap-2 text-green-700">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Screening */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{c.screeningTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {c.screeningItems.map((item, index) => (
                <li key={index} className="p-3 bg-muted rounded-lg">
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* General Health */}
        <Card className="mb-8 border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="text-purple-700">{c.generalHealthTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              {c.generalHealthItems.map((item, index) => (
                <div key={index} className="flex items-start gap-2 text-purple-700">
                  <Heart className="h-4 w-4 text-purple-500 mt-1 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact */}
      <Card className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
        <CardHeader className="text-center">
          <CardTitle>
            {locale === 'ar' ? 'هل لديك أسئلة صحية؟' : locale === 'fr' ? 'Vous avez des questions de santé ?' : 'Have Health Questions?'}
          </CardTitle>
          <CardDescription>
            {locale === 'ar' ? 'تحدثي مع مساعدنا الذكي أو اتصلي بنا' : locale === 'fr' ? 'Parlez à notre assistant IA ou contactez-nous' : 'Talk to our AI assistant or contact us'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <a href="tel:+96176348299">
              <Phone className="mr-2 h-4 w-4" />
              {locale === 'ar' ? 'اتصلي الآن' : locale === 'fr' ? 'Appeler maintenant' : 'Call Now'}
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
