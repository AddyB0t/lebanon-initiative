export interface Helpline {
  id: string;
  name_en: string;
  name_ar: string;
  name_fr: string;
  description_en: string;
  description_ar: string;
  description_fr: string;
  phone_number: string;
  phone_display: string;
  whatsapp_number?: string;
  has_sms: boolean;
  hours_en: string;
  hours_ar: string;
  hours_fr: string;
  category: 'emergency' | 'domestic_violence' | 'shelter' | 'mental_health' | 'legal';
}

export const helplines: Helpline[] = [
  {
    id: '1',
    name_en: 'Portal Helpline',
    name_ar: 'خط مساعدة البوابة',
    name_fr: 'Ligne d\'aide du portail',
    description_en: 'Direct Support from Gender Focal Point, INDBATT',
    description_ar: 'دعم مباشر من نقطة التركيز الجندرية، INDBATT',
    description_fr: 'Soutien direct du Point focal genre, INDBATT',
    phone_number: '+96176348299',
    phone_display: '+961 76 348 299',
    whatsapp_number: '+96176348299',
    has_sms: true,
    hours_en: '24/7',
    hours_ar: '24/7',
    hours_fr: '24/7',
    category: 'domestic_violence',
  },
  {
    id: '2',
    name_en: 'KAFA Violence & Exploitation',
    name_ar: 'كفى عنف واستغلال',
    name_fr: 'KAFA Violence et Exploitation',
    description_en: 'Support for women survivors of violence and exploitation',
    description_ar: 'دعم للنساء الناجيات من العنف والاستغلال',
    description_fr: 'Soutien aux femmes survivantes de violence et d\'exploitation',
    phone_number: '+9613018019',
    phone_display: '03 018 019',
    whatsapp_number: undefined,
    has_sms: false,
    hours_en: '24/7',
    hours_ar: '24/7',
    hours_fr: '24/7',
    category: 'domestic_violence',
  },
  {
    id: '3',
    name_en: 'ABAAD Safe Line',
    name_ar: 'خط آباد الآمن',
    name_fr: 'Ligne sécurisée ABAAD',
    description_en: 'Emergency safe sheltering and crisis support',
    description_ar: 'إيواء آمن طارئ ودعم الأزمات',
    description_fr: 'Hébergement d\'urgence sécurisé et soutien en cas de crise',
    phone_number: '+9618178178',
    phone_display: '+961 81 78 81 78',
    whatsapp_number: '+9618178178',
    has_sms: false,
    hours_en: '24/7',
    hours_ar: '24/7',
    hours_fr: '24/7',
    category: 'shelter',
  },
  {
    id: '4',
    name_en: 'ABAAD Women Safe Shelter',
    name_ar: 'ملجأ آباد الآمن للنساء',
    name_fr: 'Abri sécurisé ABAAD pour femmes',
    description_en: 'Safe shelter for women and girls escaping violence',
    description_ar: 'ملجأ آمن للنساء والفتيات الهاربات من العنف',
    description_fr: 'Abri sécurisé pour les femmes et filles fuyant la violence',
    phone_number: '+96176060602',
    phone_display: '+961 76 06 06 02',
    whatsapp_number: '+96176060602',
    has_sms: false,
    hours_en: '24/7',
    hours_ar: '24/7',
    hours_fr: '24/7',
    category: 'shelter',
  },
  {
    id: '5',
    name_en: 'Lebanese Police Emergency',
    name_ar: 'الشرطة اللبنانية - طوارئ',
    name_fr: 'Police libanaise - Urgences',
    description_en: 'National police emergency line',
    description_ar: 'خط طوارئ الشرطة الوطنية',
    description_fr: 'Ligne d\'urgence de la police nationale',
    phone_number: '112',
    phone_display: '112',
    whatsapp_number: undefined,
    has_sms: false,
    hours_en: '24/7',
    hours_ar: '24/7',
    hours_fr: '24/7',
    category: 'emergency',
  },
  {
    id: '6',
    name_en: 'Embrace Lifeline',
    name_ar: 'خط إمبريس للحياة',
    name_fr: 'Ligne de vie Embrace',
    description_en: 'Emotional support and suicide prevention hotline',
    description_ar: 'خط ساخن للدعم العاطفي والوقاية من الانتحار',
    description_fr: 'Ligne d\'assistance émotionnelle et prévention du suicide',
    phone_number: '1564',
    phone_display: '1564',
    whatsapp_number: undefined,
    has_sms: false,
    hours_en: '24/7',
    hours_ar: '24/7',
    hours_fr: '24/7',
    category: 'mental_health',
  },
  {
    id: '7',
    name_en: 'Lebanese Red Cross',
    name_ar: 'الصليب الأحمر اللبناني',
    name_fr: 'Croix-Rouge libanaise',
    description_en: 'Emergency medical services',
    description_ar: 'خدمات الطوارئ الطبية',
    description_fr: 'Services médicaux d\'urgence',
    phone_number: '140',
    phone_display: '140',
    whatsapp_number: undefined,
    has_sms: false,
    hours_en: '24/7',
    hours_ar: '24/7',
    hours_fr: '24/7',
    category: 'emergency',
  },
  {
    id: '8',
    name_en: 'Civil Defense',
    name_ar: 'الدفاع المدني',
    name_fr: 'Défense civile',
    description_en: 'Civil defense emergency services',
    description_ar: 'خدمات طوارئ الدفاع المدني',
    description_fr: 'Services d\'urgence de la défense civile',
    phone_number: '125',
    phone_display: '125',
    whatsapp_number: undefined,
    has_sms: false,
    hours_en: '24/7',
    hours_ar: '24/7',
    hours_fr: '24/7',
    category: 'emergency',
  },
];

export function getHelplineName(helpline: Helpline, locale: string = 'en') {
  return locale === 'ar' ? helpline.name_ar :
         locale === 'fr' ? helpline.name_fr : helpline.name_en;
}

export function getHelplineDescription(helpline: Helpline, locale: string = 'en') {
  return locale === 'ar' ? helpline.description_ar :
         locale === 'fr' ? helpline.description_fr : helpline.description_en;
}

export function getHelplinesByCategory(category?: string) {
  if (!category || category === 'all') return helplines;
  return helplines.filter((h) => h.category === category);
}
