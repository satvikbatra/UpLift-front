import axios from "axios";
import { BACKEND_URL } from "../config";

export interface EntryFormDataType {
  _id?: string;
  title: string;
  description: string;
  certificate_of_publication?: File | null;
  verification_link?: string;
  conference_name?: string;
  publish_date?: string | "";
  github_link?: string;
  tech_stack?: string[];
  date?: string | "";
  rating?: number;
}

export const deleteEntry = async (prop: string, id: string) => {
  try {
    await axios.delete(`${BACKEND_URL}/${prop}/${id}`, {
      headers: {
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb25fZW1haWxfaWQiOiJyYWh1bC5uYWlyQGJlbm5ldHQuZWR1LmluIiwiaWF0IjoxNzQxNzIyMzU1fQ.UgZyiUhfAyb6fgWnzMZXj3V3ulq8t_PE52jJTSjosqQ",
      },
    });
  } catch (e) {
    alert("Not able to delete Research Paper. Try again later");
    console.log(e);
  }
};

export const submitResearchPaper = async (formData: EntryFormDataType) => {
  try {
    await axios.post(`${BACKEND_URL}/researchPapers/add`, formData, {
      headers: {
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb25fZW1haWxfaWQiOiJyYWh1bC5uYWlyQGJlbm5ldHQuZWR1LmluIiwiaWF0IjoxNzQxNzIyMzU1fQ.UgZyiUhfAyb6fgWnzMZXj3V3ulq8t_PE52jJTSjosqQ",
      },
    });
  } catch (e) {
    alert("Not able to add Research Paper. Try again later");
    console.log(e);
  }
};

export const updateResearchPaper = async (
  formData: EntryFormDataType,
  id: string
) => {
  formData.publish_date = formData.publish_date?.split("T")[0];
  delete formData._id;
  delete formData.date;
  console.log(formData);
  try {
    await axios.put(`${BACKEND_URL}/researchPapers/${id}`, formData, {
      headers: {
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb25fZW1haWxfaWQiOiJyYWh1bC5uYWlyQGJlbm5ldHQuZWR1LmluIiwiaWF0IjoxNzQxNzIyMzU1fQ.UgZyiUhfAyb6fgWnzMZXj3V3ulq8t_PE52jJTSjosqQ",
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    alert("Not able to update Research Paper. Try again later");
    console.log(e);
  }
};

export const submitEntry = async (
  entry: string,
  formData: EntryFormDataType
) => {
  try {
    await axios.post(`${BACKEND_URL}/${entry}/add`, formData, {
      headers: {
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb25fZW1haWxfaWQiOiJyYWh1bC5uYWlyQGJlbm5ldHQuZWR1LmluIiwiaWF0IjoxNzQxNzIyMzU1fQ.UgZyiUhfAyb6fgWnzMZXj3V3ulq8t_PE52jJTSjosqQ",
      },
    });
  } catch (e) {
    alert("Not able to add Project. Try again later");
    console.log(e);
  }
};

export const updateEntry = async (
  entry: string,
  formData: EntryFormDataType,
  id: string
) => {
  formData.date = formData.date?.split("T")[0];
  delete formData._id;
  try {
    await axios.put(`${BACKEND_URL}/${entry}/${id}`, formData, {
      headers: {
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb25fZW1haWxfaWQiOiJyYWh1bC5uYWlyQGJlbm5ldHQuZWR1LmluIiwiaWF0IjoxNzQxNzIyMzU1fQ.UgZyiUhfAyb6fgWnzMZXj3V3ulq8t_PE52jJTSjosqQ",
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    alert("Not able to update Project. Try again later");
    console.log(e);
  }
};
