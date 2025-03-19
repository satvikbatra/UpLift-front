import { useState } from "react";
import { useDialog, useEntries } from "../hooks";
import { ListDisplay } from "./listDisplay";
import { FormPopUp } from "./formPopUp";
import { EntryFormDataType, submitEntry } from "../hooks/postData";
import { SeminarDetailsDialog } from "./seminarsDetailPopUp";

export const Seminars = () => {
  const [reload, setReload] = useState(false);
  const refreshData = () => setReload((prev) => !prev);

  const { loading, details } = useEntries("seminars", reload);
  const {
    open: addOpen,
    handleOpen: handleAddOpen,
    handleClose: handleAddClose,
  } = useDialog();
  const {
    open: detailsOpen,
    handleOpen: handleDetailsOpen,
    handleClose: handleDetailsClose,
  } = useDialog();

  const [selectedSeminarId, setSelectedSeminarId] = useState("");

  if (loading)
    return <div className="flex justify-center items-center">Loading...</div>;

  const openDetailsDialog = (id: string) => {
    setSelectedSeminarId(id);
    handleDetailsOpen();
  };

  return (
    <div>
      <ListDisplay
        title="Seminars"
        items={details?.seminars || []}
        onAdd={handleAddOpen}
        onViewDetails={openDetailsDialog}
      />

      <FormPopUp
        open={addOpen}
        onClose={handleAddClose}
        initialData={{}}
        refreshData={refreshData}
        fields={[
          {
            label: "Seminar Title",
            name: "title",
            type: "text",
            required: true,
          },
          {
            label: "Description",
            name: "description",
            type: "textarea",
            required: true,
          },
          { label: "Location", name: "location", type: "text", required: true },
          { label: "Role", name: "role", type: "text", required: true },
          { label: "Date", name: "date", type: "date", required: true },
        ]}
        onSubmit={async (formData) => {
          const typedFormData = formData as EntryFormDataType;
          submitEntry("seminars", typedFormData);
        }}
        title={"Add Seminar"}
      />

      {selectedSeminarId && (
        <SeminarDetailsDialog
          open={detailsOpen}
          onClose={() => {
            handleDetailsClose(),
            refreshData()
          }}
          id={selectedSeminarId}
          refreshData={refreshData}
        />
      )}
    </div>
  );
};
