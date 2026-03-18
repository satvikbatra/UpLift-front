import { AchievementSection } from "./achievement/AchievementSection";
import { researchConfig } from "./achievement/achievementConfigs";

export const Research = () => {
  return <AchievementSection config={researchConfig} />;
};
