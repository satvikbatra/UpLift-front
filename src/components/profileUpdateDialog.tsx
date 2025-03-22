import { FormPopUp } from "./formPopUp";
import { UserDetails } from "../hooks";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface ProfileUpdateDialogProps {
  open: boolean;
  onClose: () => void;
  userData: UserDetails;
  refreshData: () => void;
}

export const ProfileUpdateDialog = ({
  open,
  onClose,
  userData,
  refreshData,
}: ProfileUpdateDialogProps) => {
  // Create a profile update function
  const updateUserProfile = async (formData: Partial<UserDetails>) => {
    // Convert phone number to number type if present
    if (formData.phone_number) {
      formData.phone_number = Number(formData.phone_number);
    }

    // Remove unnecessary fields that shouldn't be updated
    const fieldsToRemove = [
      "organization_email_id",
      "personal_email_id",
      "password",
      "full_name",
      "is_admin",
      "_id",
      "projects",
      "seminars",
      "certificates",
      "researchPapers",
      "otherAchievements",
      "averageRating",
    ];

    const updatedData = { ...formData };
    fieldsToRemove.forEach(
      (field) => delete updatedData[field as keyof UserDetails]
    );

    try {
      await axios.post(`${BACKEND_URL}/user/updateDetails`, updatedData, {
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb25fZW1haWxfaWQiOiJlMjJjc2V1MTQ5MUBiZW5uZXR0LmVkdS5pbiIsImlhdCI6MTc0MjYwMTE1MH0.REP7xtfWb7xnDWXZOvl3Ts64VJ-Q3LaDTw1DBtG34y4",
          "Content-Type": "application/json",
        },
      });

      //   refreshData();
      alert("Profile updated successfully!");
    } catch (error: any) {
      console.error("Error updating profile:", error);
      // Prevent default form submission behavior
      //   error.preventDefault();
      // Show error details in console

      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <FormPopUp
      open={open}
      onClose={onClose}
      initialData={userData}
      refreshData={refreshData}
      fields={[
        { label: "Profile Image", name: "profile_image", type: "file" },
        { label: "Full Name", name: "full_name", type: "text", required: true },
        {
          label: "Personal Email",
          name: "personal_email_id",
          type: "email",
          required: true,
        },
        {
          label: "Organization Email",
          name: "organization_email_id",
          type: "email",
          required: true,
        },
        {
          label: "Phone Number",
          name: "phone_number",
          type: "number",
          required: true,
        },
        {
          label: "Department",
          name: "department_name",
          type: "text",
          required: true,
        },
        { label: "Role", name: "role", type: "text", required: true },
      ]}
      onSubmit={updateUserProfile}
      title="Update Profile"
    />
  );
};
