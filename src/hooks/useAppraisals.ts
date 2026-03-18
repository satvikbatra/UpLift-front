import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { AppraisalDetailsTypes } from "../types";

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
};
