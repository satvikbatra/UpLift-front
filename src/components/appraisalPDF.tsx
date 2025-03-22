import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import {
  UserDetails,
  ResearchPaperTypes,
  ProjectsTypes,
  CertificatesTypes,
  SeminarsTypes,
  OtherAchievementsTypes,
} from "../hooks";

const styles = StyleSheet.create({
  page: {
    padding: 25,
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 12,
  },
  name: {
    fontSize: 28,
    textAlign: "center",
    color: "#000000",
    fontWeight: "bold",
    marginBottom: 6,
  },
  contactInfo: {
    flexDirection: "row",
    justifyContent: "center",
    fontSize: 9,
    color: "#333333",
    marginBottom: 8,
  },
  contactItem: {
    marginHorizontal: 4,
  },
  contactDivider: {
    marginHorizontal: 4,
  },
  link: {
    color: "#0000EE",
    textDecoration: "underline",
  },
  section: {
    marginBottom: 20,
    // Using break-inside CSS property with valid @react-pdf/renderer style
  },
  sectionTitle: {
    fontSize: 14,
    color: "#000000",
    marginBottom: 4,
    fontWeight: "bold",
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    paddingBottom: 2,
  },
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 2,
    marginTop: 1,
  },
  bullet: {
    width: 8,
    fontSize: 9,
    marginRight: 4,
  },
  bulletContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 1,
  },
  itemSubtitle: {
    fontSize: 9,
    fontStyle: "italic",
    marginBottom: 1,
  },
  itemDate: {
    fontSize: 9,
    color: "#666666",
    textAlign: "right",
  },
  itemDescription: {
    fontSize: 9,
    color: "#333333",
    marginLeft: 12,
    marginBottom: 2,
    lineHeight: 1.2,
  },
  itemDetails: {
    fontSize: 9,
    fontStyle: "italic",
    marginLeft: 12,
    marginBottom: 1,
  },
  footer: {
    position: "absolute",
    bottom: 15,
    left: 0,
    right: 0,
    fontSize: 8,
    textAlign: "center",
    color: "#666666",
  },
});

const AppraisalPDF = ({
  userData,
  researchPapers,
  projects,
  certificates,
  seminars,
  otherAchievements,
}: {
  userData: UserDetails;
  researchPapers: ResearchPaperTypes[];
  projects: ProjectsTypes[];
  certificates: CertificatesTypes[];
  seminars: SeminarsTypes[];
  otherAchievements: OtherAchievementsTypes[];
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header with Name and Contact Info */}
      <View style={styles.header}>
        <Text style={styles.name}>Dr. {userData.full_name || "Full Name"}</Text>
        <Text style={{ fontSize: 10, textAlign: "center", marginBottom: 4 }}>
          {userData.role || "Faculty"} |{" "}
          {userData.department_name || "Department"}
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
            {userData.full_name?.toLowerCase().replace(/\s+/g, "-") ||
              "profile"}
          </Text>
        </View>
      </View>

      {/* Projects Section */}
      <View style={styles.section} wrap={true}>
        <Text style={styles.sectionTitle}>Projects</Text>

        {projects.map((project, index) => (
          <View key={project._id || index} style={{ marginBottom: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 2,
              }}
            >
              <View style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.itemTitle}>
                  {project.title || "Untitled Project"}
                </Text>
              </View>
              <Text style={styles.itemDate}>
                {new Date(project.date || "").toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                }) || "Invalid Date"}
              </Text>
            </View>
            <Text style={styles.itemDetails}>
              Tech Stack: {project.tech_stack?.join(", ") || "N/A"}
            </Text>
            {project.github_link && (
              <Text style={styles.itemDetails}>
                GitHub: {project.github_link}
              </Text>
            )}
            {project.description && (
              <Text style={styles.itemDescription}>{project.description}</Text>
            )}
          </View>
        ))}
      </View>

      {researchPapers.length > 0 && (
        <View style={styles.section} wrap={true}>
          <Text style={styles.sectionTitle}>Research Papers</Text>

          {researchPapers.map((paper, index) => (
            <View key={paper._id || index} style={{ marginBottom: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <View style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.itemTitle}>
                    {paper.title || "Untitled"}
                  </Text>
                </View>
                <Text style={styles.itemDate}>
                  {new Date(paper.date || "").toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  }) || "Invalid Date"}
                </Text>
              </View>
              <Text style={styles.itemDetails}>
                Conference: {paper.conference_name || "N/A"}
              </Text>
              {paper.verification_link && (
                <Text style={styles.itemDetails}>
                  Verification: {paper.verification_link}
                </Text>
              )}
              {paper.description && (
                <Text style={styles.itemDescription}>{paper.description}</Text>
              )}
            </View>
          ))}
        </View>
      )}

      {certificates.length > 0 && (
        <View style={styles.section} wrap={true}>
          <Text style={styles.sectionTitle}>Certificates</Text>

          {certificates.map((certificate, index) => (
            <View key={certificate._id || index} style={{ marginBottom: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <View style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.itemTitle}>
                    {certificate.title || "Untitled"}
                  </Text>
                </View>
                <Text style={styles.itemDate}>
                  {new Date(certificate.date || "").toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "short" }
                  ) || "Invalid Date"}
                </Text>
              </View>
              <Text style={styles.itemDetails}>
                Platform: {certificate.platform || "N/A"} | Field:{" "}
                {certificate.field || "N/A"}
              </Text>
              {certificate.verification_link && (
                <Text style={styles.itemDetails}>
                  Verification: {certificate.verification_link}
                </Text>
              )}
              {certificate.description && (
                <Text style={styles.itemDescription}>
                  {certificate.description}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}

      {seminars.length > 0 && (
        <View style={styles.section} wrap={true}>
          <Text style={styles.sectionTitle}>Seminars</Text>

          {seminars.map((seminar, index) => (
            <View key={seminar._id || index} style={{ marginBottom: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <View style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.itemTitle}>
                    {seminar.title || "Untitled"}
                  </Text>
                </View>
                <Text style={styles.itemDate}>
                  {new Date(seminar.date || "").toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  }) || "Invalid Date"}
                </Text>
              </View>
              <Text style={styles.itemDetails}>
                Role: {seminar.role || "N/A"}{" "}
                {seminar.location ? `| Location: ${seminar.location}` : ""}
              </Text>
              {seminar.description && (
                <Text style={styles.itemDescription}>
                  {seminar.description}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}

      {otherAchievements.length > 0 && (
        <View style={styles.section} wrap={true}>
          <Text style={styles.sectionTitle}>Achievements</Text>

          {otherAchievements.map((achievement, index) => (
            <View key={achievement._id || index} style={{ marginBottom: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <View style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.itemTitle}>
                    {achievement.title || "Untitled"}
                  </Text>
                </View>
                <Text style={styles.itemDate}>
                  {new Date(achievement.date || "").toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "short" }
                  ) || "Invalid Date"}
                </Text>
              </View>
              <Text style={styles.itemDetails}>
                Category: {achievement.category || "General"}
              </Text>
              {achievement.description && (
                <Text style={styles.itemDescription}>
                  {achievement.description}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}
    </Page>
  </Document>
);

export default AppraisalPDF;

// Helper function to create a blob URL from the PDF
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
