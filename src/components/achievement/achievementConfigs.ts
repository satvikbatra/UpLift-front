import { EntryFormDataType } from "../../types";

export interface FormField {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}

export interface AchievementConfig {
  title: string;
  endpoint: string;
  detailComponentName: string;
  fields: FormField[];
  prepareFormData?: (formData: EntryFormDataType) => EntryFormDataType;
}

export const researchConfig: AchievementConfig = {
  title: "Research Papers",
  endpoint: "researchPapers",
  detailComponentName: "ResearchDetailsDialog",
  fields: [
    { label: "Title", name: "title", type: "text", required: true },
    {
      label: "Description",
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      label: "Certificate",
      name: "certificate_of_publication",
      type: "file",
    },
    {
      label: "Verification Link",
      name: "verification_link",
      type: "url",
    },
    { label: "Conference Name", name: "conference_name", type: "text" },
    { label: "Published Date", name: "date", type: "date" },
  ],
  prepareFormData: (formData) => {
    if (!formData.certificate_of_publication) {
      delete formData.certificate_of_publication;
    }
    return formData;
  },
};

export const projectsConfig: AchievementConfig = {
  title: "Projects",
  endpoint: "projects",
  detailComponentName: "ProjectDetailsDialog",
  fields: [
    {
      label: "Project Name",
      name: "title",
      type: "text",
      required: true,
    },
    {
      label: "Description",
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      label: "GitHub Repository",
      name: "github_link",
      type: "url",
      required: true,
    },
    {
      label: "Tech Stack",
      name: "tech_stack",
      type: "array",
      required: true,
    },
    {
      label: "Completion Date",
      name: "date",
      type: "date",
      required: true,
    },
  ],
};

export const certificatesConfig: AchievementConfig = {
  title: "Certificates",
  endpoint: "certificates",
  detailComponentName: "CertificateDetailsDialog",
  fields: [
    {
      label: "Platform",
      name: "platform",
      type: "text",
      required: true,
    },
    { label: "Field", name: "field", type: "text", required: true },
    {
      label: "Certificate Title",
      name: "title",
      type: "text",
      required: true,
    },
    {
      label: "Description",
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      label: "Verification Link",
      name: "verification_link",
      type: "url",
      required: true,
    },
    { label: "Issue Date", name: "date", type: "date", required: true },
  ],
};

export const seminarsConfig: AchievementConfig = {
  title: "Seminars",
  endpoint: "seminars",
  detailComponentName: "SeminarDetailsDialog",
  fields: [
    {
      label: "Seminar Title",
      name: "title",
      type: "text",
      required: true,
    },
    {
      label: "Description",
      name: "description",
      type: "textarea",
      required: true,
    },
    { label: "Location", name: "location", type: "text", required: true },
    { label: "Role", name: "role", type: "text", required: true },
    { label: "Date", name: "date", type: "date", required: true },
  ],
};

export const otherAchievementsConfig: AchievementConfig = {
  title: "Other Achievements",
  endpoint: "otherAchievements",
  detailComponentName: "AchievementDetailsDialog",
  fields: [
    { label: "Title", name: "title", type: "text", required: true },
    {
      label: "Description",
      name: "description",
      type: "textarea",
      required: true,
    },
    { label: "Date", name: "date", type: "date", required: true },
    {
      label: "Category",
      name: "category",
      type: "text",
      required: false,
    },
  ],
};
