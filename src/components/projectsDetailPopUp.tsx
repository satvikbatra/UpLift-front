import Dialog from "@mui/material/Dialog";
import axios from "axios";
import { BACKEND_URL, USER_TOKEN } from "../config";
import { useEffect, useState } from "react";
import { deleteEntry, EntryFormDataType, updateEntry } from "../hooks/postData";
import { FormPopUp } from "./formPopUp";
import { ProjectsTypes } from "../hooks";

interface ProjectDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  id: string;
  refreshData: () => void;
}

export const ProjectDetailsDialog = ({
  open,
  onClose,
  id,
  refreshData,
}: ProjectDetailsDialogProps) => {
  const [project, setProject] = useState<ProjectsTypes | null>(null);
  const [loading, setLoading] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id || !open) return;

    setProject(null);
    setLoading(true);

    const fetchProject = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/projects/${id}`, {
          headers: {
            Authorization:
              "Bearer " +
              USER_TOKEN,
          },
        });
        setProject(response.data.project);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, open, refreshData]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <div className="p-6 bg-white w-full mx-auto rounded-lg shadow-lg">
        {loading || !project ? (
          <div className="flex justify-center items-center h-40 text-lg font-medium text-gray-600">
            Loading...
          </div>
        ) : (
          <div className="px-4 pt-2 space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">
              {project.title}
            </h2>

            <p className="text-gray-700 leading-relaxed">
              {project.description}
            </p>

            {project.github_link && (
              <p className="text-gray-600 font-medium">
                Repository:{" "}
                <a
                  href={project.github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  {project.github_link}
                </a>
              </p>
            )}

            <p className="text-gray-600">
              <span className="font-semibold text-gray-700">Tech Stack:</span>{" "}
              {project.tech_stack.join(", ")}
            </p>

            <div className="flex justify-end cursor-pointer gap-2">
              <button
                onClick={async () => {
                  setDeleting(true);
                  try {
                    const result = await deleteEntry("projects", id);
                    if (result) {
                      refreshData();
                      onClose();
                    }
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
          initialData={project || undefined}
          refreshData={refreshData}
          fields={[
            {
              label: "Project Name",
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
              label: "GitHub Repository",
              name: "github_link",
              type: "url",
              required: true,
            },
            {
              label: "Tech Stack",
              name: "tech_stack",
              type: "array",
              required: true,
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
            const result = await updateEntry(
              "projects",
              typedFormData,
              typedFormData._id || ""
            );
            if (result) {
              refreshData();
              setIsUpdateOpen(false);
            }
          }}
          title={"Update Project Details"}
        />
      </div>
    </Dialog>
  );
};
