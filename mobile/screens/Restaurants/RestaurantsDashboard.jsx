import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Layout from './Layout';
import { useAuth } from '../../context/AuthContext';

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F9FAFB',
    padding: 20,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2A44',
  },
  restaurantName: {
    color: '#10B981',
    fontWeight: '800',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center',
    flexDirection: 'row',
  },
  cardFullWidth: {
    width: '100%',
  },
  cardIcon: {
    marginRight: 12,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2A44',
  },
  postContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2A44',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1F2A44',
    marginBottom: 16,
  },
  pickerContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    marginBottom: 16,
  },
  picker: {
    fontSize: 16,
    color: '#1F2A44',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  timeLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2A44',
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeInput: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
    width: 80,
    marginRight: 12,
    fontSize: 16,
    color: '#1F2A44',
  },
  button: {
    backgroundColor: '#10B981',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  quoteContainer: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
  },
});

const RestaurantsDashboard = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const RestaurantName = user?.fullName;

  const [items, setItems] = useState('');
  const [serveFor, setServeFor] = useState('');
  const [expireTime, setExpireTime] = useState({ days: '', hours: '' });

  const handlePostMeal = async () => {
    try {
      const orderData = {
        restaurant: {
          name: RestaurantName,
          location: user?.address,
          phoneNumber: user?.contactNumber,
        },
        meal: items,
        servings: serveFor,
        expiration: {
          days: expireTime.days,
          hours: expireTime.hours,
        },
      };

      const response = await fetch('http://10.11.49.240:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Meal posted successfully!');
        console.log('Order posted:', data);
      } else {
        alert('Failed to post meal: ' + data.error);
        console.error('Error:', data.error);
      }
    } catch (error) {
      alert('Error occurred while posting the meal.');
      console.error('Error:', error);
    }
  };

  const handleIconPress = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <Layout navigation={navigation}>
      <ScrollView style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>
            Welcome <Text style={styles.restaurantName}>{RestaurantName}</Text>
          </Text>
          <TouchableOpacity onPress={() => handleIconPress('RestaurnatsNotification')}>
            <Icon name="bell" size={24} color="#1F2A44" />
          </TouchableOpacity>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Icon name="truck" size={24} color="#10B981" style={styles.cardIcon} />
            <Text style={styles.cardText}>120</Text>
          </View>
          <View style={styles.card}>
            <FontAwesome5 name="utensils" size={24} color="#10B981" style={styles.cardIcon} />
            <Text style={styles.cardText}>1.5K</Text>
          </View>
          <View style={[styles.card, styles.cardFullWidth]}>
            <FontAwesome5 name="award" size={24} color="#10B981" style={styles.cardIcon} />
            <Text style={styles.cardText}>3</Text>
          </View>
        </View>

        <View style={styles.postContainer}>
          <Text style={styles.postTitle}>Post a Meal</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter the list of items"
            placeholderTextColor="#6B7280"
            onChangeText={setItems}
            value={items}
          />

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={serveFor}
              onValueChange={(itemValue) => setServeFor(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select number of people" value="" />
              {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
                <Picker.Item key={num} label={`${num} People`} value={num} />
              ))}
            </Picker>
          </View>

          <View style={styles.timeContainer}>
            <Text style={styles.timeLabel}>Expiration Time</Text>
            <View style={styles.timeInputContainer}>
              <TextInput
                style={styles.timeInput}
                keyboardType="numeric"
                placeholder="Days"
                placeholderTextColor="#6B7280"
                onChangeText={(value) => setExpireTime({ ...expireTime, days: value })}
                value={expireTime.days}
              />
              <TextInput
                style={styles.timeInput}
                keyboardType="numeric"
                placeholder="Hours"
                placeholderTextColor="#6B7280"
                onChangeText={(value) => setExpireTime({ ...expireTime, hours: value })}
                value={expireTime.hours}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={handlePostMeal}>
            <Text style={styles.buttonText}>Post Meal</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.quoteContainer}>
          <Text style={styles.quoteText}>
            "A meal shared is a life touched. Your generosity can bring hope and change someone's day."
          </Text>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default RestaurantsDashboard;