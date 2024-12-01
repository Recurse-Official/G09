import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Layout from './Layout';

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F6F8F9',
    padding: 12,
    flex: 1,
  },
  burger: {
    alignItems: 'center',
    gap: 10,
    flexDirection: 'row',
  },
  smallFont: {
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  restaurantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',  // Ensures spacing between image, name, and counts
  },
  rank: {
    width: 30,  // Fixed width for rank
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 50,  // Fixed size for restaurant image
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  restaurantInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  restaurantName: {
    fontWeight: 'bold',
    flexWrap: 'wrap',  // Allow name to wrap if it's too long
  },
  meals: {
    fontSize: 12,
    color: 'gray',
  },
  mealsCount: {
    width: 70,  // Fixed width for meals count (enough space for a number)
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',  // Right-aligned for better readability
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    borderRadius: 8,
    marginTop: 15,
    backgroundColor: 'white',
    padding: 20,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginVertical: 5,
  },
  container: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff', // Change background color as needed
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  yourRestaurantBackground: {
    backgroundColor: "#f0f0f0", // Gray background for "Your Restaurant"
  },
});


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
      <ScrollView style={styles.screen}>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.burger}>
            <Text style={[styles.boldText, styles.smallFont]}>Leaderboard</Text>
          </View>
          <TouchableOpacity onPress={() => handleIconPress('Notification')}>
            <Icon name="bell" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
      <Text style={styles.title}>Leaderboard</Text>
      {leaderboardData.map((restaurant) => (
        <View key={restaurant.id}>
          <View style={styles.separator} />
          <View
            style={[
              styles.restaurantItem,
              restaurant.name === "Your Restaurant" && styles.yourRestaurantBackground,
            ]}
          >
            <Text style={styles.rank}>{restaurant.rank}</Text>
            <Image source={restaurant.image} style={styles.image} />
            
            <View style={styles.restaurantInfo}>
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
              <Text style={styles.meals}>{restaurant.meals} meals</Text>
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

export default Leaderboard;
