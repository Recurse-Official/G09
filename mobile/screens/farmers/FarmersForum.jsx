import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// Updated color palette for a modern look
const COLORS = {
  background: '#F9FAFB',   // Soft gray-white background
  primary: '#10B981',     // Vibrant green for primary actions
  secondary: '#6EE7B7',   // Lighter green for gradients
  accent: '#F59E0B',      // Warm yellow for highlights
  textPrimary: '#1F2937', // Dark gray for primary text
  textSecondary: '#6B7280', // Lighter gray for secondary text
  white: '#FFFFFF',
  cardBg: '#FFFFFF',
  error: '#EF4444',
  success: '#10B981',
  darkOverlay: 'rgba(17, 24, 39, 0.6)',
};

// ForumItem Component
const ForumItem = ({ forum }) => {
  return (
    <TouchableOpacity style={styles.forumItem}>
      <View style={styles.forumImageContainer}>
        <Image
          source={require("../../assets/119.png")}
          style={styles.forumImage}
        />
        <View style={styles.forumOverlay}>
          <Ionicons name="people" size={20} color={COLORS.white} />
        </View>
      </View>
      <Text style={styles.forumTitle}>{forum.title}</Text>
    </TouchableOpacity>
  );
};

const ForumsScreen = () => {
  const forums = [
    { id: 1, title: "Forum 1" },
    { id: 2, title: "Forum 2" },
    { id: 3, title: "Forum 3" },
    { id: 4, title: "Forum 4" },
    { id: 5, title: "Forum 5" },
    { id: 6, title: "Forum 6" },
  ];

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.collaborationsContainer}>
          <Text style={styles.sectionTitle}>Collaborations</Text>
          <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.card}>
              <Ionicons name="restaurant" size={28} color={COLORS.primary} />
              <Text style={styles.cardTitle}>Food Bank</Text>
              <Text style={styles.cardSubtitle}>Connect with local food banks</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
              <Ionicons name="people" size={28} color={COLORS.primary} />
              <Text style={styles.cardTitle}>Community</Text>
              <Text style={styles.cardSubtitle}>Join community initiatives</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.supportButton}>
            <Ionicons name="cash" size={20} color={COLORS.white} style={styles.buttonIcon} />
            <Text style={styles.supportButtonText}>
              Request Financial Support
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.forumsContainer}>
          <Text style={styles.sectionTitle}>Farmer Forums</Text>
          <View style={styles.forumsGrid}>
            {forums.map((forum) => (
              <ForumItem key={forum.id} forum={forum} />
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.volunteerButton}>
          <Ionicons name="call" size={20} color={COLORS.white} style={styles.buttonIcon} />
          <Text style={styles.volunteerButtonText}>
            Call Assigned Volunteer
          </Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          {[
            { icon: "help-circle", text: "FAQs" },
            { icon: "document-text", text: "Tax Benefits Guide" },
            { icon: "mail", text: "Contact Support" },
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.footerItem}>
              <Ionicons name={item.icon} size={18} color={COLORS.primary} />
              <Text style={styles.footerLink}>{item.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  collaborationsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 12,
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    elevation: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginTop: 8,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  supportButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  buttonIcon: {
    marginRight: 8,
  },
  supportButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
  forumsContainer: {
    padding: 16,
  },
  forumsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  forumItem: {
    width: "48%",
    marginBottom: 16,
  },
  forumImageContainer: {
    position: "relative",
    marginBottom: 8,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
  },
  forumImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 12,
  },
  forumOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.darkOverlay,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  forumTitle: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  volunteerButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    margin: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  volunteerButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    padding: 16,
    backgroundColor: COLORS.white,
    gap: 12,
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    elevation: 4,
  },
  footerLink: {
    color: COLORS.textPrimary,
    fontSize: 14,
    marginLeft: 8,
    fontWeight: "500",
  },
});

export default ForumsScreen;