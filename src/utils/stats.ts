import { UserDetails } from "../types";

export interface StatItem {
  id: string;
  value: number;
  label: string;
  color: string;
}

export const calculateStats = (details: UserDetails): StatItem[] => {
  const stats: StatItem[] = [
    {
      id: "Projects",
      value: Object.keys(details.projects).length,
      label: "Projects",
      color: "#ff00ff",
    },
    {
      id: "Certificates",
      value: Object.keys(details.certificates).length,
      label: "Certificates",
      color: "#00cccc",
    },
    {
      id: "Seminars",
      value: Object.keys(details.seminars).length,
      label: "Seminars",
      color: "#0000ff",
    },
    {
      id: "Research Papers",
      value: Object.keys(details.researchPapers).length,
      label: "Research Papers",
      color: "#33cc33",
    },
    {
      id: "Other",
      value: Object.keys(details.otherAchievements).length,
      label: "Other",
      color: "#ff3333",
    },
  ];

  return stats.filter((item) => item.value > 0);
};
