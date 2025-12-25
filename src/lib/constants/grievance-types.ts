export type GrievanceType =
  | 'harassment'
  | 'domestic_violence'
  | 'workplace_discrimination'
  | 'sexual_assault'
  | 'child_abuse'
  | 'economic_abuse'
  | 'stalking'
  | 'forced_marriage'
  | 'honor_violence'
  | 'other';

export interface GrievanceTypeInfo {
  id: GrievanceType;
  icon: string;
}

export const grievanceTypes: GrievanceTypeInfo[] = [
  { id: 'harassment', icon: '⚠️' },
  { id: 'domestic_violence', icon: '🏠' },
  { id: 'workplace_discrimination', icon: '💼' },
  { id: 'sexual_assault', icon: '🚨' },
  { id: 'child_abuse', icon: '👶' },
  { id: 'economic_abuse', icon: '💰' },
  { id: 'stalking', icon: '👁️' },
  { id: 'forced_marriage', icon: '💍' },
  { id: 'honor_violence', icon: '⚔️' },
  { id: 'other', icon: '📝' },
];

export type GrievanceStatus =
  | 'submitted'
  | 'under_review'
  | 'in_progress'
  | 'resolved'
  | 'closed';

export const grievanceStatuses: GrievanceStatus[] = [
  'submitted',
  'under_review',
  'in_progress',
  'resolved',
  'closed',
];

export function getStatusColor(status: GrievanceStatus): string {
  switch (status) {
    case 'submitted':
      return 'bg-blue-500';
    case 'under_review':
      return 'bg-yellow-500';
    case 'in_progress':
      return 'bg-orange-500';
    case 'resolved':
      return 'bg-green-500';
    case 'closed':
      return 'bg-gray-500';
    default:
      return 'bg-gray-500';
  }
}
