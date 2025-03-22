import { useState } from "react";
import { useDialog, useEntries } from "../hooks";
import { ListDisplay } from "./listDisplay";
import { FormPopUp } from "./formPopUp";
import { EntryFormDataType, submitEntry } from "../hooks/postData";
import { ProjectDetailsDialog } from "./projectsDetailPopUp";
import { Skeleton } from "./skeleton";

export const Projects = () => {
  const [reload, setReload] = useState(false);

  const refreshData = () => {
    setReload((prev) => !prev);
  };

  const { loading, details } = useEntries("projects", reload);

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

  const [selectedProjectId, setSelectedProjectId] = useState("");

  if (loading) {
    return <Skeleton type="list" count={2} />;
  }

  const openDetailsDialog = (id: string) => {
    setSelectedProjectId(id);
    handleDetailsOpen();
  };

  return (
    <div>
      <ListDisplay
        title="Projects"
        items={details?.projects || []}
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
            {
              label: "Project Name",
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
            {
              label: "GitHub Repository",
              name: "github_link",
              type: "url",
              required: true,
            },
            {
              label: "Tech Stack",
              name: "tech_stack",
              type: "array",
              required: true,
            },
            {
              label: "Completion Date",
              name: "date",
              type: "date",
              required: true,
            },
          ]}
          onSubmit={async (formData) => {
            const typedFormData = formData as EntryFormDataType;
            submitEntry("projects", typedFormData);
          }}
          title={"Add Project"}
        />
      }

      {selectedProjectId && (
        <ProjectDetailsDialog
          open={detailsOpen}
          onClose={() => {
            handleDetailsClose();
            refreshData();
          }}
          id={selectedProjectId}
          refreshData={refreshData}
        />
      )}
    </div>
  );
};
