import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

interface AppraisalNotification {
  _id: string;
  status: "pending" | "approved" | "rejected";
  appliedAt: string;
}

export const AppraisalNotifications = () => {
  const [appraisals, setAppraisals] = useState<AppraisalNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppraisals = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/user/appraisals`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setAppraisals(response.data.appraisals || []);
        setError(null);
      } catch (err: any) {
        // Only set error if it's not a "no appraisals found" response
        if (err.response?.status !== 404) {
          setError(err.response?.data?.msg || "Failed to fetch appraisals");
        } else {
          setAppraisals([]);
          setError(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAppraisals();
    // Poll for updates every 30 seconds
    const interval = setInterval(fetchAppraisals, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse bg-gray-100 rounded-lg p-4 mb-4">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-4">
        {error}
      </div>
    );
  }

  if (!appraisals.length) {
    return (
      <></>
    );
  }

  return (
    <div className="space-y-4">
      {appraisals.map((appraisal) => (
        <div
          key={appraisal._id}
          className={`p-4 rounded-lg shadow-sm ${getStatusColor(appraisal.status)}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">
                Appraisal Request {getStatusBadge(appraisal.status)}
              </h3>
              <p className="text-sm text-gray-600">
                Submitted on {new Date(appraisal.appliedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="text-sm font-medium">
              {getStatusMessage(appraisal.status)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-50 border border-green-200";
    case "rejected":
      return "bg-red-50 border border-red-200";
    default:
      return "bg-yellow-50 border border-yellow-200";
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "approved":
      return (
        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Approved
        </span>
      );
    case "rejected":
      return (
        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          Rejected
        </span>
      );
    default:
      return (
        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          Pending
        </span>
      );
  }
};

const getStatusMessage = (status: string) => {
  switch (status) {
    case "approved":
      return "Your appraisal request has been approved";
    case "rejected":
      return "Your appraisal request has been rejected";
    default:
      return "Your appraisal request is under review";
  }
};