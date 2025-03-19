import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface UserDetails {
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
}

export const useDetails = () => {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<UserDetails>({
    full_name: "",
    personal_email_id: "",
    organization_email_id: "",
    phone_number: 0,
    department_name: "",
    role: "",
    projects: {},
    seminars: {},
    certificates: {},
    researchPapers: {},
    otherAchievements: {},
    averageRating: 0.0,
  });

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/user/details`, {
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb25fZW1haWxfaWQiOiJyYWh1bC5uYWlyQGJlbm5ldHQuZWR1LmluIiwiaWF0IjoxNzQxNzIyMzU1fQ.UgZyiUhfAyb6fgWnzMZXj3V3ulq8t_PE52jJTSjosqQ",
        },
      })
      .then((response) => {
        setDetails(response.data.user);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    details,
  };
};

export const useDialog = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return { open, handleOpen, handleClose };
};

export interface ResearchPaperTypes {
  _id: string;
  user: string;
  title: string;
  description: string;
  certificate_of_publication: string;
  verification_link: string;
  conference_name: string;
  publish_date: string;
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

interface EntryDetails {
  researchPapers?: ResearchPaperTypes[];
  projects?: ProjectsTypes[];
  certificates?: CertificatesTypes[];
  seminars?: SeminarsTypes[];
  otherAchievements?: OtherAchievementsTypes[];
}

export const useEntries = (entry: string, reload: boolean) => {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<EntryDetails>({});

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/${entry}`, {
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb25fZW1haWxfaWQiOiJyYWh1bC5uYWlyQGJlbm5ldHQuZWR1LmluIiwiaWF0IjoxNzQxNzIyMzU1fQ.UgZyiUhfAyb6fgWnzMZXj3V3ulq8t_PE52jJTSjosqQ",
        },
      })
      .then((response) => {
        setDetails(response.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Error fetching ${entry}:`, error);
        setLoading(false);
      });
  }, [entry, reload]);

  return {
    loading,
    details,
  };
};
