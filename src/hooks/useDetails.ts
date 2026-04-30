import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { UserDetails } from "../types";

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
