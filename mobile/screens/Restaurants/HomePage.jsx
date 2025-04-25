import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import Layout from './Layout';
import { Language } from '../../components/language';

// Updated color palette to match other screens
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

const HomePage = () => {
  const navigation = useNavigation();

  const handleDonationPress = () => {
    navigation.navigate('RestaurantsDashboard'); // Replace with actual navigation
  };

  return (
    <Layout navigation={navigation}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>


        {/* Hero Section */}
        <ImageBackground
          source={require('../../assets/106.png')}
          style={styles.heroSection}
          imageStyle={styles.heroImage}
        >
          <Text style={styles.heroText}>
            Make a Difference: Donate Food, Change Lives
          </Text>
          <TouchableOpacity
            style={styles.callToActionButton}
            onPress={handleDonationPress}
          >
            <Text style={styles.callToActionButtonText}>
              Join the Movement
            </Text>
          </TouchableOpacity>
        </ImageBackground>

        {/* Impact Section */}
        <View style={styles.impactSection}>
          <Text style={styles.impactTitle}>Impact So Far</Text>
          <Text style={styles.impactText}>
            Over 500,000 meals donated, and counting! Together, we are feeding
            those in need and making a real difference in the lives of thousands
            of people.
          </Text>
          <View style={styles.impactHighlight}>
            <FontAwesome5 name="hand-holding-heart" size={24} color={COLORS.primary} />
            <Text style={styles.impactHighlightText}>
              Join 1000+ Restaurants Making an Impact
            </Text>
          </View>
        </View>

        {/* Testimonial Section */}
        <View style={styles.testimonialSection}>
          <Text style={styles.testimonialText}>
            "By donating our unsold meals, we have not only reduced food waste,
            but also brought smiles to countless people in need. It’s been one of
            the most fulfilling things we’ve done as a restaurant!"
          </Text>
          <Text style={styles.testimonialAuthor}>
            – John, Owner of The Green Bistro
          </Text>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  heroSection: {
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    elevation: 4,
  },
  heroImage: {
    resizeMode: 'cover',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  heroText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 36,
  },
  callToActionButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
  },
  callToActionButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  impactSection: {
    padding: 20,
    backgroundColor: COLORS.cardBg,
    marginTop: -20,
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    alignItems: 'center',
  },
  impactTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  impactText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  impactHighlight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  impactHighlightText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  testimonialSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 16,
    borderRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
  },
  testimonialText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 22,
  },
  testimonialAuthor: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: COLORS.accent,
  },
});

export default HomePage;