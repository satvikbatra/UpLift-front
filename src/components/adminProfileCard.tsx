import { useState } from "react";
import { Check, X } from "lucide-react";
import avatar from "../assets/image.png";
import { updateAppraisalStatus } from "../services/appraisalService";

interface AdminProfileCardProps {
  name: string;
  personal_email: string;
  organization_email: string;
  phone_number: number;
  department_name: string;
  role: string;
  profile_image?: string;
  appraisal_status: "pending" | "approved" | "rejected";
  appraisal_id: string;
}

export const AdminProfileCard = ({
  name,
  personal_email,
  organization_email,
  phone_number,
  department_name,
  role,
  profile_image,
  appraisal_status,
  appraisal_id,
}: AdminProfileCardProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState(appraisal_status);

  const handleStatusUpdate = async (newStatus: "approved" | "rejected") => {
    if (status === newStatus) return;
    
    setIsProcessing(true);
    try {
      await updateAppraisalStatus(appraisal_id, newStatus);
      setStatus(newStatus);
    } catch (error) {
      console.error("Error updating appraisal status:", error);
      alert("Failed to update status. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "approved":
        return "text-green-600";
      case "rejected":
        return "text-red-600";
      default:
        return "text-yellow-600";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col sm:flex-row items-start gap-6">
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-gray-300 overflow-hidden flex-shrink-0 mx-auto sm:mx-0">
          {profile_image ? (
            <img
              src={profile_image}
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = avatar;
              }}
            />
          ) : (
            <img
              src={avatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="flex-1 w-full">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
            <p className="text-gray-600">
              {department_name} - {role}
            </p>
          </div>

          <div className="space-y-2 text-gray-600">
            <div className="flex items-center gap-2">
              <span className="font-medium">Personal Email:</span>
              <span>{personal_email}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Organization Email:</span>
              <span>{organization_email}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Phone:</span>
              <span>+91 {phone_number}</span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className={`font-medium ${getStatusColor()}`}>
              Status: {status.charAt(0).toUpperCase() + status.slice(1)}
            </div>
            
            {status === "pending" && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusUpdate("approved")}
                  disabled={isProcessing}
                  className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Check size={16} />
                  Approve
                </button>
                <button
                  onClick={() => handleStatusUpdate("rejected")}
                  disabled={isProcessing}
                  className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <X size={16} />
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};