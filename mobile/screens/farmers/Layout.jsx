import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

// Updated color palette to match FarmersDashboard and ForumsScreen
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

const Footer = ({ navigation }) => {
  const route = useRoute();
  const [activeTab, setActiveTab] = useState('FarmersDashboard');

  useEffect(() => {
    setActiveTab(route.name);
  }, [route]);

  const isActive = (tabName) => activeTab === tabName;

  return (
    <View style={styles.footer}>
      {[
        { name: 'FarmersDashboard', icon: 'home-outline', label: 'Dashboard' },
        { name: 'FarmersForum', icon: 'chatbox-outline', label: 'Forum' },
        { name: 'Notifications', icon: 'notifications-outline', label: 'Notifications' },
        { name: 'FarmerResources', icon: 'file-tray-outline', label: 'Resources' },
      ].map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.footerItem}
          onPress={() => navigation.navigate(tab.name)}
        >
          <View style={[styles.iconContainer, isActive(tab.name) && styles.activeIconContainer]}>
            <Icon
              name={tab.icon}
              size={22}
              color={isActive(tab.name) ? COLORS.primary : COLORS.textSecondary}
            />
          </View>
          <Text style={[styles.footerText, isActive(tab.name) && styles.activeText]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const Layout = ({ children = null, navigation = {} }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingBottom: 80, // Adjusted to match footer height
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.textSecondary,
    elevation: 4,
  },
  footerItem: {
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    backgroundColor: COLORS.cardBg,
  },
  activeIconContainer: {
    backgroundColor: COLORS.secondary,
  },
  footerText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  activeText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default Layout;