import { AppBar } from "../components/appbar";
import BarCh from "../components/barChart";
import { Certificates } from "../components/certificates";
import { OtherAchievements } from "../components/otherAchievements";
import { ProfileCard } from "../components/profilecard";
import { Projects } from "../components/projects";
import { RankingGraph } from "../components/rankingGraph";
import { Research } from "../components/research";
import { Seminars } from "../components/seminars";
import { useDetails } from "../hooks";

export const Dashboard = () => {
  const { loading, details } = useDetails();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  const Data = [
    {
      id: "Projects",
      value: Object.keys(details.projects).length,
      label: "Projects",
      color: "#ff00ff",
    },
    {
      id: "Certificates",
      value: Object.keys(details.certificates).length,
      label: "Certificates",
      color: "#00cccc",
    },
    {
      id: "Seminars",
      value: Object.keys(details.seminars).length,
      label: "Seminars",
      color: "#0000ff",
    },
    {
      id: "Research Papers",
      value: Object.keys(details.researchPapers).length,
      label: "Research Papers",
      color: "#33cc33",
    },
    {
      id: "Other",
      value: Object.keys(details.otherAchievements).length,
      label: "Other",
      color: "#ff3333",
    },
  ].filter((item) => item.value > 0);

  return (
    <div className="relative min-h-screen bg-blue-200 flex-1 flex-col">
      <div className="sticky top-0 z-50 w-full mb-4 bg-white">
        <AppBar />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-6 p-4 w-full">
        <div className="flex flex-col lg:flex-row gap-6 justify-center h-full w-full">
          <div className="">
            <ProfileCard
              name={details?.full_name}
              personal_email={details.personal_email_id}
              organization_email={details.organization_email_id}
              phone_number={details.phone_number}
              department_name={details.department_name}
              role={details.role}
            />
          </div>

          <div className="flex-1 gap-4">
            <RankingGraph stats={Data} averageRating={details.averageRating} />
          </div>
        </div>

        <div className="card">
          <BarCh stats={Data} />
        </div>

        <div className="card">
          <Research />
        </div>
        <div className="card">
          <Projects />
        </div>
        <div className="card">
          <Certificates />
        </div>
        <div className="card">
          <Seminars />
        </div>
        <div className="card">
          <OtherAchievements />
        </div>
      </div>
    </div>
  );
};
