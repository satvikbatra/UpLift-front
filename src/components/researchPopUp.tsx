import React, { ChangeEvent, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { ResearchFormDataType, submitResearchPaper, updateResearchPaper } from "../hooks/postData";
import { PaperTypes } from "./researchDetailPopUp";

interface ResponsiveDialogProps {
  open: boolean;
  onClose: () => void;
  initialData?: PaperTypes;
  refreshData: () => void | undefined;
}

export default function ResponsiveDialog({
  open,
  onClose,
  initialData,
  refreshData
}: ResponsiveDialogProps) {
  const [formData, setFormData] = useState<ResearchFormDataType>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    certificate: null,
    verificationLink: initialData?.verification_link || "",
    conferenceName: initialData?.conference_name || "",
    publishedDate: initialData?.publish_date || "",
  });
  
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        certificate: null,
        verificationLink: initialData.verification_link || "",
        conferenceName: initialData.conference_name || "",
        publishedDate: initialData.publish_date?.split("T")[0] || "",
      });
    }
  }, [initialData]);

  const handleInputChange = <
    T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >(
    e: ChangeEvent<T>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, certificate: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await (initialData 
        ? updateResearchPaper(formData, initialData._id) 
        : submitResearchPaper(formData)
      );

      refreshData();
      onClose();
    } catch (error: any) {
      alert(
        `Error submitting research paper: ${error.message || "Unknown error"}`
      );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      className="rounded-2xl border-2"
    >
      <div className="p-6 bg-white w-full mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          {initialData ? "Update Research Paper" : "Add Research Paper"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md min-h-40"
              required
            />
          </div>

          <div>
            <label
              htmlFor="certificate"
              className="block text-sm font-medium text-gray-700"
            >
              Certificate
            </label>
            <input
              type="file"
              id="certificate"
              name="certificate"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label
              htmlFor="verificationLink"
              className="block text-sm font-medium text-gray-700"
            >
              Verification Link
            </label>
            <input
              type="url"
              id="verificationLink"
              name="verificationLink"
              value={formData.verificationLink}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label
              htmlFor="conferenceName"
              className="block text-sm font-medium text-gray-700"
            >
              Conference Name
            </label>
            <input
              type="text"
              id="conferenceName"
              name="conferenceName"
              value={formData.conferenceName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label
              htmlFor="publishedDate"
              className="block text-sm font-medium text-gray-700"
            >
              Published Date
            </label>
            <input
              type="date"
              id="publishedDate"
              name="publishedDate"
              value={formData.publishedDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="flex justify-center items-center">
            <button onClick={close} type="submit" className="button">
              {initialData ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}
