import { useState, lazy, Suspense, ComponentType } from "react";
import { useDialog, useEntries } from "../../hooks";
import { ListDisplay, ListItem } from "../listDisplay";
import { FormPopUp } from "../formPopUp";
import { EntryFormDataType, submitEntry } from "../../hooks/postData";
import { Skeleton } from "../skeleton";
import { AchievementConfig } from "./achievementConfigs";

interface DetailDialogProps {
  open: boolean;
  onClose: () => void;
  id: string;
  refreshData: () => void;
}

const detailComponentImports: Record<string, () => Promise<{ [key: string]: ComponentType<DetailDialogProps> }>> = {
  ResearchDetailsDialog: () => import("../researchDetailPopUp"),
  ProjectDetailsDialog: () => import("../projectsDetailPopUp"),
  CertificateDetailsDialog: () => import("../certificatesDetailPopUp"),
  SeminarDetailsDialog: () => import("../seminarsDetailPopUp"),
  AchievementDetailsDialog: () => import("../otherAchievementsPopUp"),
};

interface AchievementSectionProps {
  config: AchievementConfig;
}

export const AchievementSection = ({ config }: AchievementSectionProps) => {
  const [reload, setReload] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const refreshData = () => {
    setReload((prev: boolean) => !prev);
  };

  const { loading, details } = useEntries(config.endpoint, reload);

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

  const items = (details as Record<string, ListItem[]>)[config.endpoint] || [];

  if (loading) {
    return <Skeleton type="list" count={2} />;
  }

  const openDetailsDialog = (id: string) => {
    setSelectedId(id);
    handleDetailsOpen();
  };

  const DetailComponent = config.detailComponentName
    ? lazy(async () => {
        const module = await detailComponentImports[config.detailComponentName]();
        return { default: module[config.detailComponentName] };
      })
    : null;

  const handleSubmit = async (formData: Record<string, unknown>) => {
    let typedFormData = { ...formData } as EntryFormDataType;
    if (config.prepareFormData) {
      typedFormData = config.prepareFormData(typedFormData);
    }
    await submitEntry(config.endpoint, typedFormData);
  };

  return (
    <div>
      <ListDisplay
        title={config.title}
        items={items}
        onAdd={handleAddOpen}
        onViewDetails={openDetailsDialog}
      />

      <FormPopUp
        open={addOpen}
        onClose={handleAddClose}
        initialData={{}}
        refreshData={refreshData}
        fields={config.fields}
        onSubmit={handleSubmit}
        title={`Add ${config.title.replace(/s$/, "")}`}
      />

      {selectedId && DetailComponent && (
        <Suspense fallback={<Skeleton type="card" />}>
          <DetailComponent
            open={detailsOpen}
            onClose={() => {
              handleDetailsClose();
              refreshData();
            }}
            id={selectedId}
            refreshData={refreshData}
          />
        </Suspense>
      )}
    </div>
  );
};
