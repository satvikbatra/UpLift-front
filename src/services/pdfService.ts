import { UserDetails } from "../hooks";
import axios from "axios";
import { ADMIN_TOKEN, BACKEND_URL, USER_TOKEN } from "../config";
import { createPDF } from "../components/appraisalPDF";

// Helper function to fetch all entries of a specific type
const fetchEntries = async (entryType: string): Promise<any[]> => {
  try {
    const response = await axios.get(`${BACKEND_URL}/${entryType}`, {
      headers: {
        Authorization:
          "Bearer " +
          USER_TOKEN,
      },
    });

    if (entryType === "researchPapers") {
      return response.data.researchPapers || [];
    } else if (entryType === "projects") {
      return response.data.projects || [];
    } else if (entryType === "certificates") {
      return response.data.certificates || [];
    } else if (entryType === "seminars") {
      return response.data.seminars || [];
    } else if (entryType === "otherAchievements") {
      return response.data.otherAchievements || [];
    }

    return response.data || [];
  } catch (error) {
    console.error(`Error fetching ${entryType}:`, error);
    return [];
  }
};

export const generateAppraisalPDF = async (
  userData: UserDetails
): Promise<string> => {
  // Fetch all the detailed data for each achievement type
  const researchPapers = await fetchEntries("researchPapers");
  const projects = await fetchEntries("projects");
  const certificates = await fetchEntries("certificates");
  const seminars = await fetchEntries("seminars");
  const otherAchievements = await fetchEntries("otherAchievements");

  console.log("researchPapers", researchPapers);
  console.log("projects", projects);
  console.log("certificates", certificates);
  console.log("seminars", seminars);
  console.log("otherAchievements", otherAchievements)

  // Use the react-pdf component to generate the PDF
  return createPDF(
    userData,
    researchPapers,
    projects,
    certificates,
    seminars,
    otherAchievements
  );
};

export const generateAdminAppraisalPDF = async (
  userID: string
): Promise<string> => {

  const response = await axios.get(`${BACKEND_URL}/admin/user/${userID}`, {
    headers: {
      Authorization:
        "Bearer " +
        ADMIN_TOKEN,
    },
  })

  const researchPapers = response.data.user.researchPapers || [];
  const projects = response.data.user.projects || [];
  const certificates = response.data.user.certificates || [];
  const seminars = response.data.user.seminars || [];
  const otherAchievements = response.data.user.otherAchievements || [];

  // Use the react-pdf component to generate the PDF
  return createPDF(
    response.data.user,
    researchPapers,
    projects,
    certificates,
    seminars,
    otherAchievements
  );
};

// Function to submit the generated appraisal PDF to the backend
export const submitAppraisal = async (
  userId: string
): Promise<{ success: boolean; errorMessage?: string }> => {
  try {
    // Send the appraisal request to the backend
    const submitResponse = await axios.post(
      `${BACKEND_URL}/user/applyAppraisal`,
      { userId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            USER_TOKEN,
        },
      }
    );

    // Check if the submission was successful
    if (submitResponse.data && submitResponse.status === 200) {
      return { success: true };
    } else {
      console.warn(
        "Appraisal submission returned unexpected response:",
        submitResponse
      );
      return {
        success: false,
        errorMessage: "Failed to submit appraisal. Please try again.",
      };
    }
  } catch (error: any) {
    // Handle specific error cases
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(
        "Error submitting appraisal - server response:",
        error.response.data
      );

      // Check for specific error conditions
      if (error.response.status === 400) {
        console.warn("User already has a pending appraisal");
        return {
          success: false,
          errorMessage:
            "You already have a pending appraisal request. Please wait for it to be processed.",
        };
      }

      return {
        success: false,
        errorMessage:
          error.response.data.message ||
          "Failed to submit appraisal. Please try again.",
      };
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Error submitting appraisal - no response:", error.request);
      return {
        success: false,
        errorMessage:
          "Network error. Please check your connection and try again.",
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error submitting appraisal:", error.message);
      return {
        success: false,
        errorMessage: "An unexpected error occurred. Please try again.",
      };
    }
  }
};
