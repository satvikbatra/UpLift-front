import { useState } from "react";
import { useDetails, useDialog } from "../hooks";
import { generateAppraisalPDF, submitAppraisal } from "../services/pdfService";
import { AppraisalDialog } from "./appraisalDialog";

export const AppBar = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { details } = useDetails();
  const { open, handleOpen, handleClose } = useDialog();

  const handleAppraisalClick = async () => {
    try {
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

  return (
    <div className="flex justify-between items-center p-4 max-w-7xl mx-auto w-full">
      <div className="ml-4 text-2xl font-bold">UpLift</div>
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
    </div>
  );
};
