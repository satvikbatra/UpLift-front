import {
  Document,
  Page,
  Text,
  View,
  pdf,
} from "@react-pdf/renderer";
import {
  UserDetails,
  ResearchPaperTypes,
  ProjectsTypes,
  CertificatesTypes,
  SeminarsTypes,
  OtherAchievementsTypes,
} from "../types";
import { styles } from "./pdf/PDFStyles";
import { PDFSection } from "./pdf/PDFSection";

interface AppraisalPDFProps {
  userData: UserDetails;
  researchPapers: ResearchPaperTypes[];
  projects: ProjectsTypes[];
  certificates: CertificatesTypes[];
  seminars: SeminarsTypes[];
  otherAchievements: OtherAchievementsTypes[];
}

const Header = ({ userData }: { userData: UserDetails }) => (
  <View style={styles.header}>
    <Text style={styles.name}>Dr. {userData.full_name || "Full Name"}</Text>
    <Text style={styles.roleText}>
      {userData.role || "Faculty"} | {userData.department_name || "Department"}
    </Text>
    <View style={styles.contactInfo}>
      <Text style={styles.contactItem}>
        {userData.phone_number || "9988447766"}
      </Text>
      <Text style={styles.contactDivider}>|</Text>
      <Text style={styles.contactItem}>
        {userData.personal_email_id ||
          userData.organization_email_id ||
          "email@example.com"}
      </Text>
      <Text style={styles.contactDivider}>|</Text>
      <Text style={styles.contactItem}>
        linkedin.com/in/
        {userData.full_name?.toLowerCase().replace(/\s+/g, "-") || "profile"}
      </Text>
    </View>
  </View>
);

const ProjectItemContent = ({ item }: { item: ProjectsTypes }) => (
  <>
    <Text style={styles.itemDetails}>
      Tech Stack: {item.tech_stack?.join(", ") || "N/A"}
    </Text>
    {item.github_link && (
      <Text style={styles.itemDetails}>GitHub: {item.github_link}</Text>
    )}
  </>
);

const ResearchPaperItemContent = ({ item }: { item: ResearchPaperTypes }) => (
  <>
    <Text style={styles.itemDetails}>
      Conference: {item.conference_name || "N/A"}
    </Text>
    {item.verification_link && (
      <Text style={styles.itemDetails}>
        Verification: {item.verification_link}
      </Text>
    )}
  </>
);

const CertificateItemContent = ({ item }: { item: CertificatesTypes }) => (
  <>
    <Text style={styles.itemDetails}>
      Platform: {item.platform || "N/A"} | Field: {item.field || "N/A"}
    </Text>
    {item.verification_link && (
      <Text style={styles.itemDetails}>
        Verification: {item.verification_link}
      </Text>
    )}
  </>
);

const SeminarItemContent = ({ item }: { item: SeminarsTypes }) => (
  <Text style={styles.itemDetails}>
    Role: {item.role || "N/A"} {item.location ? `| Location: ${item.location}` : ""}
  </Text>
);

const AchievementItemContent = ({ item }: { item: OtherAchievementsTypes }) => (
  <Text style={styles.itemDetails}>
    Category: {item.category || "General"}
  </Text>
);

const AppraisalPDF = ({
  userData,
  researchPapers,
  projects,
  certificates,
  seminars,
  otherAchievements,
}: AppraisalPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Header userData={userData} />

      <PDFSection
        title="Projects"
        items={projects}
        renderItemContent={(item) => <ProjectItemContent item={item} />}
      />

      <PDFSection
        title="Research Papers"
        items={researchPapers}
        renderItemContent={(item) => <ResearchPaperItemContent item={item} />}
      />

      <PDFSection
        title="Certificates"
        items={certificates}
        renderItemContent={(item) => <CertificateItemContent item={item} />}
      />

      <PDFSection
        title="Seminars"
        items={seminars}
        renderItemContent={(item) => <SeminarItemContent item={item} />}
      />

      <PDFSection
        title="Achievements"
        items={otherAchievements}
        renderItemContent={(item) => <AchievementItemContent item={item} />}
      />
    </Page>
  </Document>
);

export default AppraisalPDF;

export const createPDF = async (
  userData: UserDetails,
  researchPapers: ResearchPaperTypes[],
  projects: ProjectsTypes[],
  certificates: CertificatesTypes[],
  seminars: SeminarsTypes[],
  otherAchievements: OtherAchievementsTypes[]
): Promise<string> => {
  const blob = await pdf(
    <AppraisalPDF
      userData={userData}
      researchPapers={researchPapers}
      projects={projects}
      certificates={certificates}
      seminars={seminars}
      otherAchievements={otherAchievements}
    />
  ).toBlob();

  return URL.createObjectURL(blob);
};
