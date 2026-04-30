import { View, Text } from "@react-pdf/renderer";
import { styles } from "./PDFStyles";

interface PDFSectionProps<T> {
  title: string;
  items: T[];
  renderItemContent: (item: T) => React.ReactNode;
  getTitle?: (item: T) => string;
  getDate?: (item: T) => string | undefined;
  getDescription?: (item: T) => string | undefined;
}

export const PDFSection = <T extends { _id?: string }>({
  title,
  items,
  renderItemContent,
  getTitle = (item: T) => (item as unknown as { title?: string }).title || "Untitled",
  getDate = (item: T) => (item as unknown as { date?: string }).date,
  getDescription = (item: T) => (item as unknown as { description?: string }).description,
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
                {getTitle(item)}
              </Text>
            </View>
            <Text style={styles.itemDate}>
              {getDate(item)
                ? new Date(getDate(item)!).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })
                : "Invalid Date"}
            </Text>
          </View>
          {renderItemContent(item)}
          {getDescription(item) && (
            <Text style={styles.itemDescription}>{getDescription(item)}</Text>
          )}
        </View>
      ))}
    </View>
  );
};
