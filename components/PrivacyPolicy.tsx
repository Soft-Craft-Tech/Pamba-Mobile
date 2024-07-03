import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const PolicyPage = ({ title, subtitle, sections }: { [key: string]: any }) => {
  return (
    <ScrollView>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {sections?.map((section: any, index: number) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Text style={styles.sectionContent}>{section.content}</Text>
          {section?.bullets && (
            <View style={styles.bulletList}>
              {section?.bullets.map((bullet: any, bulletIndex: any) => (
                <Text key={bulletIndex} style={styles.bullet}>
                  • {bullet}
                </Text>
              ))}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#000000",
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 16,
    fontWeight: "400",
    color: "#323232",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 8,
    color: "#0F1C35",
  },
  sectionContent: {
    fontSize: 12,
    marginBottom: 8,
    color: "#323232",
  },
  bulletList: {
    marginLeft: 16,
  },
  bullet: {
    fontSize: 12,
    marginBottom: 4,
    color: "#323232",
  },
});

export default PolicyPage;
