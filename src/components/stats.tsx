import { DetailsType } from "./rankingGraph"

export const Stats = ({projects, certificates, seminars, researchPapers, otherAchievements}: DetailsType) => {
    const colorMap: Record<string, string> = {
        "Projects": "#ff00ff",
        "Certificates": "#00cccc",
        "Seminars": "#0000ff",
        "Research Papers": "#33cc33",
        "Other": "#ff3333"
    };
    
    const stats = [
        { label: "Projects", value: projects, color: colorMap["Projects"] },
        { label: "Certificates", value: certificates, color: colorMap["Certificates"] },
        { label: "Seminars", value: seminars, color: colorMap["Seminars"] },
        { label: "Research Papers", value: researchPapers, color: colorMap["Research Papers"] },
        { label: "Other", value: otherAchievements, color: colorMap["Other"] },
    ].filter(stat => stat.value > 0);

    if(stats.length == 0) return null;

    return (
        <div className="card">
            <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-xl shadow-sm flex flex-col">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium mr-2">{stat.label}</span>
                            <span
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: stat.color }}
                            ></span>
                        </div>
    
                        <div className="text-xl font-bold mt-1">{stat.value}</div>
                    </div>
                ))}
            </div>
        </div>
    );    
}