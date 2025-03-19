import { useState } from "react";
import { useDialog, useEntries } from "../hooks";
import { ListDisplay } from "./listDisplay";
import { FormPopUp } from "./formPopUp";
import { EntryFormDataType, submitEntry } from "../hooks/postData";
import { AchievementDetailsDialog } from "./otherAchievementsPopUp";

export const OtherAchievements = () => {
  const [reload, setReload] = useState(false);
  const refreshData = () => setReload((prev) => !prev);

  const { loading, details } = useEntries("otherAchievements", reload);
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

  const [selectedAchievementId, setSelectedAchievementId] = useState("");

  if (loading)
    return <div className="flex justify-center items-center">Loading...</div>;

  const openDetailsDialog = (id: string) => {
    setSelectedAchievementId(id);
    handleDetailsOpen();
  };

  return (
    <div>
      <ListDisplay
        title="Other Achievements"
        items={details?.otherAchievements || []}
        onAdd={handleAddOpen}
        onViewDetails={openDetailsDialog}
      />

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
          { label: "Date", name: "date", type: "date", required: true },
          {
            label: "Category",
            name: "category",
            type: "text",
            required: false,
          },
        ]}
        onSubmit={async (formData) => {
          const typedFormData = formData as EntryFormDataType;
          submitEntry("otherAchievements", typedFormData);
        }}
        title={"Add Achievement"}
      />

      {selectedAchievementId && (
        <AchievementDetailsDialog
          open={detailsOpen}
          onClose={() => {
            handleDetailsClose(),
            refreshData()
          }}
          id={selectedAchievementId}
          refreshData={refreshData}
        />
      )}
    </div>
  );
};
