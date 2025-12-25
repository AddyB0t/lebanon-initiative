export interface FAQItem {
  id: string;
  question_en: string;
  question_ar: string;
  question_fr: string;
  answer_en: string;
  answer_ar: string;
  answer_fr: string;
  category: 'general' | 'grievance' | 'privacy' | 'support';
}

export const faqItems: FAQItem[] = [
  // General
  {
    id: '1',
    question_en: 'What is the Lebanon Gender Initiative?',
    question_ar: 'ما هي مبادرة لبنان للمساواة؟',
    question_fr: 'Qu\'est-ce que l\'Initiative Genre Liban ?',
    answer_en: 'The Lebanon Gender Initiative is a platform dedicated to supporting women and children in South Lebanon who are facing gender-based violence, harassment, or abuse. We provide resources, support services, and a safe space to submit grievances.',
    answer_ar: 'مبادرة لبنان للمساواة هي منصة مخصصة لدعم النساء والأطفال في جنوب لبنان الذين يواجهون العنف القائم على النوع الاجتماعي أو التحرش أو الإساءة. نحن نقدم الموارد وخدمات الدعم ومساحة آمنة لتقديم الشكاوى.',
    answer_fr: 'L\'Initiative Genre Liban est une plateforme dédiée au soutien des femmes et des enfants du Sud-Liban confrontés à la violence basée sur le genre, au harcèlement ou aux abus. Nous fournissons des ressources, des services de soutien et un espace sûr pour soumettre des plaintes.',
    category: 'general',
  },
  {
    id: '2',
    question_en: 'Who can use this platform?',
    question_ar: 'من يمكنه استخدام هذه المنصة؟',
    question_fr: 'Qui peut utiliser cette plateforme ?',
    answer_en: 'Anyone can use this platform - survivors of violence, witnesses, family members, or community members who want to report incidents or access support resources. Our services are free and confidential.',
    answer_ar: 'يمكن لأي شخص استخدام هذه المنصة - الناجيات من العنف، الشهود، أفراد الأسرة، أو أفراد المجتمع الذين يريدون الإبلاغ عن الحوادث أو الوصول إلى موارد الدعم. خدماتنا مجانية وسرية.',
    answer_fr: 'Tout le monde peut utiliser cette plateforme - survivantes de violence, témoins, membres de la famille ou membres de la communauté qui souhaitent signaler des incidents ou accéder aux ressources de soutien. Nos services sont gratuits et confidentiels.',
    category: 'general',
  },
  // Grievance
  {
    id: '3',
    question_en: 'How do I submit a grievance?',
    question_ar: 'كيف أقدم شكوى؟',
    question_fr: 'Comment soumettre une plainte ?',
    answer_en: 'Go to the "Submit Grievance" page, fill out the form with your village, type of grievance, and description. You can submit anonymously if you prefer. After submission, you will receive a tracking code to monitor the status.',
    answer_ar: 'اذهبي إلى صفحة "تقديم شكوى"، املئي النموذج بقريتك، نوع الشكوى، والوصف. يمكنك التقديم بشكل مجهول إذا كنت تفضلين ذلك. بعد التقديم، ستتلقين رمز تتبع لمراقبة الحالة.',
    answer_fr: 'Allez sur la page "Soumettre une plainte", remplissez le formulaire avec votre village, le type de plainte et la description. Vous pouvez soumettre de manière anonyme si vous préférez. Après soumission, vous recevrez un code de suivi pour surveiller l\'état.',
    category: 'grievance',
  },
  {
    id: '4',
    question_en: 'What happens after I submit a grievance?',
    question_ar: 'ماذا يحدث بعد تقديم الشكوى؟',
    question_fr: 'Que se passe-t-il après avoir soumis une plainte ?',
    answer_en: 'Your grievance will be reviewed by our team. We will assess the situation and, if needed, connect you with appropriate support services such as legal aid, counseling, or shelter. You can track the progress using your tracking code.',
    answer_ar: 'سيتم مراجعة شكواك من قبل فريقنا. سنقيم الوضع، وإذا لزم الأمر، سنربطك بخدمات الدعم المناسبة مثل المساعدة القانونية أو الاستشارة أو المأوى. يمكنك تتبع التقدم باستخدام رمز التتبع الخاص بك.',
    answer_fr: 'Votre plainte sera examinée par notre équipe. Nous évaluerons la situation et, si nécessaire, vous mettrons en contact avec les services de soutien appropriés tels que l\'aide juridique, le conseil ou l\'hébergement. Vous pouvez suivre les progrès avec votre code de suivi.',
    category: 'grievance',
  },
  {
    id: '5',
    question_en: 'Can I upload evidence with my grievance?',
    question_ar: 'هل يمكنني رفع أدلة مع شكواي؟',
    question_fr: 'Puis-je télécharger des preuves avec ma plainte ?',
    answer_en: 'Yes, you can upload supporting documents such as photos, audio recordings, videos, or documents. All uploaded files are stored securely and kept confidential.',
    answer_ar: 'نعم، يمكنك رفع مستندات داعمة مثل الصور، التسجيلات الصوتية، الفيديوهات، أو المستندات. جميع الملفات المرفوعة يتم تخزينها بشكل آمن والحفاظ على سريتها.',
    answer_fr: 'Oui, vous pouvez télécharger des documents justificatifs tels que photos, enregistrements audio, vidéos ou documents. Tous les fichiers téléchargés sont stockés en toute sécurité et restent confidentiels.',
    category: 'grievance',
  },
  // Privacy
  {
    id: '6',
    question_en: 'Is my information kept confidential?',
    question_ar: 'هل يتم الحفاظ على سرية معلوماتي؟',
    question_fr: 'Mes informations sont-elles confidentielles ?',
    answer_en: 'Yes, absolutely. We take privacy very seriously. All personal information and grievance details are kept strictly confidential. You can also choose to submit completely anonymously.',
    answer_ar: 'نعم، بالتأكيد. نحن نأخذ الخصوصية على محمل الجد. جميع المعلومات الشخصية وتفاصيل الشكاوى يتم الحفاظ على سريتها التامة. يمكنك أيضاً اختيار التقديم بشكل مجهول تماماً.',
    answer_fr: 'Oui, absolument. Nous prenons la confidentialité très au sérieux. Toutes les informations personnelles et les détails des plaintes sont gardés strictement confidentiels. Vous pouvez également choisir de soumettre de manière totalement anonyme.',
    category: 'privacy',
  },
  {
    id: '7',
    question_en: 'What is the "Quick Exit" button?',
    question_ar: 'ما هو زر "الخروج السريع"؟',
    question_fr: 'Qu\'est-ce que le bouton "Sortie rapide" ?',
    answer_en: 'The Quick Exit button allows you to instantly leave our website and redirect to a safe site (like Google) if someone approaches while you are using our platform. You can also press the ESC key for quick exit.',
    answer_ar: 'زر الخروج السريع يسمح لك بمغادرة موقعنا فوراً والانتقال إلى موقع آمن (مثل جوجل) إذا اقترب شخص ما أثناء استخدامك لمنصتنا. يمكنك أيضاً الضغط على مفتاح ESC للخروج السريع.',
    answer_fr: 'Le bouton Sortie rapide vous permet de quitter instantanément notre site et de rediriger vers un site sûr (comme Google) si quelqu\'un approche pendant que vous utilisez notre plateforme. Vous pouvez également appuyer sur la touche ESC pour une sortie rapide.',
    category: 'privacy',
  },
  // Support
  {
    id: '8',
    question_en: 'What support services are available?',
    question_ar: 'ما هي خدمات الدعم المتاحة؟',
    question_fr: 'Quels services de soutien sont disponibles ?',
    answer_en: 'We provide connections to emergency helplines, domestic violence hotlines, shelters, mental health services, and legal aid organizations. Our helplines page has one-tap calling and WhatsApp options.',
    answer_ar: 'نحن نوفر الاتصال بخطوط المساعدة الطارئة، خطوط العنف المنزلي، الملاجئ، خدمات الصحة النفسية، ومنظمات المساعدة القانونية. صفحة خطوط المساعدة لدينا تحتوي على خيارات الاتصال بلمسة واحدة والواتساب.',
    answer_fr: 'Nous fournissons des connexions aux lignes d\'urgence, aux lignes de violence domestique, aux refuges, aux services de santé mentale et aux organisations d\'aide juridique. Notre page de lignes d\'aide dispose d\'options d\'appel en un clic et WhatsApp.',
    category: 'support',
  },
  {
    id: '9',
    question_en: 'How can I contact you directly?',
    question_ar: 'كيف يمكنني التواصل معكم مباشرة؟',
    question_fr: 'Comment puis-je vous contacter directement ?',
    answer_en: 'You can call our helpline at +961 76 348 299 or reach us via WhatsApp at the same number. For emergencies, call 112.',
    answer_ar: 'يمكنك الاتصال بخط المساعدة على +961 76 348 299 أو التواصل معنا عبر الواتساب على نفس الرقم. لحالات الطوارئ، اتصلي بـ 112.',
    answer_fr: 'Vous pouvez appeler notre ligne d\'aide au +961 76 348 299 ou nous joindre via WhatsApp au même numéro. Pour les urgences, appelez le 112.',
    category: 'support',
  },
  {
    id: '10',
    question_en: 'Is the chatbot available 24/7?',
    question_ar: 'هل الروبوت الذكي متاح على مدار الساعة؟',
    question_fr: 'Le chatbot est-il disponible 24h/24 ?',
    answer_en: 'Yes, our AI chatbot is available 24/7 to provide information, answer questions, and guide you to appropriate resources. For urgent situations, please contact emergency services directly.',
    answer_ar: 'نعم، روبوتنا الذكي متاح على مدار الساعة لتقديم المعلومات، والإجابة على الأسئلة، وإرشادك إلى الموارد المناسبة. للحالات العاجلة، يرجى الاتصال بخدمات الطوارئ مباشرة.',
    answer_fr: 'Oui, notre chatbot IA est disponible 24h/24 pour fournir des informations, répondre aux questions et vous guider vers les ressources appropriées. Pour les situations urgentes, veuillez contacter les services d\'urgence directement.',
    category: 'support',
  },
];

export function getFAQQuestion(item: FAQItem, locale: string): string {
  switch (locale) {
    case 'ar':
      return item.question_ar;
    case 'fr':
      return item.question_fr;
    default:
      return item.question_en;
  }
}

export function getFAQAnswer(item: FAQItem, locale: string): string {
  switch (locale) {
    case 'ar':
      return item.answer_ar;
    case 'fr':
      return item.answer_fr;
    default:
      return item.answer_en;
  }
}

export function getFAQsByCategory(category: string): FAQItem[] {
  if (category === 'all') {
    return faqItems;
  }
  return faqItems.filter((item) => item.category === category);
}
