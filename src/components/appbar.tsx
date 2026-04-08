import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDetails, useDialog } from "../hooks";
import { generateAppraisalPDF, submitAppraisal } from "../services/pdfService";
import { AppraisalDialog } from "./appraisalDialog";

export const AppBar = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { details, loading } = useDetails();
  const { open, handleOpen, handleClose } = useDialog();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAppraisalClick = async () => {
    try {
      // console.log(details)
      setIsGenerating(true);
      const pdfDataUrl = await generateAppraisalPDF(details);
      setPdfUrl(pdfDataUrl);

      handleOpen();
    } catch (error) {
      console.error("Error generating appraisal PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmitAppraisal = async () => {
    try {
      setIsSubmitting(true);
      setErrorMessage("");
      const result = await submitAppraisal(details._id);

      if (result.success) {
        handleClose();
        setIsSubmitted(true);
        // Reset the submitted state after 3 seconds
        setTimeout(() => setIsSubmitted(false), 3000);
      } else if (result.errorMessage) {
        // Display the error message
        setErrorMessage(result.errorMessage);

        // If it's a pending appraisal error, close the dialog after showing the message
        if (result.errorMessage.includes("pending appraisal request")) {
          // Close the dialog after 3 seconds
          setTimeout(() => {
            handleClose();
            setErrorMessage("");
          }, 3000);
        }
      }
    } catch (error) {
      console.error("Error submitting appraisal:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isHomePage = location.pathname === '/home';
  const isTodoPage = location.pathname === '/todo';

  return (
    <div className="flex justify-between items-center p-4 max-w-7xl mx-auto w-full">
      <div className="flex items-center gap-6">
        <div className="ml-4 text-2xl font-bold">UpLift</div>
        {!loading && !details.is_admin && (
          <nav className="hidden sm:flex gap-2">
            <button
              onClick={() => navigate('/home')}
              className={`px-3 py-1 rounded transition-colors ${
                isHomePage
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigate('/todo')}
              className={`px-3 py-1 rounded transition-colors ${
                isTodoPage
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Todo List
            </button>
          </nav>
        )}
      </div>

      {loading ? (
        <div className="w-32 h-10 bg-gray-200 animate-pulse rounded"></div>
      ) : !details.is_admin ? (
        <>
          <div>
            <button
              onClick={handleAppraisalClick}
              disabled={isGenerating}
              className={`button transition-all duration-200 
                ${
                  isSubmitted
                    ? "bg-green-500 text-white"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                } 
                ${
                  isGenerating ? "opacity-70 !cursor-not-allowed" : "cursor-pointer"
                }
              `}
            >
              {isGenerating
                ? "Generating..."
                : isSubmitted
                ? "Submitted Successfully!"
                : "Apply for Appraisal"}
            </button>
          </div>

          <AppraisalDialog
            open={open}
            onClose={handleClose}
            pdfUrl={pdfUrl}
            onSubmit={handleSubmitAppraisal}
            isSubmitting={isSubmitting}
            errorMessage={errorMessage}
          />
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};
