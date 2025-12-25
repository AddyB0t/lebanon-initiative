export interface Village {
  id: string;
  name_en: string;
  name_ar: string;
  name_fr: string;
  district_en: string;
  district_ar: string;
  district_fr: string;
}

export const villages: Village[] = [
  // Tyre District
  { id: '1', name_en: 'Tyre', name_ar: 'صور', name_fr: 'Tyr', district_en: 'Tyre', district_ar: 'صور', district_fr: 'Tyr' },
  { id: '2', name_en: 'Qana', name_ar: 'قانا', name_fr: 'Cana', district_en: 'Tyre', district_ar: 'صور', district_fr: 'Tyr' },

  // Bint Jbeil District
  { id: '3', name_en: 'Bint Jbeil', name_ar: 'بنت جبيل', name_fr: 'Bint Jbeil', district_en: 'Bint Jbeil', district_ar: 'بنت جبيل', district_fr: 'Bint Jbeil' },
  { id: '4', name_en: 'Aitaroun', name_ar: 'عيترون', name_fr: 'Aitaroun', district_en: 'Bint Jbeil', district_ar: 'بنت جبيل', district_fr: 'Bint Jbeil' },
  { id: '5', name_en: 'Maroun al-Ras', name_ar: 'مارون الراس', name_fr: 'Maroun al-Ras', district_en: 'Bint Jbeil', district_ar: 'بنت جبيل', district_fr: 'Bint Jbeil' },
  { id: '6', name_en: 'Rmeish', name_ar: 'رميش', name_fr: 'Rmeish', district_en: 'Bint Jbeil', district_ar: 'بنت جبيل', district_fr: 'Bint Jbeil' },
  { id: '7', name_en: 'Aita al-Shaab', name_ar: 'عيتا الشعب', name_fr: 'Aita al-Shaab', district_en: 'Bint Jbeil', district_ar: 'بنت جبيل', district_fr: 'Bint Jbeil' },

  // Sidon District
  { id: '8', name_en: 'Sidon', name_ar: 'صيدا', name_fr: 'Saida', district_en: 'Sidon', district_ar: 'صيدا', district_fr: 'Saida' },
  { id: '9', name_en: 'Jezzine', name_ar: 'جزين', name_fr: 'Jezzine', district_en: 'Jezzine', district_ar: 'جزين', district_fr: 'Jezzine' },
  { id: '10', name_en: 'Roum', name_ar: 'روم', name_fr: 'Roum', district_en: 'Jezzine', district_ar: 'جزين', district_fr: 'Jezzine' },

  // Nabatieh District
  { id: '11', name_en: 'Nabatieh', name_ar: 'النبطية', name_fr: 'Nabatieh', district_en: 'Nabatieh', district_ar: 'النبطية', district_fr: 'Nabatieh' },
  { id: '12', name_en: 'Arnoun', name_ar: 'أرنون', name_fr: 'Arnoun', district_en: 'Nabatieh', district_ar: 'النبطية', district_fr: 'Nabatieh' },
  { id: '13', name_en: 'Kfar Tebnit', name_ar: 'كفرتبنيت', name_fr: 'Kfar Tebnit', district_en: 'Nabatieh', district_ar: 'النبطية', district_fr: 'Nabatieh' },

  // Marjayoun District
  { id: '14', name_en: 'Marjayoun', name_ar: 'مرجعيون', name_fr: 'Marjayoun', district_en: 'Marjayoun', district_ar: 'مرجعيون', district_fr: 'Marjayoun' },
  { id: '15', name_en: 'Khiam', name_ar: 'الخيام', name_fr: 'Khiam', district_en: 'Marjayoun', district_ar: 'مرجعيون', district_fr: 'Marjayoun' },
  { id: '16', name_en: 'Hasbaya', name_ar: 'حاصبيا', name_fr: 'Hasbaya', district_en: 'Hasbani', district_ar: 'حاصبيا', district_fr: 'Hasbaya' },
  { id: '17', name_en: 'Kfar Kila', name_ar: 'كفركلا', name_fr: 'Kfar Kila', district_en: 'Marjayoun', district_ar: 'مرجعيون', district_fr: 'Marjayoun' },
  { id: '18', name_en: 'Blida', name_ar: 'بليدا', name_fr: 'Blida', district_en: 'Marjayoun', district_ar: 'مرجعيون', district_fr: 'Marjayoun' },
  { id: '19', name_en: 'Adeisseh', name_ar: 'العديسة', name_fr: 'Adeisseh', district_en: 'Marjayoun', district_ar: 'مرجعيون', district_fr: 'Marjayoun' },
  { id: '20', name_en: 'Deir Mimas', name_ar: 'دير ميماس', name_fr: 'Deir Mimas', district_en: 'Marjayoun', district_ar: 'مرجعيون', district_fr: 'Marjayoun' },
];

export function getVillagesByDistrict(locale: string = 'en') {
  const grouped: Record<string, Village[]> = {};

  villages.forEach((village) => {
    const districtKey = locale === 'ar' ? village.district_ar :
                        locale === 'fr' ? village.district_fr : village.district_en;
    if (!grouped[districtKey]) {
      grouped[districtKey] = [];
    }
    grouped[districtKey].push(village);
  });

  return grouped;
}

export function getVillageName(village: Village, locale: string = 'en') {
  return locale === 'ar' ? village.name_ar :
         locale === 'fr' ? village.name_fr : village.name_en;
}
