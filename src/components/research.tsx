import { useState } from "react";
import { useDialog, useResearch } from "../hooks";
import ResponsiveDialog from "./researchPopUp";
import { ResearchDetailsDialog } from "./researchDetailPopUp";

export const Research = () => {
    const [reload, setReload] = useState(false);
    
    const refreshData = () => {
        setReload((prev) => !prev);
    };
    const { loading, details } = useResearch(reload);
    const [showAll, setShowAll] = useState(false);
    
    const { open: addOpen, handleOpen: handleAddOpen, handleClose: handleAddClose } = useDialog();
    const { open: detailsOpen, handleOpen: handleDetailsOpen, handleClose: handleDetailsClose } = useDialog();

    const [selectedPaperId, setSelectedPaperId] = useState('');

    if (loading) {
        return <div className="flex justify-center items-center">Loading...</div>;
    }

    const researchPapers = details?.researchPapers ?? [];
    const visiblePapers = showAll ? researchPapers : researchPapers.slice(0, 2);

    const truncateText = (text: string, wordLimit: number) => {
        const words = text.split(" ");
        return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
    };

    const openDetailsDialog = (id: string) => {
        setSelectedPaperId(id);
        handleDetailsOpen();
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="w-1/2">
                <div className="card font-semibold text-xl flex justify-between">
                    <div>Project</div>
                    <div onClick={handleAddOpen} className="cursor-pointer">+</div>
                </div>
            </div>

            <div className="card flex flex-col gap-6">
                {researchPapers.length > 0 ? (
                    <>
                        {visiblePapers.map((paper) => (
                            <div key={paper._id} className="card flex flex-col gap-6">
                                <div onClick={() => openDetailsDialog(paper._id)} className="w-full flex gap-6 cursor-pointer">
                                    <div className="h-20 w-20 rounded-2xl bg-gray-200 border-2 border-gray-300 hidden md:block"></div>
                                    <div className="w-full rounded-2xl">
                                        <div className="text-lg font-medium">{paper.title}</div>
                                        <div>{truncateText(paper.description, 30)}</div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {researchPapers.length > 2 && (
                            <div className="flex justify-center items-center">
                                <button 
                                    className="button"
                                    onClick={() => setShowAll(!showAll)}
                                >
                                    {showAll ? "Show Less" : "Show More"}
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <p>No research papers found.</p>
                )}
            </div>

            <ResponsiveDialog open={addOpen} onClose={handleAddClose} refreshData={refreshData} />

            {selectedPaperId && (
                <ResearchDetailsDialog open={detailsOpen} onClose={handleDetailsClose} id={selectedPaperId} refreshData={refreshData}/>
            )}
        </div>
    );
};
