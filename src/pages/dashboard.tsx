import { AppBar } from "../components/appbar";
import BarCh from "../components/barChart";
import { Certificates } from "../components/certificates";
import { DashboardSections } from "../components/dashboardSections";
import { OtherAchievements } from "../components/otherAchievements";
import { ProfileCard } from "../components/profilecard";
import { Projects } from "../components/projects";
import { RankingGraph } from "../components/rankingGraph";
import { Research } from "../components/research";
import { Seminars } from "../components/seminars";
import { Skeleton } from "../components/skeleton";
import { useDetails } from "../hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AppraisalNotifications } from "../components/appraisalNotification";

export const Dashboard = () => {
  const { loading, details } = useDetails();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && details?.is_admin) {
      navigate("/admin");
    }
  }, [loading, details, navigate]);

  if (loading) {
    return (
      <div className="relative min-h-screen bg-blue-200 flex-1 flex-col">
        <div className="sticky top-0 z-50 w-full mb-4 bg-white flex items-center">
          <AppBar />
        </div>

        <div className="max-w-6xl mx-auto flex flex-col gap-6 p-4 w-full">
          <div className="card flex flex-col lg:flex-row gap-6 justify-center h-full w-full">
            <div className="flex-1 gap-4">
              <Skeleton type="card" />
            </div>
            <div className="flex-1 gap-4">
              <Skeleton type="card" />
            </div>
          </div>

          <div className="card">
            <Skeleton type="card" />
          </div>

          <div className="flex flex-col gap-6">
            <Skeleton type="list" count={5} />
          </div>
        </div>
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
      <div className="sticky top-0 z-50 w-full mb-4 bg-white flex items-center">
        <AppBar />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-6 p-4 w-full">
        <AppraisalNotifications />
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

        <DashboardSections
          sections={[
            { id: "research", component: <Research /> },
            { id: "projects", component: <Projects /> },
            { id: "certificates", component: <Certificates /> },
            { id: "seminars", component: <Seminars /> },
            { id: "other", component: <OtherAchievements /> },
          ]}
        />
      </div>
    </div>
  );
};
