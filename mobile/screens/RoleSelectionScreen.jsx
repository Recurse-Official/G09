// screens/RoleSelectionScreen.js

import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

// Color palette
const COLORS = {
  primary: '#1A365D',    // Deep blue
  secondary: '#4A5568',  // Warm gray
  accent: '#ED8936',     // Vibrant orange
  white: '#FFFFFF',
  lightGray: '#F7FAFC',
  error: '#E53E3E',
  success: '#38A169',
};

const roles = [
  {
    id: 'restaurants',
    title: 'Restaurants',
    icon: 'restaurant',
    description: 'Donate excess food and reduce waste',
    color: COLORS.primary,
    gradient: [COLORS.primary, COLORS.secondary],
  },
  {
    id: 'volunteer',
    title: 'Volunteer',
    icon: 'heart',
    description: 'Help in food collection and distribution',
    color: COLORS.accent,
    gradient: [COLORS.accent, COLORS.primary],
  },
  {
    id: 'organizations',
    title: 'Old Age/Orphanage Homes',
    icon: 'home',
    description: 'Receive food donations for your residents',
    color: COLORS.secondary,
    gradient: [COLORS.secondary, COLORS.primary],
  },
  {
    id: 'farmers',
    title: 'Farmers',
    icon: 'leaf',
    description: 'Donate surplus produce to those in need',
    color: COLORS.primary,
    gradient: [COLORS.primary, COLORS.accent],
  },
];

const RoleSelectionScreen = () => {
  const navigation = useNavigation();

  // Animation values
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);
  const scaleAnim = new Animated.Value(0.9);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleRoleSelect = (role) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    switch (role.id) {
      case 'restaurants':
        navigation.navigate('HomePage');
        break;
      case 'volunteer':
        navigation.navigate('VolunteerDashboard');
        break;
      case 'organizations':
        navigation.navigate('Oldage');
        break;
      case 'farmers':
        navigation.navigate('FarmersDashboard');
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={styles.background}
      />
      
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { scale: scaleAnim }
            ]
          }
        ]}
      >
        <View style={styles.header}>
          <Ionicons name="people" size={40} color={COLORS.white} />
          <Text style={styles.title}>Choose Your Role</Text>
          <Text style={styles.subtitle}>Select the role that best describes you</Text>
        </View>

        <ScrollView 
          style={styles.rolesContainer}
          showsVerticalScrollIndicator={false}
        >
          {roles.map((role, index) => (
            <Animated.View
              key={role.id}
              style={[
                styles.roleCardContainer,
                {
                  opacity: fadeAnim,
                  transform: [
                    { translateY: slideAnim },
                    { scale: scaleAnim }
                  ],
                  animationDelay: index * 100,
                }
              ]}
            >
              <TouchableOpacity
                style={styles.roleCard}
                onPress={() => handleRoleSelect(role)}
              >
                <LinearGradient
                  colors={role.gradient}
                  style={styles.roleCardGradient}
                >
                  <View style={styles.roleIconContainer}>
                    <Ionicons name={role.icon} size={30} color={COLORS.white} />
                  </View>
                  <View style={styles.roleContent}>
                    <Text style={styles.roleTitle}>{role.title}</Text>
                    <Text style={styles.roleDescription}>{role.description}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={24} color={COLORS.white} />
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop: 15,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.white,
    opacity: 0.8,
    textAlign: 'center',
  },
  rolesContainer: {
    flex: 1,
  },
  roleCardContainer: {
    marginBottom: 15,
  },
  roleCard: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  roleCardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  roleIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  roleContent: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 5,
  },
  roleDescription: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
  },
});

export default RoleSelectionScreen;
