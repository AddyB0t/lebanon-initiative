export interface SelfDefenseVideo {
  id: string;
  youtube_id: string;
  title_en: string;
  title_ar: string;
  title_fr: string;
  description_en: string;
  description_ar: string;
  description_fr: string;
  category: 'basic' | 'escape' | 'awareness' | 'prevention';
  duration: string;
}

export const selfDefenseVideos: SelfDefenseVideo[] = [
  // Escape Techniques - Wrist Grabs
  {
    id: '1',
    youtube_id: 'm5dWBTRVNvk',
    title_en: 'Escaping a Wrist Grab in Self-Defense',
    title_ar: 'الإفلات من قبضة المعصم في الدفاع عن النفس',
    title_fr: 'Échapper à une prise de poignet en autodéfense',
    description_en: 'Learn effective techniques to escape when someone grabs your wrist.',
    description_ar: 'تعلمي تقنيات فعالة للإفلات عندما يمسك شخص ما معصمك.',
    description_fr: 'Apprenez des techniques efficaces pour vous échapper lorsque quelqu\'un saisit votre poignet.',
    category: 'escape',
    duration: '5:30',
  },
  {
    id: '2',
    youtube_id: 'c-2hbTSU1RY',
    title_en: 'Quick Self Defense – Wrist Grab Escapes',
    title_ar: 'دفاع سريع عن النفس – الإفلات من قبضة المعصم',
    title_fr: 'Autodéfense rapide – Échapper aux prises de poignet',
    description_en: 'Quick and easy wrist grab escape techniques for everyday situations.',
    description_ar: 'تقنيات سريعة وسهلة للإفلات من قبضة المعصم في المواقف اليومية.',
    description_fr: 'Techniques rapides et faciles pour échapper aux prises de poignet au quotidien.',
    category: 'escape',
    duration: '4:45',
  },
  // Escape Techniques - Hair Grabs
  {
    id: '3',
    youtube_id: 'IxKvvFef1uA',
    title_en: 'Escape Hair Grabs Quickly – Self-Defense Tips',
    title_ar: 'الإفلات من قبضة الشعر بسرعة – نصائح الدفاع عن النفس',
    title_fr: 'Échapper rapidement aux saisies de cheveux – Conseils d\'autodéfense',
    description_en: 'Learn how to quickly escape when someone grabs your hair.',
    description_ar: 'تعلمي كيفية الإفلات بسرعة عندما يمسك شخص ما شعرك.',
    description_fr: 'Apprenez à vous échapper rapidement lorsque quelqu\'un saisit vos cheveux.',
    category: 'escape',
    duration: '6:15',
  },
  {
    id: '4',
    youtube_id: 'CLcN_esKh20',
    title_en: '5 Hair Grab Defenses (Women\'s Self-Defense)',
    title_ar: '5 دفاعات ضد قبضة الشعر (دفاع عن النفس للنساء)',
    title_fr: '5 défenses contre les saisies de cheveux (Autodéfense pour femmes)',
    description_en: 'Five effective techniques to defend against hair grab attacks.',
    description_ar: 'خمس تقنيات فعالة للدفاع ضد هجمات قبضة الشعر.',
    description_fr: 'Cinq techniques efficaces pour se défendre contre les saisies de cheveux.',
    category: 'escape',
    duration: '8:20',
  },
  // Basic Techniques - Street Defense (Arabic)
  {
    id: '5',
    youtube_id: 'yW0NnF6JOAU',
    title_en: 'Street Self-Defense – Escape Grip Technique (Arabic)',
    title_ar: 'دفاع عن النفس في الشارع – تقنية التخلص من القبضة',
    title_fr: 'Autodéfense de rue – Technique d\'échappement (Arabe)',
    description_en: 'Street-focused self-defense techniques in Arabic for escaping grips.',
    description_ar: 'تقنيات الدفاع عن النفس في الشارع باللغة العربية للتخلص من القبضات.',
    description_fr: 'Techniques d\'autodéfense de rue en arabe pour échapper aux prises.',
    category: 'basic',
    duration: '7:10',
  },
  // Emergency Fast Escapes
  {
    id: '6',
    youtube_id: 'plYqW5zDfrc',
    title_en: 'Escape Being Grabbed – FAST and EASY Techniques',
    title_ar: 'الإفلات من القبض عليك – تقنيات سريعة وسهلة',
    title_fr: 'Échapper à une saisie – Techniques RAPIDES et FACILES',
    description_en: 'Fast and easy techniques to free yourself and create distance from an attacker.',
    description_ar: 'تقنيات سريعة وسهلة لتحرير نفسك وخلق مسافة بينك وبين المهاجم.',
    description_fr: 'Techniques rapides et faciles pour vous libérer et créer de la distance avec un agresseur.',
    category: 'basic',
    duration: '9:45',
  },
  // Awareness & Prevention
  {
    id: '7',
    youtube_id: 'T7aNSRoDCmg',
    title_en: 'Self Defense Techniques for Beginners',
    title_ar: 'تقنيات الدفاع عن النفس للمبتدئين',
    title_fr: 'Techniques d\'autodéfense pour débutants',
    description_en: 'Simple yet effective self-defense moves for beginners to stay safe.',
    description_ar: 'حركات دفاع عن النفس بسيطة وفعالة للمبتدئين للبقاء في أمان.',
    description_fr: 'Mouvements d\'autodéfense simples mais efficaces pour les débutants.',
    category: 'awareness',
    duration: '8:45',
  },
  {
    id: '8',
    youtube_id: 'KVpxP3ZZtAc',
    title_en: 'Basic Self-Defense Moves Every Woman Should Know',
    title_ar: 'حركات الدفاع عن النفس الأساسية التي يجب أن تعرفها كل امرأة',
    title_fr: 'Mouvements d\'autodéfense de base que toute femme devrait connaître',
    description_en: 'Essential self-defense techniques for women\'s personal safety.',
    description_ar: 'تقنيات الدفاع عن النفس الأساسية للسلامة الشخصية للمرأة.',
    description_fr: 'Techniques essentielles d\'autodéfense pour la sécurité personnelle des femmes.',
    category: 'prevention',
    duration: '10:30',
  },
];

export function getVideoTitle(video: SelfDefenseVideo, locale: string): string {
  switch (locale) {
    case 'ar':
      return video.title_ar;
    case 'fr':
      return video.title_fr;
    default:
      return video.title_en;
  }
}

export function getVideoDescription(video: SelfDefenseVideo, locale: string): string {
  switch (locale) {
    case 'ar':
      return video.description_ar;
    case 'fr':
      return video.description_fr;
    default:
      return video.description_en;
  }
}

export function getVideosByCategory(category: string): SelfDefenseVideo[] {
  if (category === 'all') {
    return selfDefenseVideos;
  }
  return selfDefenseVideos.filter((video) => video.category === category);
}
