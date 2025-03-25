import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

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

export const useDetails = () => {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<UserDetails>({
    _id: "",
    is_admin: false,
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
            localStorage.getItem("token"),
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
            localStorage.getItem("token"),
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

export const useAppraisals = (reload: boolean) => {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<AppraisalDetailsTypes>({});

  useEffect(() => {
    axios
     .get(`${BACKEND_URL}/admin/appraisals`, {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("token"),
        },
      })
     .then((response) => {
        setDetails(response.data || []);
        setLoading(false);
      })
     .catch((error) => {
        console.error(`Error fetching appraisals:`, error);
      })
  }, [reload]);

  return {
    loading,
    details,
  };
}

interface UserData {
  full_name?: string;
  organization_email_id: string;
  personal_email_id?: string;
  password: string;
}

export const signin = async (userData: UserData) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/user/signin`, userData);
    localStorage.setItem("token", response.data.token);
    return response.data.user;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

export const signup = async (userData: UserData) => {
  try {
    await axios.post(`${BACKEND_URL}/user/register`, userData);
    return true;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};