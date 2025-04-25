import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
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

const Leaderboard = () => {
  const navigation = useNavigation();

  const handleIconPress = (screenName) => {
    navigation.navigate(screenName);
  };

  const leaderboardData = [
    {
      id: '1',
      rank: 1,
      name: 'Restaurant A',
      image: require('../../assets/17.png'),
      meals: 500,
      score: 100,
    },
    {
      id: '2',
      rank: 2,
      name: 'Restaurant B',
      image: require('../../assets/18.png'),
      meals: 450,
      score: 92,
    },
    {
      id: '3',
      rank: 3,
      name: 'Restaurant C',
      image: require('../../assets/19.png'),
      meals: 400,
      score: 81,
    },
    {
      id: '4',
      rank: 4,
      name: 'Your Restaurant',
      image: require('../../assets/20.png'),
      meals: 350,
      score: 70,
    },
    {
      id: '5',
      rank: 5,
      name: 'Restaurant D',
      image: require('../../assets/17.png'),
      meals: 300,
      score: 60,
    },
    {
      id: '6',
      rank: 6,
      name: 'Restaurant E',
      image: require('../../assets/18.png'),
      meals: 280,
      score: 58,
    },
    {
      id: '7',
      rank: 7,
      name: 'Restaurant F',
      image: require('../../assets/19.png'),
      meals: 260,
      score: 55,
    },
    {
      id: '8',
      rank: 8,
      name: 'Restaurant G',
      image: require('../../assets/20.png'),
      meals: 240,
      score: 52,
    },
    {
      id: '9',
      rank: 9,
      name: 'Restaurant H',
      image: require('../../assets/17.png'),
      meals: 220,
      score: 50,
    },
    {
      id: '10',
      rank: 10,
      name: 'Restaurant I',
      image: require('../../assets/18.png'),
      meals: 200,
      score: 47,
    },
    {
      id: '11',
      rank: 11,
      name: 'Restaurant J',
      image: require('../../assets/19.png'),
      meals: 180,
      score: 43,
    },
    {
      id: '12',
      rank: 12,
      name: 'Restaurant K',
      image: require('../../assets/20.png'),
      meals: 160,
      score: 40,
    },
  ];

  return (
    <Layout navigation={navigation}>
      <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Leaderboard</Text> 
          {/*<TouchableOpacity onPress={() => handleIconPress('Notification')}>
            <Icon name="bell" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>*/}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Restaurant Rankings</Text>
          {leaderboardData.map((restaurant, index) => (
            <View key={restaurant.id}>
              {index > 0 && <View style={styles.separator} />}
              <View
                style={[
                  styles.restaurantItem,
                  restaurant.name === 'Your Restaurant' && styles.yourRestaurantBackground,
                ]}
              >
                <Text style={styles.rank}>{restaurant.rank}</Text>
                <Image source={restaurant.image} style={styles.image} />
                <View style={styles.restaurantInfo}>
                  <Text style={styles.restaurantName}>{restaurant.name}</Text>
                  <Text style={styles.meals}>{restaurant.meals} meals donated</Text>
                </View>
                <Text style={styles.mealsCount}>{restaurant.meals}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: COLORS.background,
    padding: 16,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    padding: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  restaurantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    justifyContent: 'space-between',
  },
  rank: {
    width: 30,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 12,
  },
  restaurantInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    flexWrap: 'wrap',
  },
  meals: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  mealsCount: {
    width: 70,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.accent,
    textAlign: 'right',
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: COLORS.textSecondary,
    marginVertical: 8,
  },
  yourRestaurantBackground: {
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});

export default Leaderboard;