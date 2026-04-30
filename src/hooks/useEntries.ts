import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { EntryDetails } from "../types";

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
