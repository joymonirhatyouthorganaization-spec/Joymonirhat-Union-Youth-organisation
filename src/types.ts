export type Language = 'bn' | 'en';

export interface ActivityPostLink {
  url: string;
  titleBn: string;
  titleEn: string;
  dateBn?: string;
  dateEn?: string;
  summaryBn: string;
  summaryEn: string;
  highlight?: string;
}

export interface ActivityItem {
  id: string;
  titleBn: string;
  titleEn: string;
  category: 'social' | 'welfare' | 'environment' | 'rights' | 'youth';
  categoryLabelBn: string;
  categoryLabelEn: string;
  shortDescBn: string;
  shortDescEn: string;
  fullDescBn: string;
  fullDescEn: string;
  iconName: string;
  impactMetricBn: string;
  impactMetricEn: string;
  actionPointsBn: string[];
  actionPointsEn: string[];
  imageSrc?: string;
  facebookPosts?: ActivityPostLink[];
}

export interface NoticeItem {
  id: string;
  titleBn: string;
  titleEn: string;
  dateBn: string;
  dateEn: string;
  categoryBn: string;
  categoryEn: string;
  categoryType: 'emergency' | 'general' | 'event' | 'recruitment';
  isImportant?: boolean;
  contentBn: string;
  contentEn: string;
  referenceNo?: string;
}

export interface CommitteeMember {
  id: string;
  serialNo: number;
  serialBn: string;
  serialEn: string;
  nameBn: string;
  nameEn: string;
  designationBn: string;
  designationEn: string;
  age: number;
  ageBn: string;
  phone: string;
  villageBn?: string;
  villageEn?: string;
  avatarSeed?: string;
  photo?: string;
  messageBn?: string;
  messageEn?: string;
}

export interface GalleryItem {
  id: string;
  titleBn: string;
  titleEn: string;
  categoryBn: string;
  categoryEn: string;
  dateBn: string;
  dateEn: string;
  imageSrc: string;
  descriptionBn: string;
  descriptionEn: string;
}

export interface VolunteerFormData {
  fullName: string;
  mobile: string;
  email: string;
  bloodGroup: string;
  village: string;
  occupation: string;
  interests: string[];
  message: string;
}

export interface FacebookPostItem {
  id: string;
  url: string;
  titleBn: string;
  titleEn: string;
  dateBn: string;
  dateEn: string;
  categoryBn: string;
  categoryEn: string;
  excerptBn: string;
  excerptEn: string;
  highlightsBn: string[];
  highlightsEn: string[];
  imageSrc?: string;
}

export interface FlagshipProject {
  titleBn: string;
  titleEn: string;
  subtitleBn: string;
  subtitleEn: string;
  necessityBn: string;
  necessityEn: string;
  targetInstitutionsBn: string[];
  targetInstitutionsEn: string[];
  locations: { nameBn: string; nameEn: string; detailsBn: string; detailsEn: string }[];
  activities: { id: number; titleBn: string; titleEn: string; descBn: string; descEn: string; icon: string }[];
  expectedOutcomesBn: string[];
  expectedOutcomesEn: string[];
}

export interface PartnerItem {
  nameBn: string;
  nameEn: string;
  category: 'gov' | 'ngo' | 'foundation';
  categoryLabelBn: string;
  categoryLabelEn: string;
  roleBn: string;
  roleEn: string;
}

export interface AchievementItem {
  id: string;
  categoryBn: string;
  categoryEn: string;
  metricBn: string;
  metricEn: string;
  titleBn: string;
  titleEn: string;
  pointsBn: string[];
  pointsEn: string[];
}

export interface UnionWardItem {
  id: string;
  wardNo: number;
  wardNoBn: string;
  wardNoEn: string;
  titleBn: string;
  titleEn: string;
  areasBn: string[];
  areasEn: string[];
  summaryBn: string;
  summaryEn: string;
  keyLandmarksBn: string;
  keyLandmarksEn: string;
  volunteerCountEstimate?: string;
  coverageBadgeBn?: string;
  coverageBadgeEn?: string;
}



