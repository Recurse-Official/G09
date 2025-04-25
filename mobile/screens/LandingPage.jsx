import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// Updated color palette
const COLORS = {
  background: '#F9FAFB',  // Soft gray background
  primary: '#10B981',     // Vibrant green (aligned with previous components)
  secondary: '#34D399',   // Lighter green
  accent: '#F59E0B',      // Warm yellow
  text: '#1F2A44',        // Dark gray for text
  white: '#FFFFFF',
  lightGray: '#E5E7EB',
  darkOverlay: 'rgba(17, 24, 39, 0.7)',
};

const LandingPage = () => {
  const navigation = useNavigation();
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);
  const cardAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.stagger(200, [
        Animated.timing(cardAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View
        style={[
          styles.heroSection,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <ImageBackground
          source={require('../assets/0.png')}
          style={styles.imageBackground}
          imageStyle={styles.image}
        >
          <LinearGradient
            colors={[COLORS.darkOverlay, COLORS.darkOverlay]}
            style={styles.overlay}
          >
            <Image style={styles.logo} source={require('../assets/wText.png')} />
            <Text style={styles.heroTitle}>Bridging Communities</Text>
            <Text style={styles.heroSubtitle}>Empowering Food Rescue</Text>
          </LinearGradient>
        </ImageBackground>
      </Animated.View>

      <Animated.View
        style={[
          styles.buttonSection,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <Text style={styles.sectionTitle}>Choose Your Role</Text>
        <View style={styles.buttonContainer}>
          {[
            { name: 'Restaurant', icon: 'cutlery', route: 'HomePage' },
            { name: 'Volunteer', icon: 'heart', route: 'VolunteerDashboard' },
            { name: 'Oldage Home', icon: 'building', route: 'Oldage' },
            { name: 'Farmer', icon: 'leaf', route: 'FarmersDashboard' },
          ].map((role, index) => (
            <Animated.View
              key={role.name}
              style={{ opacity: cardAnim, transform: [{ translateY: cardAnim.interpolate({ inputRange: [0, 1], outputRange: [50, 0] }) }] }}
            >
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate(role.route)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[COLORS.primary, COLORS.secondary]}
                  style={styles.buttonGradient}
                >
                  <Icon name={role.icon} size={20} color={COLORS.white} style={styles.buttonIcon} />
                  <Text style={styles.buttonText}>{`I am a ${role.name}`}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.donateButton, { backgroundColor: COLORS.accent }]}
          onPress={() => alert('Donate Now pressed')}
          activeOpacity={0.8}
        >
          <View style={styles.donateButtonContent}>
            <Icon name="gift" size={20} color={COLORS.white} style={styles.buttonIcon} />
            <Text style={styles.donateButtonText}>Donate Now</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.featureScroll}
          contentContainerStyle={styles.featureScrollContent}
        >
          {[
            { title: 'Restaurants', image: require('../assets/1.png'), icon: 'cutlery' },
            { title: 'NGOs', image: require('../assets/3.png'), icon: 'building' },
            { title: 'Volunteers', image: require('../assets/4.png'), icon: 'heart' },
            { title: 'Organizations', image: require('../assets/5.png'), icon: 'users' },
          ].map((feature, index) => (
            <Animated.View
              key={feature.title}
              style={{ opacity: cardAnim, transform: [{ translateY: cardAnim.interpolate({ inputRange: [0, 1], outputRange: [50, 0] }) }] }}
            >
              <FeatureCard title={feature.title} imageUrl={feature.image} icon={feature.icon} />
            </Animated.View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Impact</Text>
        <View style={styles.metricsContainer}>
          {[
            { icon: 'coffee', label: 'Meals Donated', value: '500,000' },
            { icon: 'recycle', label: 'Food Saved', value: '12,000 kg' },
            { icon: 'users', label: 'Volunteers', value: '1,500' },
            { icon: 'home', label: 'NGOs', value: '200' },
          ].map((metric, index) => (
            <Animated.View
              key={metric.label}
              style={{ opacity: cardAnim, transform: [{ translateY: cardAnim.interpolate({ inputRange: [0, 1], outputRange: [50, 0] }) }] }}
            >
              <MetricCard icon={metric.icon} label={metric.label} value={metric.value} />
            </Animated.View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Leaderboard</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.leaderboardScroll}
          contentContainerStyle={styles.leaderboardScrollContent}
        >
          {[
            { title: 'Top Restaurants', content: 'Meals Donated', image: require('../assets/10.png') },
            { title: 'Top Volunteers', content: 'Hours Contributed', image: require('../assets/11.png') },
            { title: 'Top NGOs', content: 'Meals Distributed', image: require('../assets/12.png') },
          ].map((leader, index) => (
            <Animated.View
              key={leader.title}
              style={{ opacity: cardAnim, transform: [{ translateY: cardAnim.interpolate({ inputRange: [0, 1], outputRange: [50, 0] }) }] }}
            >
              <LeaderboardCard title={leader.title} content={leader.content} imageUrl={leader.image} />
            </Animated.View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Testimonials</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.testimonialsScroll}
          contentContainerStyle={styles.testimonialsScrollContent}
        >
          {[
            { content: 'John Doe', subContent: 'Restaurant Owner', image: require('../assets/13.png') },
            { content: 'Jane Smith', subContent: 'Volunteer', image: require('../assets/14.png') },
            { content: 'NGO Team', subContent: 'NGO Representative', image: require('../assets/15.png') },
          ].map((testimonial, index) => (
            <Animated.View
              key={testimonial.content}
              style={{ opacity: cardAnim, transform: [{ translateY: cardAnim.interpolate({ inputRange: [0, 1], outputRange: [50, 0] }) }] }}
            >
              <TestimonialCard
                content={testimonial.content}
                subContent={testimonial.subContent}
                imageUrl={testimonial.image}
              />
            </Animated.View>
          ))}
        </ScrollView>
      </View>

      <Text style={styles.footerText}>© 2025 Motiff AI. All rights reserved.</Text>
    </ScrollView>
  );
};

const FeatureCard = ({ title, imageUrl, icon }) => (
  <TouchableOpacity style={styles.featureCard} activeOpacity={0.8}>
    <Image source={imageUrl} style={styles.featureImage} />
    <View style={styles.featureContent}>
      <Icon name={icon} size={24} color={COLORS.primary} style={styles.featureIcon} />
      <Text style={styles.featureTitle}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const MetricCard = ({ icon, label, value }) => (
  <TouchableOpacity style={styles.metricCard} activeOpacity={0.8}>
    <Icon name={icon} size={28} color={COLORS.primary} style={styles.metricIcon} />
    <Text style={styles.metricValue}>{value}</Text>
    <Text style={styles.metricLabel}>{label}</Text>
  </TouchableOpacity>
);

const LeaderboardCard = ({ title, content, imageUrl }) => (
  <TouchableOpacity style={styles.leaderboardCard} activeOpacity={0.8}>
    <Image source={imageUrl} style={styles.leaderboardImage} />
    <View style={styles.leaderboardContent}>
      <Text style={styles.leaderboardTitle}>{title}</Text>
      <Text style={styles.leaderboardText}>{content}</Text>
    </View>
  </TouchableOpacity>
);

const TestimonialCard = ({ content, subContent, imageUrl }) => (
  <TouchableOpacity style={styles.testimonialCard} activeOpacity={0.8}>
    <Image source={imageUrl} style={styles.testimonialImage} />
    <View style={styles.testimonialContent}>
      <Text style={styles.testimonialText}>{content}</Text>
      <Text style={styles.testimonialSubText}>{subContent}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  heroSection: {
    height: 420,
    width: '100%',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
  },
  image: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logo: {
    width: 220,
    height: 110,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 20,
    color: COLORS.white,
    textAlign: 'center',
    fontWeight: '500',
  },
  buttonSection: {
    padding: 24,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 16,
    alignItems: 'center',
  },
  button: {
    width: width * 0.9,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
  },
  buttonIcon: {
    marginRight: 12,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  donateButton: {
    width: width * 0.9,
    marginTop: 24,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignSelf: 'center',
  },
  donateButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
  },
  donateButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  section: {
    padding: 24,
  },
  featureScroll: {
    marginTop: 12,
  },
  featureScrollContent: {
    paddingHorizontal: 12,
  },
  featureCard: {
    width: 200,
    height: 280,
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 8,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  featureContent: {
    padding: 16,
    alignItems: 'center',
  },
  featureIcon: {
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  metricCard: {
    width: (width - 64) / 2,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricIcon: {
    marginBottom: 12,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 14,
    color: COLORS.text,
    textAlign: 'center',
    fontWeight: '600',
  },
  leaderboardScroll: {
    marginTop: 12,
  },
  leaderboardScrollContent: {
    paddingHorizontal: 12,
  },
  leaderboardCard: {
    width: 220,
    height: 240,
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 8,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  leaderboardImage: {
    width: '100%',
    height: 130,
    resizeMode: 'cover',
  },
  leaderboardContent: {
    padding: 16,
  },
  leaderboardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  leaderboardText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  testimonialsScroll: {
    marginTop: 12,
  },
  testimonialsScrollContent: {
    paddingHorizontal: 12,
  },
  testimonialCard: {
    width: 220,
    height: 240,
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 8,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  testimonialImage: {
    width: '100%',
    height: 130,
    resizeMode: 'cover',
  },
  testimonialContent: {
    padding: 16,
  },
  testimonialText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  testimonialSubText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  footerText: {
    textAlign: 'center',
    color: COLORS.text,
    padding: 24,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default LandingPage;