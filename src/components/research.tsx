import { useState } from "react";
import { useDialog, useEntries } from "../hooks";
import { ResearchDetailsDialog } from "./researchDetailPopUp";
import { ListDisplay } from "./listDisplay";
import { FormPopUp } from "./formPopUp";
import { EntryFormDataType, submitResearchPaper } from "../hooks/postData";

export const Research = () => {
  const [reload, setReload] = useState(false);

  const refreshData = () => {
    setReload((prev) => !prev);
  };

  const { loading, details } = useEntries("researchPapers", reload);

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

  const [selectedPaperId, setSelectedPaperId] = useState("");

  if (loading) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  const openDetailsDialog = (id: string) => {
    setSelectedPaperId(id);
    handleDetailsOpen();
  };

  return (
    <div>
      <ListDisplay
        title="Resesarch Papers"
        items={details?.researchPapers || []}
        onAdd={handleAddOpen}
        onViewDetails={openDetailsDialog}
      />

      {
        <FormPopUp
          open={addOpen}
          onClose={handleAddClose}
          initialData={{}}
          refreshData={refreshData}
          fields={[
            { label: "Title", name: "title", type: "text", required: true },
            {
              label: "Description",
              name: "description",
              type: "textarea",
              required: true,
            },
            {
              label: "Certificate",
              name: "certificate_of_publication",
              type: "file",
            },
            {
              label: "Verification Link",
              name: "verification_link",
              type: "url",
            },
            { label: "Conference Name", name: "conference_name", type: "text" },
            { label: "Published Date", name: "publish_date", type: "date" },
          ]}
          onSubmit={async (formData) => {
            const typedFormData = formData as EntryFormDataType;
            submitResearchPaper(typedFormData);
          }}
          title={"Add Research Paper"}
        />
      }

      {selectedPaperId && (
        <ResearchDetailsDialog
          open={detailsOpen}
          onClose={() => {
            handleDetailsClose(),
            refreshData()
          }}
          id={selectedPaperId}
          refreshData={refreshData}
        />
      )}
    </div>
  );
};
