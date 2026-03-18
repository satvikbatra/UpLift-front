import { View, Text } from "@react-pdf/renderer";
import { styles } from "./PDFStyles";

interface PDFItem {
  _id?: string;
  title?: string;
  date?: string;
  description?: string;
  [key: string]: unknown;
}

interface PDFSectionProps<T extends PDFItem> {
  title: string;
  items: T[];
  renderItemContent: (item: T) => React.ReactNode;
}

export const PDFSection = <T extends PDFItem>({
  title,
  items,
  renderItemContent,
}: PDFSectionProps<T>) => {
  if (items.length === 0) return null;

  return (
    <View style={styles.section} wrap={true}>
      <Text style={styles.sectionTitle}>{title}</Text>

      {items.map((item, index) => (
        <View key={item._id || index} style={styles.itemContainer}>
          <View style={styles.itemHeader}>
            <View style={styles.bulletPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.itemTitle}>
                {item.title || "Untitled"}
              </Text>
            </View>
            <Text style={styles.itemDate}>
              {item.date
                ? new Date(item.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })
                : "Invalid Date"}
            </Text>
          </View>
          {renderItemContent(item)}
          {item.description && (
            <Text style={styles.itemDescription}>{item.description}</Text>
          )}
        </View>
      ))}
    </View>
  );
};
