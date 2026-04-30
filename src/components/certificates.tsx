import { AchievementSection } from "./achievement/AchievementSection";
import { certificatesConfig } from "./achievement/achievementConfigs";

export const Certificates = () => {
  return <AchievementSection config={certificatesConfig} />;
};
