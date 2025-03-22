import { Dialog } from "@mui/material";

interface AppraisalDialogProps {
  open: boolean;
  onClose: () => void;
  pdfUrl: string;
  onSubmit: () => void;
  isSubmitting: boolean;
  errorMessage?: string;
}

export const AppraisalDialog = ({
  open,
  onClose,
  pdfUrl,
  onSubmit,
  isSubmitting,
  errorMessage,
}: AppraisalDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <div className="p-6 flex flex-col gap-4">
        <div className="text-xl font-bold">Appraisal Preview</div>
        <div className="text-sm text-gray-600 mb-2">
          Please review your appraisal document before submitting.
        </div>

        <div className="w-full min-h-screen border border-gray-300 rounded-lg overflow-hidden">
          <iframe
            src={pdfUrl}
            className="w-full h-[calc(100vh-100px)]"
            title="Appraisal PDF Preview"
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          {errorMessage && (
            <div className="p-3 mb-2 bg-red-100 text-red-700 rounded-md border border-red-300">
              {errorMessage}
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              disabled={isSubmitting}
              className={`button hover:bg-blue-600 ${
                isSubmitting
                  ? "opacity-70 !cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Appraisal"}
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
