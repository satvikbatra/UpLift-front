import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface UserDetails {
  _id: string;
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

export const useDetails = () => {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<UserDetails>({
    _id: "",
    profile_image: "",
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
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb25fZW1haWxfaWQiOiJlMjJjc2V1MTQ5MUBiZW5uZXR0LmVkdS5pbiIsImlhdCI6MTc0MjYwMTE1MH0.REP7xtfWb7xnDWXZOvl3Ts64VJ-Q3LaDTw1DBtG34y4",
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
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb25fZW1haWxfaWQiOiJlMjJjc2V1MTQ5MUBiZW5uZXR0LmVkdS5pbiIsImlhdCI6MTc0MjYwMTE1MH0.REP7xtfWb7xnDWXZOvl3Ts64VJ-Q3LaDTw1DBtG34y4",
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
