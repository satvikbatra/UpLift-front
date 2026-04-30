import { AchievementSection } from "./achievement/AchievementSection";
import { projectsConfig } from "./achievement/achievementConfigs";

export const Projects = () => {
  return <AchievementSection config={projectsConfig} />;
};
