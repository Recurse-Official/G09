import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import EmergencyAlerts from './EmergencyAlerts';
import Quality from './Quality';

const { width } = Dimensions.get('window');

// Updated color palette to match FarmersDashboard, ForumsScreen, Layout, PurchaseDetails, FoodFridges, and EmergencyAlerts
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

const OldAgeHomesDashboard = () => {
  const [currentPage, setCurrentPage] = useState('main');
  const [priorityLevel, setPriorityLevel] = useState('High');
  const [feedback, setFeedback] = useState('');
  const [mealRequests, setMealRequests] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchMealRequests();
  }, [currentPage]);

  const fetchMealRequests = async () => {
    try {
      const response = await fetch('http://10.11.49.240:3000/api/orders');
      const data = await response.json();
      const data1 = data.orders.filter(each => each.status === 'Pending');
      setMealRequests(data1);
    } catch (error) {
      console.error('Error fetching meal requests:', error);
    }
  };

  const handleCheckout = async (orderId) => {
    try {
      const response = await fetch(`http://10.11.49.240:3000/api/orders/${orderId}/organization`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user.fullName,
          location: user.address,
          phoneNumber: user.contactNumber,
        }),
      });

      if (response.status === 200) {
        alert('Order checked out successfully!');
        setMealRequests(mealRequests.filter(order => order._id !== orderId));
      }
    } catch (error) {
      console.error('Error checking out meal:', error);
      alert('Failed to check out the meal request. Please try again.');
    }
  };

  const renderMainDashboard = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Ionicons name="home-outline" size={24} color={COLORS.textPrimary} />
        <Text style={styles.headerTitle}>Old Age Homes</Text>
      </View>

      <View style={styles.statsContainer}>
        {[
          { value: '120', label: 'Meals' },
          { value: '1.5K', label: 'Total' },
          { value: '5', label: 'Requests' },
        ].map((stat, index) => (
          <View key={index} style={styles.statBox}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.quickAccessContainer}>
        {[
          { page: 'mealRequests', icon: 'restaurant-outline', text: 'Meal Requests' },
          { page: 'trackVolunteer', icon: 'location-outline', text: 'Track Volunteer' },
          { page: 'emergencyAlerts', icon: 'alert-circle-outline', text: 'Emergency Alerts' },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.quickAccessItem}
            onPress={() => setCurrentPage(item.page)}
          >
            <Ionicons name={item.icon} size={24} color={COLORS.textPrimary} />
            <Text style={styles.quickAccessText}>{item.text}</Text>
            <View style={styles.viewButton}>
              <Text style={styles.viewButtonText}>View</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reports</Text>
        <View style={styles.reportsContainer}>
          {[
            { icon: require('../../assets/1.png'), title: 'Monthly Meals', subtitle: 'Meals received this month' },
            { icon: require('../../assets/4.png'), title: 'Yearly Meals', subtitle: 'Total meals received this year' },
          ].map((report, index) => (
            <TouchableOpacity key={index} style={styles.reportItem}>
              <Image source={report.icon} style={styles.reportIcon} />
              <Text style={styles.reportTitle}>{report.title}</Text>
              <Text style={styles.reportSubtitle}>{report.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.feedbackSection}>
        <Text style={styles.sectionTitle}>Feedback</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={4}
          value={feedback}
          onChangeText={setFeedback}
          placeholder="The meal was excellent and timely."
          placeholderTextColor={COLORS.textSecondary}
        />
        <TouchableOpacity style={styles.submitFeedbackButton}>
          <Text style={styles.submitFeedbackButtonText}>Submit Feedback</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderMealRequests = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.pageTitle}>Meal Requests</Text>
      {mealRequests.length > 0 ? (
        mealRequests.map((order) => (
          <View key={order._id} style={styles.mealRequestItem}>
            <Image source={require('../../assets/100.png')} style={styles.restaurantLogo} />
            <View style={styles.mealRequestInfo}>
              <Text style={styles.restaurantName}>{order.restaurant.name}</Text>
              <Text style={styles.mealDetails}>
                {order.mealType}, {order.servings} servings, expiring in {order.expirationDays} days, {order.expirationHours} hours
              </Text>
              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() => handleCheckout(order._id)}
              >
                <Text style={styles.checkoutButtonText}>Check Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noDataText}>No meal requests available at the moment.</Text>
      )}
    </ScrollView>
  );

  const renderTrackVolunteer = () => (
    <ScrollView style={styles.pageContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.pageTitle}>Track Volunteer</Text>
      <Image source={require('../../assets/76.png')} style={styles.mapImage} />
      <View style={styles.volunteerInfo}>
        <Text style={styles.volunteerName}>John Doe</Text>
        <Text style={styles.volunteerStatus}>5 minutes away</Text>
      </View>
      <TouchableOpacity style={styles.callButton}>
        <Text style={styles.callButtonText}>Call John Doe</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderEmergencyAlerts = () => (
    <ScrollView style={styles.pageContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.pageTitle}>Emergency Alerts</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Urgent Needs</Text>
        <TextInput
          style={styles.input}
          value="Meals for 30 people"
          editable={false}
          placeholderTextColor={COLORS.textSecondary}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Contact Details</Text>
        <TextInput
          style={styles.input}
          value="Pre-filled info"
          editable={false}
          placeholderTextColor={COLORS.textSecondary}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Priority Level</Text>
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>{priorityLevel}</Text>
          <Ionicons name="chevron-down" size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.raiseAlertButton}>
        <Text style={styles.raiseAlertButtonText}>Raise Alert</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      {currentPage === 'main' && renderMainDashboard()}
      {currentPage === 'mealRequests' && renderMealRequests()}
      {currentPage === 'trackVolunteer' && <Quality />}
      {currentPage === 'emergencyAlerts' && <EmergencyAlerts />}

      <View style={styles.tabBar}>
        {[
          { page: 'main', icon: 'home-outline' },
          { page: 'mealRequests', icon: 'restaurant-outline' },
          { page: 'trackVolunteer', icon: 'checkmark-circle-outline' },
          { page: 'emergencyAlerts', icon: 'alert-circle-outline' },
        ].map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tabItem}
            onPress={() => setCurrentPage(tab.page)}
          >
            <Ionicons
              name={tab.icon}
              size={24}
              color={currentPage === tab.page ? COLORS.primary : COLORS.textSecondary}
            />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginLeft: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: COLORS.cardBg,
    marginBottom: 16,
    elevation: 4,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  quickAccessContainer: {
    backgroundColor: COLORS.cardBg,
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 4,
  },
  quickAccessItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    padding: 8,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    elevation: 2,
  },
  quickAccessText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    flex: 1,
    marginLeft: 12,
    fontWeight: '500',
  },
  viewButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    elevation: 2,
  },
  viewButtonText: {
    fontSize: 14,
    color: COLORS.white,
    fontWeight: '600',
  },
  section: {
    backgroundColor: COLORS.cardBg,
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  reportsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  reportItem: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 12,
    elevation: 2,
  },
  reportIcon: {
    width: 60,
    height: 60,
    marginBottom: 8,
    borderRadius: 12,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  reportSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  feedbackSection: {
    backgroundColor: COLORS.cardBg,
    padding: 16,
    borderRadius: 12,
    elevation: 4,
    marginBottom: 24,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: 12,
    elevation: 2,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitFeedbackButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
  },
  submitFeedbackButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  pageContainer: {
    padding: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 16,
    textAlign: 'center',
  },
  mealRequestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    elevation: 4,
  },
  restaurantLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  mealRequestInfo: {
    marginLeft: 12,
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  mealDetails: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 8,
    elevation: 4,
  },
  checkoutButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  noDataText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 16,
  },
  mapImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 4,
  },
  volunteerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    padding: 12,
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    elevation: 4,
  },
  volunteerName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  volunteerStatus: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  callButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
  },
  callButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.textSecondary,
    elevation: 4,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    flex: 1,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  dropdown: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  dropdownText: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  raiseAlertButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
  },
  raiseAlertButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OldAgeHomesDashboard;