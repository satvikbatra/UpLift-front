import Dialog from "@mui/material/Dialog";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";
import ResponsiveDialog from "./researchPopUp";
import { deleteResearchPaper } from "../hooks/postData";

export interface PaperTypes {
  _id: string,
  title: string;
  description: string;
  verification_link?: string;
  conference_name?: string;
  publish_date?: string;
  certificate_of_publication?: string | null;
}

interface ResearchDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  id: string;
  refreshData: () => void;
}

export const ResearchDetailsDialog = ({
  open,
  onClose,
  id,
  refreshData
}: ResearchDetailsDialogProps) => {
  const [paper, setPaper] = useState<PaperTypes | null>(null);
  const [loading, setLoading] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  useEffect(() => {
    if (!id || !open) return;

    setPaper(null);
    setLoading(true);

    const fetchPaper = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/researchPapers/${id}`,
          {
            headers: {
              Authorization:
                "Bearer " +
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb25fZW1haWxfaWQiOiJyYWh1bC5uYWlyQGJlbm5ldHQuZWR1LmluIiwiaWF0IjoxNzQxNzIyMzU1fQ.UgZyiUhfAyb6fgWnzMZXj3V3ulq8t_PE52jJTSjosqQ",
            },
          }
        );
        setPaper(response.data.researchPaper);
        console.log(paper)
      } catch (error) {
        console.error("Error fetching research paper:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaper();
  }, [id, open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <div className="p-6 bg-white w-full mx-auto rounded-lg shadow-lg">
        {loading || !paper ? (
          <div className="flex justify-center items-center h-40 text-lg font-medium text-gray-600">
            Loading...
          </div>
        ) : (
          <div className="px-4 pt-2 space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">{paper.title}</h2>

            <p className="text-gray-600">
              <span className="font-semibold text-gray-700">Published in</span>
              <span className="text-blue-600">
                {" "}
                {paper.conference_name || "an unspecified conference"}{" "}
              </span>
              <span className="font-semibold text-gray-700">on</span>
              <span className="text-blue-600">
                {" "}
                {paper.publish_date?.split("T")[0] || "an unknown date"}.
              </span>
            </p>

            <p className="text-gray-700 leading-relaxed">{paper.description}</p>

            {paper.verification_link && (
              <div className="mt-2">
                <p className="text-gray-600 font-medium">
                  Verification Link:{" "}
                  <a
                    href={paper.verification_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline hover:text-blue-700"
                  >
                    {paper.verification_link}
                  </a>
                </p>
              </div>
            )}

            {/* {paper.certificate_of_publication && (
                            <div className="mt-4">
                                <p className="text-gray-600 font-medium">Certificate:</p>

                                {paper.certificate_of_publication.match(/\.(jpeg|jpg|png)$/) && (
                                    <img 
                                        src={paper.certificate_of_publication} 
                                        alt="certificate_of_publication" 
                                        className="mt-2 w-full max-w-md rounded-lg shadow-md border"
                                    />
                                )}

                                {paper.certificate_of_publication.endsWith(".pdf") && (
                                    <iframe 
                                        src={paper.certificate_of_publication} 
                                        className="mt-2 w-full h-96 border rounded-lg shadow-md"
                                    />
                                )}

                                {!paper.certificate_of_publication.match(/\.(jpeg|jpg|png|pdf)$/) && (
                                    <a 
                                        href={paper.certificate_of_publication} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-blue-500 underline hover:text-blue-700"
                                    >
                                        Download certificate_of_publication
                                    </a>
                                )}
                            </div>
                        )} */}

            <div className="flex justify-end cursor-pointer gap-2">
              <button
                onClick={async () => {
                    try {
                      await deleteResearchPaper(paper._id);
                      setPaper(null);
                      refreshData();
                      onClose();
                    } catch (error) {
                      console.error("Error deleting research paper:", error);
                      alert("Failed to delete the research paper.");
                    }
                  }}
                className="button"
              >
                Delete
              </button>
              <button
                onClick={() => setIsUpdateOpen(true)}
                className="button"
              >
                Update Details
              </button>
              <button
                onClick={onClose}
                className="button"
              >
                Close
              </button>
            </div>
          </div>
        )}
        <ResponsiveDialog open={isUpdateOpen} onClose={() => setIsUpdateOpen(false)} initialData={paper || undefined} refreshData={refreshData} />
      </div>
    </Dialog>
  );
};
