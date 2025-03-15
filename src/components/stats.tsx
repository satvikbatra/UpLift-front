import { DetailsType } from "./rankingGraph"

export const Stats = ({projects, certificates, seminars, researchPapers, otherAchievements}: DetailsType) => {
    const stats = [
        { label: "Projects", value: projects },
        { label: "Certificates", value: certificates },
        { label: "Seminars", value: seminars },
        { label: "Research Papers", value: researchPapers },
        { label: "Other", value: otherAchievements },
    ].filter(stat => stat.value > 0);

    // if(stats.length == 0) return null;

    return (
        <div className="card">
            <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-lg">
                        <div className="text-md font-medium">{stat.label}</div>
                        <div className="text-2xl font-bold">{stat.value}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}