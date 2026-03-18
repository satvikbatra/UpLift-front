export interface UserDetails {
  _id: string;
  is_admin: boolean;
  full_name: string;
  personal_email_id: string;
  organization_email_id: string;
  phone_number: number;
  department_name: string;
  role: string;
  projects: object;
  seminars: object;
  certificates: object;
  researchPapers: object;
  otherAchievements: object;
  averageRating: number;
  profile_image?: string | File;
}

export interface ResearchPaperTypes {
  _id: string;
  user: string;
  title: string;
  description: string;
  certificate_of_publication: string;
  verification_link: string;
  conference_name: string;
  date: string;
  rating: number;
}

export interface ProjectsTypes {
  _id: string;
  user: string;
  title: string;
  description: string;
  github_link: string;
  tech_stack: Array<string>;
  date: string;
  rating: number;
}

export interface CertificatesTypes {
  _id: string;
  title: string;
  description: string;
  field: string;
  platform: string;
  verification_link: string;
  date: string;
}

export interface SeminarsTypes {
  _id: string;
  title: string;
  description: string;
  location: string;
  role: string;
  date: string;
}

export interface OtherAchievementsTypes {
  _id: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

export interface EntryDetails {
  researchPapers?: ResearchPaperTypes[];
  projects?: ProjectsTypes[];
  certificates?: CertificatesTypes[];
  seminars?: SeminarsTypes[];
  otherAchievements?: OtherAchievementsTypes[];
}

export interface AppraisalTypes {
  _id: string;
  user: {
    _id: string;
    full_name?: string;
    department_name?: string;
    role?: string;
    organization_email_id?: string;
    personal_email_id?: string;
    phone_number?: string;
    profile_image?: string;
  };
  status: string;
}

export interface AppraisalDetailsTypes {
  appraisals?: AppraisalTypes[];
}

export interface EntryFormDataType {
  _id?: string;
  title: string;
  description: string;
  certificate_of_publication?: File | null;
  verification_link?: string;
  conference_name?: string;
  github_link?: string;
  tech_stack?: string[];
  date?: string | "";
  rating?: number;
}

export interface UserData {
  full_name?: string;
  organization_email_id: string;
  personal_email_id?: string;
  password: string;
}
