import { Stats } from "./stats"
import PieChartWithCenterLabel from "./piechart";

export interface DetailsType {
    projects: number,
    certificates: number, 
    seminars: number,
    researchPapers: number,
    otherAchievements: number,
    averageRating?: number
}

export const RankingGraph = ({projects, otherAchievements, researchPapers, seminars, certificates, averageRating}: DetailsType) => {
    const pieData = [
        { id: "Projects", value: projects, label: "Projects" },
        { id: "Certificates", value: certificates, label: "Certificates" },
        { id: "Seminars", value: seminars, label: "Seminars" },
        { id: "Research Papers", value: researchPapers, label: "Research Papers" },
        { id: "Other Achievements", value: otherAchievements, label: "Other" }
    ].filter(item => item.value > 0);    

    return (
        <div className="card flex sm:flex-row flex-col gap-6">
            <div>
                <Stats 
                    projects={projects}
                    otherAchievements={otherAchievements}
                    researchPapers={researchPapers}
                    seminars={seminars}
                    certificates={certificates}
                />
            </div>

            <div className="flex-1 flex justify-center items-center min-w-0">
                <div className="card flex justify-center items-center">
                    <PieChartWithCenterLabel
                        data={pieData}
                        label={averageRating}
                    />
                </div>
            </div>
        </div>
    );
};
