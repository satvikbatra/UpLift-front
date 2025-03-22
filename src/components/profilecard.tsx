import { Pencil } from "lucide-react";
import { useState } from "react";
import { ProfileUpdateDialog } from "./profileUpdateDialog";
import { useDetails } from "../hooks";
import avatar from "../assets/image.png";

interface ProfileDetailsTypes {
  name: string;
  personal_email: string;
  organization_email: string;
  phone_number: number;
  department_name: string;
  role: string;
  profile_image?: string;
}

export const ProfileCard = ({
  name,
  personal_email,
  organization_email,
  phone_number,
  department_name,
  role,
}: ProfileDetailsTypes) => {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const { details, loading } = useDetails();

  const handleOpenUpdateDialog = () => {
    setIsUpdateDialogOpen(true);
  };

  const handleCloseUpdateDialog = () => {
    setIsUpdateDialogOpen(false);
  };

  return (
    <div className="card">
      <div className="flex justify-end">
        <div
          className="text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={handleOpenUpdateDialog}
        >
          <Pencil size={18} />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row lg:flex-col items-center justify-around gap-6 mx-4 my-2">
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-gray-300 overflow-hidden">
          {details.profile_image ? (
            <img
              src={details.profile_image?.toString()}
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXIiPjxwYXRoIGQ9Ik0yMCA3LjVBNy41IDcuNSAwIDEgMSA1IDcuNWE3LjUgNy41IDAgMCAxIDE1IDBaIi8+PHBhdGggZD0iTTEyIDE1YTYgNiAwIDAgMC02IDZoMTJhNiA2IDAgMCAwLTYtNloiLz48L3N2Zz4=";
              }}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <img
                src={avatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        <div className="text-center md:text-left">
          <div className="mb-3">
            <div className="text-2xl font-extrabold text-gray-800">{name}</div>
            <div className="text-gray-500 text-sm">
              {department_name} - {role}
            </div>
          </div>

          <div className="text-gray-600 text-sm space-y-1">
            <div>{personal_email}</div>
            <div>{organization_email}</div>
            <div className="font-medium text-gray-700">+91 {phone_number}</div>
          </div>
        </div>
      </div>

      {!loading && (
        <ProfileUpdateDialog
          open={isUpdateDialogOpen}
          onClose={handleCloseUpdateDialog}
          userData={details}
          refreshData={() => window.location.reload()}
        />
      )}
    </div>
  );
};
