import { AppBar } from "../components/appbar";
import { ProfileCard } from "../components/profilecard";
import { RankingGraph } from "../components/rankingGraph";
import { useDetails } from "../hooks";

export const Dashboard = () => {
    const { loading, details } = useDetails();

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-blue-200 flex flex-col">
            <div className="mb-4 bg-white">
                <AppBar />
            </div>

            <div className="flex flex-col lg:flex-row gap-6 justify-center h-full p-4">
                <div>
                    <ProfileCard
                        name={details?.full_name}
                        personal_email={details.personal_email_id}
                        organization_email={details.organization_email_id}
                        phone_number={details.phone_number}
                        department_name={details.department_name}
                        role={details.role}
                    />
                </div>

                <div className="gap-4">
                    <RankingGraph 
                        projects={Object.keys(details.projects).length}
                        otherAchievements={Object.keys(details.otherAchievements).length}
                        certificates={Object.keys(details.certificates).length}
                        seminars={Object.keys(details.seminars).length}
                        researchPapers={Object.keys(details.researchPapers).length}
                        averageRating={details.averageRating}
                    />
                </div>
            </div>

        </div>
    );
};
