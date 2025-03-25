import { AppBar } from "../components/appbar"
import { AdminProfileCard } from "../components/adminProfileCard"
import { Skeleton } from "../components/skeleton"
import { useAppraisals, useDialog } from "../hooks";
import { useState } from "react";
import { generateAdminAppraisalPDF } from "../services/pdfService";
import { AppraisalDialog } from "../components/appraisalDialog";
// import { updateAppraisalStatus } from "../services/pdfService";

export const Admin = () => {
    const { loading, details } = useAppraisals(false);
    const appraisals = details?.appraisals || [];

    const [pdfUrl, setPdfUrl] = useState("");
    const [, setIsGenerating] = useState(false);
    const { open, handleOpen, handleClose } = useDialog();

    if (loading) {
        return <div className="relative min-h-screen bg-blue-200 flex-1 flex-col">
            <div className="sticky top-0 z-50 w-full mb-4 bg-white flex items-center">
                <AppBar />
            </div>
            <Skeleton type="admin" count={3} />
        </div>
    }

    const handleCardClick = async (userId: string) => {
        try {
            setIsGenerating(true);
            const pdfDataUrl = await generateAdminAppraisalPDF(userId);
            setPdfUrl(pdfDataUrl);
            handleOpen();
        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setIsGenerating(false);
        }
    }

    return <div className="relative min-h-screen bg-blue-200 flex-1 flex-col">
        <div className="sticky top-0 z-50 w-full mb-4 bg-white flex items-center">
        <AppBar />
        </div>

        <div className="max-w-6xl mx-auto flex flex-col gap-6 p-4 w-full">
            {appraisals.map((appraisal: any) => (
              <div key={appraisal._id} onClick={() =>handleCardClick(appraisal.user._id)} className="card cursor-pointer">
                <AdminProfileCard 
                    name={appraisal?.user.full_name}
                    personal_email={appraisal?.user?.personal_email_id}
                    organization_email={appraisal.user.organization_email_id}
                    phone_number={appraisal.user.phone_number}
                    department_name={appraisal.user.department_name}
                    role={appraisal.user.role}
                    profile_image={appraisal.user.profile_image}
                    appraisal_status={appraisal.status}
                    appraisal_id={appraisal._id}
                    // onApprove={async () => {
                    //   await updateAppraisalStatus(appraisal._id, "approved");
                    //   window.location.reload();
                    // }}
                    // onReject={async () => {
                    //   await updateAppraisalStatus(appraisal._id, "rejected");
                    //   window.location.reload();
                    // }}
                />
              </div>
            ))}
        </div>

        <AppraisalDialog
            open={open}
            onClose={handleClose}
            pdfUrl={pdfUrl}
            onSubmit={() => {}}
            isSubmitting={false}
            isAdmin={true}
        />
    </div>
}