import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { BarChart, XAxis, YAxis } from 'react-native-svg-charts';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

// Sample data for daily tracking of relief operations
const dailyReliefData = [
  { date: '11/20', location: 'Location A', operations: 10 },
  { date: '11/21', location: 'Location A', operations: 15 },
  { date: '11/22', location: 'Location A', operations: 8 },
  { date: '11/20', location: 'Location B', operations: 5 },
  { date: '11/21', location: 'Location B', operations: 12 },
  { date: '11/22', location: 'Location B', operations: 7 },
];

// Sample disaster relief guidelines, emergency contacts, and technical support
const guidelines = [
  'Ensure the safety of yourself and others.',
  'Follow evacuation routes provided by local authorities.',
  'Stay informed through official disaster relief channels.',
  'Follow instructions from relief teams on-site.',
];

const emergencyContacts = [
  { label: 'Emergency Contact 1', number: '+123-456-7890' },
  { label: 'Emergency Contact 2', number: '+098-765-4321' },
];

const technicalSupport = [
  { label: 'Support Team 1', contact: 'support1@relief.org' },
  { label: 'Support Team 2', contact: 'support2@relief.org' },
];

const DisasterRelief = () => {
  const [showGuidelinesModal, setShowGuidelinesModal] = useState(false);

  // Sample map markers showing locations of ongoing relief operations
  const ongoingOperations = [
    { id: 1, latitude: 37.78825, longitude: -122.4324, title: 'Location A' },
    { id: 2, latitude: 37.79025, longitude: -122.4354, title: 'Location B' },
  ];

  const openUrgentRequest = () => {
    console.log('Opening urgent request form...');
  };

  // Data for the bar chart
  const barData = dailyReliefData.map((item) => item.operations);

  return (
    <ScrollView style={styles.container}>
      {/* Description at the Top */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Disaster Relief Efforts</Text>
        <Text style={styles.descriptionText}>
          Track real-time relief operations, view impact metrics, and access critical resources to support affected communities.
        </Text>
      </View>

      {/* Send Urgent Request Button */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.urgentButton} onPress={openUrgentRequest}>
          <Icon name="exclamation-circle" size={20} color="#FFFFFF" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Send Urgent Request</Text>
        </TouchableOpacity>
      </View>

      {/* Live Updates Map */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Live Operations Map</Text>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {ongoingOperations.map((operation) => (
              <Marker
                key={operation.id}
                coordinate={{
                  latitude: operation.latitude,
                  longitude: operation.longitude,
                }}
                title={operation.title}
                pinColor="#10B981"
              />
            ))}
          </MapView>
        </View>
      </View>

      {/* Impact Summary with Histogram */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Impact Summary</Text>
        <View style={styles.barChartContainer}>
          <View style={{ flexDirection: 'row', height: 220 }}>
            <YAxis
              data={barData}
              contentInset={{ top: 20, bottom: 20 }}
              svg={{ fontSize: 12, fill: '#6B7280' }}
              numberOfTicks={5}
              formatLabel={(value) => `${value}`}
            />
            <BarChart
              style={{ flex: 1, marginLeft: 8 }}
              data={barData}
              svg={{ fill: '#10B981' }}
              contentInset={{ top: 20, bottom: 20 }}
              spacingInner={0.4}
              spacingOuter={0.2}
              animate={true}
            />
          </View>
          <XAxis
            style={{ marginTop: 8 }}
            data={barData}
            formatLabel={(value, index) => dailyReliefData[index].date}
            contentInset={{ left: 20, right: 20 }}
            svg={{ fontSize: 12, fill: '#6B7280' }}
          />
          {barData.map((value, index) => (
            <Text
              key={index}
              style={[
                styles.barLabel,
                { left: 40 + index * (width / (barData.length + 1)), top: 200 - (value / Math.max(...barData)) * 180 },
              ]}
            >
              {value}
            </Text>
          ))}
        </View>
      </View>

      {/* Disaster Relief Guidelines */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Relief Guidelines</Text>
        <TouchableOpacity style={styles.viewButton} onPress={() => setShowGuidelinesModal(true)}>
          <Text style={styles.viewButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>

      {/* Emergency Contacts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Contacts</Text>
        {emergencyContacts.map((contact, index) => (
          <View key={index} style={styles.contactItem}>
            <Text style={styles.contactLabel}>{contact.label}:</Text>
            <Text style={styles.contactNumber}>{contact.number}</Text>
          </View>
        ))}
      </View>

      {/* Technical Support */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Technical Support</Text>
        {technicalSupport.map((support, index) => (
          <View key={index} style={styles.contactItem}>
            <Text style={styles.contactLabel}>{support.label}:</Text>
            <Text style={styles.contactNumber}>{support.contact}</Text>
          </View>
        ))}
      </View>

      {/* Guidelines Modal */}
      <Modal visible={showGuidelinesModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Disaster Relief Guidelines</Text>
            <ScrollView style={styles.modalContent}>
              {guidelines.map((item, index) => (
                <Text key={index} style={styles.modalText}>• {item}</Text>
              ))}
              <Text style={styles.modalSubTitle}>Emergency Contacts</Text>
              {emergencyContacts.map((contact, index) => (
                <Text key={index} style={styles.modalText}>• {contact.label}: {contact.number}</Text>
              ))}
              <Text style={styles.modalSubTitle}>Technical Support</Text>
              {technicalSupport.map((support, index) => (
                <Text key={index} style={styles.modalText}>• {support.label}: {support.contact}</Text>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setShowGuidelinesModal(false)} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 20,
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  descriptionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2A44',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2A44',
    marginBottom: 12,
  },
  urgentButton: {
    flexDirection: 'row',
    backgroundColor: '#EF4444',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonIcon: {
    marginRight: 8,
  },
  mapContainer: {
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  map: {
    flex: 1,
  },
  barChartContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  barLabel: {
    position: 'absolute',
    fontSize: 12,
    color: '#1F2A44',
    fontWeight: '600',
    textAlign: 'center',
    width: 40,
  },
  viewButton: {
    backgroundColor: '#10B981',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  contactItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  contactLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2A44',
  },
  contactNumber: {
    fontSize: 16,
    color: '#6B7280',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2A44',
    marginBottom: 16,
  },
  modalSubTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2A44',
    marginTop: 16,
    marginBottom: 8,
  },
  modalContent: {
    maxHeight: 400,
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 24,
  },
  modalCloseButton: {
    backgroundColor: '#10B981',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default DisasterRelief;