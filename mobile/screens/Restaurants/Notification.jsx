import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F4F7FA',
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  notificationContainer: {
    padding: 15,
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statusText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    elevation: 5,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
});

const Notification = () => {
  const navigation = useNavigation();

  const handleIconPress = (screenName) => {
    navigation.navigate(screenName);
  };

  const orderStatuses = [
    { status: 'Delivered', icon: 'check-circle', color: '#4CAF50' },
    { status: 'Delivered', icon: 'check-circle', color: '#4CAF50' },
    { status: 'Delivered', icon: 'check-circle', color: '#4CAF50' },
    { status: 'Pickup', icon: 'truck', color: '#2196F3' },
    { status: 'Complaint Raised', icon: 'exclamation-triangle', color: '#F44336' },
  ];

  const navItems = [
    { name: 'Home', icon: 'home', screen: 'Home' },
    { name: 'Dashboard', icon: 'th-large', screen: 'RestaurantsDashboard' },
    { name: 'Leaderboard', icon: 'award', screen: 'Leaderboard' },
    { name: 'Statistics', icon: 'chart-pie', screen: 'Statistics' },
  ];

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>
      </View>
      <ScrollView style={styles.notificationContainer}>
        {orderStatuses.map((status, index) => (
          <View key={index} style={styles.notificationCard}>
            <View style={[styles.statusIcon, { backgroundColor: status.color }]}>
              <FontAwesome5 name={status.icon} size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.statusText}>{status.status}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.bottomNav}>
        {navItems.map((item) => (
          <TouchableOpacity
            key={item.name}
            style={styles.navItem}
            onPress={() => handleIconPress(item.screen)}
          >
            <FontAwesome5 name={item.icon} size={24} color="#333333" />
            <Text style={styles.navText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Notification;