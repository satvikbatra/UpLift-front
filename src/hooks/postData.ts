import axios from "axios";
import { BACKEND_URL, USER_TOKEN } from "../config";

export interface EntryFormDataType {
  _id?: string;
  title: string;
  description: string;
  certificate_of_publication?: File | null;
  verification_link?: string;
  conference_name?: string;
  github_link?: string;
  tech_stack?: string[];
  date?: string | "";
  rating?: number;
}

export const deleteEntry = async (prop: string, id: string) => {
  try {
    const res = await axios.delete(`${BACKEND_URL}/${prop}/${id}`, {
      headers: {
        Authorization:
          "Bearer " +
          USER_TOKEN,
      },
    });
    alert(`${prop} deleted successfully`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    alert(`Not able to delete ${prop}. Try again later`);
  }
};

export const submitEntry = async (
  entry: string,
  formData: EntryFormDataType
) => {
  const form = new FormData();

  Object.entries(formData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (key === "certificate_of_publication" && value instanceof File) {
        form.append(key, value);
      } else if (key === "tech_stack" && Array.isArray(value)) {
        value.forEach((tech, index) => {
          form.append(`tech_stack[${index}]`, tech);
        });
      } else {
        form.append(key, String(value));
      }
    }
  });

  const res = await axios.post(`${BACKEND_URL}/${entry}/add`, form, {
    headers: {
      Authorization:
        "Bearer " +
        USER_TOKEN,
      "Content-Type": "application/json",
    },
  });

  alert(`${entry} added successfully`);
  if (res.status === 200) {
    return res.data;
  } else {
    alert(`Not able to add ${entry}. Try again later`);
  }
};

export const updateEntry = async (
  entry: string,
  formData: EntryFormDataType,
  id: string
) => {
  formData.date = formData.date?.split("T")[0];
  const form = new FormData();

  Object.entries(formData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (key === "certificate_of_publication" && value instanceof File) {
        form.append(key, value);
      } else if (key === "tech_stack" && Array.isArray(value)) {
        value.forEach((tech, index) => {
          form.append(`tech_stack[${index}]`, tech);
        });
      } else {
        form.append(key, String(value));
      }
    }
  });

  const res = await axios.put(`${BACKEND_URL}/${entry}/${id}`, form, {
    headers: {
      Authorization:
        "Bearer " +
        USER_TOKEN,
      "Content-Type": "application/json",
    },
  });

  alert(`${entry} updated successfully`);
  if (res.status === 200) {
    return res.data;
  } else {
    alert(`Not able to update ${entry}. Try again later`);
  }
};
