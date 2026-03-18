import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { ArrayInput } from "./arrayInput";

interface FormPopUpProps {
  open: boolean;
  onClose: () => void;
  initialData?: Record<string, unknown>;
  refreshData: () => void;
  fields: { label: string; name: string; type: string; required?: boolean }[];
  onSubmit: (formData: Record<string, unknown>) => Promise<void>;
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
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
      }));
    }
  }, [initialData]);

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

  const handleArrayChange = (name: string, value: string[]) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const cleanData: Record<string, unknown> = {};

    fields.forEach((field) => {
      if (formData[field.name] !== undefined) {
        cleanData[field.name] = formData[field.name];
      }
    });

    try {
      await onSubmit(cleanData);
      refreshData();
      onClose();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      alert(`Error submitting: ${errorMessage}`);
    }
  };

  const getInputValue = (field: { name: string; type: string }): string | string[] => {
    const value = formData[field.name];
    if (field.type === "date" && value && typeof value === "string") {
      return value.split("T")[0];
    }
    if (field.type === "array" && Array.isArray(value)) {
      return value as string[];
    }
    return typeof value === "string" ? value : "";
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
                  value={getInputValue(field) as string}
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
                  value={getInputValue(field) as string[]}
                  onChange={(val) => handleArrayChange(field.name, val)}
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={getInputValue(field) as string}
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
