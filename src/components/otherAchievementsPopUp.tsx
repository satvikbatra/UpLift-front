import Dialog from "@mui/material/Dialog";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";
import { deleteEntry, EntryFormDataType, updateEntry } from "../hooks/postData";
import { FormPopUp } from "./formPopUp";
import { OtherAchievementsTypes } from "../hooks";

interface AchievementDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  id: string;
  refreshData: () => void;
}

export const AchievementDetailsDialog = ({
  open,
  onClose,
  id,
  refreshData,
}: AchievementDetailsDialogProps) => {
  const [achievement, setAchievement] = useState<OtherAchievementsTypes | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id || !open) return;

    setAchievement(null);
    setLoading(true);

    const fetchAchievement = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/otherAchievements/${id}`,
          {
            headers: {
              Authorization:
                "Bearer " +
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb25fZW1haWxfaWQiOiJyYWh1bC5uYWlyQGJlbm5ldHQuZWR1LmluIiwiaWF0IjoxNzQxNzIyMzU1fQ.UgZyiUhfAyb6fgWnzMZXj3V3ulq8t_PE52jJTSjosqQ",
            },
          }
        );
        setAchievement(response.data.achievement);
      } catch (error) {
        console.error("Error fetching achievement:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievement();
  }, [id, open, refreshData]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        {loading || !achievement ? (
          <div className="flex justify-center items-center h-40 text-lg font-medium text-gray-600">
            Loading...
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">
              {achievement.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {achievement.description}
            </p>
            <p className="text-gray-600">
              <strong>Date:</strong> {new Date(achievement.date).toDateString()}
            </p>
            {achievement.category && (
              <p className="text-gray-600">
                <strong>Category:</strong> {achievement.category}
              </p>
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={async () => {
                  setDeleting(true);
                  try {
                    await deleteEntry("otherAchievements", id);
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
          initialData={achievement || undefined}
          refreshData={refreshData}
          fields={[
            { label: "Title", name: "title", type: "text", required: true },
            {
              label: "Description",
              name: "description",
              type: "textarea",
              required: true,
            },
            { label: "Date", name: "date", type: "date", required: true },
            {
              label: "Category",
              name: "category",
              type: "text",
              required: false,
            },
          ]}
          onSubmit={async (formData) => {
            const typedFormData = formData as EntryFormDataType;
            updateEntry("otherAchievements", typedFormData, id);
          }}
          title={"Update Achievement Details"}
        />
      </div>
    </Dialog>
  );
};
