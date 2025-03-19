import Dialog from "@mui/material/Dialog";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";
import { deleteEntry, EntryFormDataType, updateEntry } from "../hooks/postData";
import { FormPopUp } from "./formPopUp";
import { CertificatesTypes } from "../hooks";

interface CertificateDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  id: string;
  refreshData: () => void;
}

export const CertificateDetailsDialog = ({
  open,
  onClose,
  id,
  refreshData,
}: CertificateDetailsDialogProps) => {
  const [certificate, setCertificate] = useState<CertificatesTypes | null>(null);
  const [loading, setLoading] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id || !open) return;

    setCertificate(null);
    setLoading(true);

    const fetchCertificate = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/certificates/${id}`, {
          headers: {
            Authorization:
              "Bearer " +
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb25fZW1haWxfaWQiOiJyYWh1bC5uYWlyQGJlbm5ldHQuZWR1LmluIiwiaWF0IjoxNzQxNzIyMzU1fQ.UgZyiUhfAyb6fgWnzMZXj3V3ulq8t_PE52jJTSjosqQ",
          },
        });
        setCertificate(response.data.certificate);
      } catch (error) {
        console.error("Error fetching certificate:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [id, open, refreshData]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <div className="p-6 bg-white w-full mx-auto rounded-lg shadow-lg">
        {loading || !certificate ? (
          <div className="flex justify-center items-center h-40 text-lg font-medium text-gray-600">
            Loading...
          </div>
        ) : (
          <div className="px-4 pt-2 space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">
              {certificate.title}
            </h2>

            <p className="text-gray-700 leading-relaxed">
              {certificate.description}
            </p>

            <p className="text-gray-600">
              <span className="font-semibold text-gray-700">Field:</span>{" "}
              {certificate.field}
            </p>

            <p className="text-gray-600">
              <span className="font-semibold text-gray-700">Platform:</span>{" "}
              {certificate.platform}
            </p>

            {certificate.verification_link && (
              <p className="text-gray-600 font-medium">
                Verification:{" "}
                <a
                  href={certificate.verification_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  {certificate.verification_link}
                </a>
              </p>
            )}

            <p className="text-gray-600">
              <span className="font-semibold text-gray-700">
                Completion Date:
              </span>{" "}
              {certificate.date.split("T")[0]}
            </p>

            <div className="flex justify-end cursor-pointer gap-2">
              <button
                onClick={async () => {
                  setDeleting(true);
                  try {
                    await deleteEntry("certificates", id);
                    refreshData();
                    onClose();
                  } catch (error) {
                    console.error("Error deleting achievement:", error);
                    alert("Failed to delete. Please try again.");
                  } finally {
                    setDeleting(false);
                  }
                }}
                className="button"
                disabled={deleting} 
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
              <button onClick={() => setIsUpdateOpen(true)} className="button">
                Update Details
              </button>
              <button onClick={onClose} className="button">
                Close
              </button>
            </div>
          </div>
        )}

        <FormPopUp
          open={isUpdateOpen}
          onClose={() => setIsUpdateOpen(false)}
          initialData={certificate || undefined}
          refreshData={refreshData}
          fields={[
            {
              label: "Certificate Title",
              name: "title",
              type: "text",
              required: true,
            },
            {
              label: "Description",
              name: "description",
              type: "textarea",
              required: true,
            },
            { label: "Field", name: "field", type: "text", required: true },
            {
              label: "Platform",
              name: "platform",
              type: "text",
              required: true,
            },
            {
              label: "Verification Link",
              name: "verification_link",
              type: "url",
              required: false,
            },
            {
              label: "Completion Date",
              name: "date",
              type: "date",
              required: true,
            },
          ]}
          onSubmit={async (formData) => {
            const typedFormData = formData as EntryFormDataType;
            updateEntry("certificates", typedFormData, typedFormData._id || "");
          }}
          title={"Update Certificate Details"}
        />
      </div>
    </Dialog>
  );
};
