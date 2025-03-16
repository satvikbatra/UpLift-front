import { Stats } from "./stats";
import PieChartWithCenterLabel from "./piechart";

export interface DetailsType {
  projects: number;
  certificates: number;
  seminars: number;
  researchPapers: number;
  otherAchievements: number;
  averageRating?: number;
}

export const RankingGraph = ({
  stats = [],
  averageRating,
}: {
  stats: { id: string; value: number; color: string }[];
  averageRating: number;
}) => {
  return (
    <div className="card flex flex-col sm:flex-row gap-6">
      <div className="w-full sm:w-1/2">
        <Stats stats={stats} />
      </div>

      <div className="w-full sm:w-1/2 flex justify-center items-center">
        <div className="card w-full flex justify-center items-center">
          <PieChartWithCenterLabel stats={stats} label={averageRating} />
        </div>
      </div>
    </div>
  );
};