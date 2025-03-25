import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { ArrayInput } from "./arrayInput";

interface FormPopUpProps {
  open: boolean;
  onClose: () => void;
  initialData?: Record<string, any>;
  refreshData: () => void;
  fields: { label: string; name: string; type: string; required?: boolean }[];
  onSubmit: (formData: Record<string, any>) => Promise<void>;
  title: string;
}

export const FormPopUp = ({
  open,
  onClose,
  initialData,
  refreshData,
  fields,
  onSubmit,
  title,
}: FormPopUpProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  // const [postImage, setPostImage] = useState<{ myFile: string }>({
  //   myFile: "",
  // });

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
      }));
    }
  }, [initialData]);

  // function convertToBase64(file: File) {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);

  //     fileReader.onload = () => {
  //       resolve(fileReader.result);
  //     };
  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (!fields.find((field) => field.name === name)) return;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "date" ? new Date(value).toISOString().split("T")[0] : value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
    }
  };

  // const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     const file = e.target.files[0];
  //     const base64 = await convertToBase64(file);
  //     setPostImage({ ...postImage, myFile: base64 as string });
  //   }
  // };

  const handleArrayChange = (name: string, value: string[]) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const cleanData = {};

    fields.forEach((field) => {
      if (formData[field.name] !== undefined) {
        (cleanData as Record<string, any>)[field.name] = formData[field.name];
      }
    });

    try {
      await onSubmit(cleanData);
      refreshData();
      onClose();
    } catch (error: any) {
      alert(`Error submitting: ${error.message || "Unknown error"}`);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <div className="p-6 bg-white w-full mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">{title}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>

              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md min-h-[100px] resize-none"
                  required={field.required}
                />
              ) : field.type === "file" ? (
                <input
                  type="file"
                  name={field.name}
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded-md"
                />
              ) : field.type === "array" ? (
                <ArrayInput
                  name={field.name}
                  value={formData[field.name] || []}
                  onChange={(val) => handleArrayChange(field.name, val)}
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={
                    field.type === "date" && formData[field.name]
                      ? new Date(formData[field.name])
                          .toISOString()
                          .split("T")[0]
                      : formData[field.name] || ""
                  }
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      [field.name]: e.target.value,
                    }));
                  }}
                  className="w-full p-2 border rounded-md"
                  required={field.required}
                />
              )}
            </div>
          ))}

          <div className="flex justify-center items-center">
            <button type="submit" className="button">
              {initialData && initialData._id ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};
