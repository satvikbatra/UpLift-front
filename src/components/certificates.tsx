import { useState } from "react";
import { useDialog, useEntries } from "../hooks";
import { ListDisplay } from "./listDisplay";
import { FormPopUp } from "./formPopUp";
import { EntryFormDataType, submitEntry } from "../hooks/postData";
import { CertificateDetailsDialog } from "./certificatesDetailPopUp";
import { Skeleton } from "./skeleton";

export const Certificates = () => {
  const [reload, setReload] = useState(false);

  const refreshData = () => {
    setReload((prev) => !prev);
  };

  const { loading, details } = useEntries("certificates", reload);

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

  const [selectedCertificateId, setSelectedCertificateId] = useState("");

  if (loading) {
    return <Skeleton type="list" count={2} />;
  }

  const openDetailsDialog = (id: string) => {
    setSelectedCertificateId(id);
    handleDetailsOpen();
  };

  return (
    <div>
      <ListDisplay
        title="Certificates"
        items={details?.certificates || []}
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
              label: "Platform",
              name: "platform",
              type: "text",
              required: true,
            },
            { label: "Field", name: "field", type: "text", required: true },
            {
              label: "Certificate Title",
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
              label: "Verification Link",
              name: "verification_link",
              type: "url",
              required: true,
            },
            { label: "Issue Date", name: "date", type: "date", required: true },
          ]}
          onSubmit={async (formData) => {
            const typedFormData = formData as EntryFormDataType;
            submitEntry("certificates", typedFormData);
          }}
          title={"Add Certificate"}
        />
      }

      {selectedCertificateId && (
        <CertificateDetailsDialog
          open={detailsOpen}
          onClose={() => {
            handleDetailsClose(), refreshData();
          }}
          id={selectedCertificateId}
          refreshData={refreshData}
        />
      )}
    </div>
  );
};
