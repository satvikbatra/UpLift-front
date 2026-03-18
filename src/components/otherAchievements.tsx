import { AchievementSection } from "./achievement/AchievementSection";
import { otherAchievementsConfig } from "./achievement/achievementConfigs";

export const OtherAchievements = () => {
  return <AchievementSection config={otherAchievementsConfig} />;
};
