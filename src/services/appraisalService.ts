import axios from "axios";
import { BACKEND_URL } from "../config";

export const updateAppraisalStatus = async (appraisalId: string, status: "approved" | "rejected") => {
  try {
    const response = await axios.put(
      `${BACKEND_URL}/admin/appraisal/${appraisalId}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.msg || "Failed to update appraisal status");
  }
};