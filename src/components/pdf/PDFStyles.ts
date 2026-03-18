import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
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
  itemContainer: {
    marginBottom: 10,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  roleText: {
    fontSize: 10,
    textAlign: "center",
    marginBottom: 4,
  },
});
