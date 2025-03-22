import Dialog from "@mui/material/Dialog";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";
import { deleteEntry, EntryFormDataType, updateEntry } from "../hooks/postData";
import { FormPopUp } from "./formPopUp";
import { SeminarsTypes } from "../hooks";

interface SeminarDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  id: string;
  refreshData: () => void;
}

export const SeminarDetailsDialog = ({
  open,
  onClose,
  id,
  refreshData,
}: SeminarDetailsDialogProps) => {
  const [seminar, setSeminar] = useState<SeminarsTypes | null>(null);
  const [loading, setLoading] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id || !open) return;

    setSeminar(null);
    setLoading(true);

    const fetchSeminar = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/seminars/${id}`, {
          headers: {
            Authorization:
              "Bearer " +
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb25fZW1haWxfaWQiOiJlMjJjc2V1MTQ5MUBiZW5uZXR0LmVkdS5pbiIsImlhdCI6MTc0MjYwMTE1MH0.REP7xtfWb7xnDWXZOvl3Ts64VJ-Q3LaDTw1DBtG34y4",
          },
        });
        setSeminar(response.data.seminar);
      } catch (error) {
        console.error("Error fetching seminar:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeminar();
  }, [id, open, refreshData]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        {loading || !seminar ? (
          <div className="flex justify-center items-center h-40 text-lg font-medium text-gray-600">
            Loading...
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">
              {seminar.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {seminar.description}
            </p>
            <p className="text-gray-600">
              <strong>Location:</strong> {seminar.location}
            </p>
            <p className="text-gray-600">
              <strong>Role:</strong> {seminar.role}
            </p>
            <p className="text-gray-600">
              <strong>Date:</strong> {new Date(seminar.date).toDateString()}
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={async () => {
                  setDeleting(true);
                  try {
                    await deleteEntry("seminars", id);
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
          initialData={seminar || undefined}
          refreshData={refreshData}
          fields={[
            {
              label: "Seminar Title",
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
            {
              label: "Location",
              name: "location",
              type: "text",
              required: true,
            },
            { label: "Role", name: "role", type: "text", required: true },
            { label: "Date", name: "date", type: "date", required: true },
          ]}
          onSubmit={async (formData) => {
            const typedFormData = formData as EntryFormDataType;
            updateEntry("seminars", typedFormData, id);
          }}
          title={"Update Seminar Details"}
        />
      </div>
    </Dialog>
  );
};
