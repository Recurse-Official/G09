import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useTranslation } from 'react-i18next';
import { Language } from '../../components/language';

// Sample Data for Alerts and Impact Metrics
const emergencyAlerts = [
  { id: 1, urgency: 'High', reason: 'Fire', location: { latitude: 37.78825, longitude: -122.4324 }, status: 'Open' },
  { id: 2, urgency: 'Medium', reason: 'Flood', location: { latitude: 37.78945, longitude: -122.4354 }, status: 'Closed' },
  { id: 3, urgency: 'Low', reason: 'Accident', location: { latitude: 37.79125, longitude: -122.4384 }, status: 'Open' },
];

// Updated color palette to match FarmersDashboard, ForumsScreen, Layout, PurchaseDetails, FoodFridges, and OldAgeHomesDashboard
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

const EmergencyAlerts = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [alertStatus, setAlertStatus] = useState('In Progress');
  const [emergencyData, setEmergencyData] = useState({
    urgency: '',
    reason: '',
    location: '',
    contactInfo: '',
    additionalDetails: '',
  });

  // Impact Metrics (for demonstration purposes)
  const impactMetrics = {
    totalAlerts: 25,
    avgResponseTime: '2 hours',
    beneficiaries: 300,
    mealsDelivered: 1500,
  };

  const handleRespondToAlert = (alert) => {
    setSelectedAlert(alert);
    setShowModal(true);
  };

  const handleSubmitResponse = () => {
    console.log('Response submitted:', { alertId: selectedAlert.id, responseText, alertStatus });
    setShowModal(false);
    setResponseText('');
    setAlertStatus('In Progress');
  };

  const handleRaiseEmergency = () => {
    console.log('Emergency Raised:', emergencyData);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Language />

      {/* 1. Raise an Emergency Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('emergencyAlerts.raiseEmergency')}</Text>
        {[
          { placeholder: t('emergencyAlerts.urgencyLevel'), value: emergencyData.urgency, key: 'urgency' },
          { placeholder: t('emergencyAlerts.reason'), value: emergencyData.reason, key: 'reason' },
          { placeholder: t('emergencyAlerts.location'), value: emergencyData.location, key: 'location' },
          { placeholder: t('emergencyAlerts.contactInfo'), value: emergencyData.contactInfo, key: 'contactInfo' },
          { placeholder: t('emergencyAlerts.additionalDetails'), value: emergencyData.additionalDetails, key: 'additionalDetails', multiline: true },
        ].map((input, index) => (
          <TextInput
            key={index}
            style={[styles.input, input.multiline && styles.textArea]}
            placeholder={input.placeholder}
            placeholderTextColor={COLORS.textSecondary}
            value={input.value}
            onChangeText={(text) => setEmergencyData({ ...emergencyData, [input.key]: text })}
            multiline={input.multiline}
            numberOfLines={input.multiline ? 4 : 1}
          />
        ))}
        <TouchableOpacity style={styles.submitButton} onPress={handleRaiseEmergency}>
          <Text style={styles.submitButtonText}>{t('emergencyAlerts.submit')}</Text>
        </TouchableOpacity>
      </View>

      {/* 2. Track Your Alerts Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('emergencyAlerts.trackAlerts')}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardScroll}>
          {emergencyAlerts.map((alert) => (
            <View key={alert.id} style={styles.card}>
              <Text style={styles.cardText}>{`${t('emergencyAlerts.reason')}: ${alert.reason}`}</Text>
              <Text style={styles.cardText}>{`${t('emergencyAlerts.urgencyLevel')}: ${alert.urgency}`}</Text>
              <Text style={styles.cardText}>{`${t('emergencyAlerts.alertStatus')}: ${alert.status}`}</Text>
              <TouchableOpacity
                style={styles.responseButton}
                onPress={() => handleRespondToAlert(alert)}
              >
                <Text style={styles.responseButtonText}>{t('emergencyAlerts.respond')}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

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
            {emergencyAlerts.map((alert, index) => (
              <Marker
                key={index}
                coordinate={alert.location}
                title={alert.reason}
                description={`${t('emergencyAlerts.urgencyLevel')}: ${alert.urgency}`}
              />
            ))}
          </MapView>
        </View>
      </View>

      {/* 3. Impact Metrics Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('emergencyAlerts.impactMetrics')}</Text>
        <View style={styles.metricCard}>
          {[
            { label: t('emergencyAlerts.totalAlerts'), value: impactMetrics.totalAlerts },
            { label: t('emergencyAlerts.avgResponseTime'), value: impactMetrics.avgResponseTime },
            { label: t('emergencyAlerts.beneficiaries'), value: impactMetrics.beneficiaries },
            { label: t('emergencyAlerts.mealsDelivered'), value: impactMetrics.mealsDelivered },
          ].map((metric, index) => (
            <Text key={index} style={styles.metricText}>{`${metric.label}: ${metric.value}`}</Text>
          ))}
        </View>
      </View>

      {/* 4. Respond to Alert Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {selectedAlert && (
              <>
                <Text style={styles.modalTitle}>{t('emergencyAlerts.respond')}</Text>
                <Text style={styles.modalText}>{`${t('emergencyAlerts.reason')}: ${selectedAlert.reason}`}</Text>
                <Text style={styles.modalText}>{`${t('emergencyAlerts.urgencyLevel')}: ${selectedAlert.urgency}`}</Text>
                <Text style={styles.modalText}>{`${t('emergencyAlerts.alertStatus')}: ${selectedAlert.status}`}</Text>

                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder={t('emergencyAlerts.submitResponse')}
                  placeholderTextColor={COLORS.textSecondary}
                  value={responseText}
                  onChangeText={setResponseText}
                  multiline
                  numberOfLines={4}
                />

                <Text style={styles.modalText}>{t('emergencyAlerts.alertStatus')}:</Text>
                <View style={styles.pickerContainer}>
                  {[
                    { value: 'In Progress', label: t('emergencyAlerts.inProgress') },
                    { value: 'Resolved', label: t('emergencyAlerts.resolved') },
                  ].map((status) => (
                    <TouchableOpacity
                      key={status.value}
                      style={[styles.statusButton, alertStatus === status.value && styles.selectedStatusButton]}
                      onPress={() => setAlertStatus(status.value)}
                    >
                      <Text style={[styles.statusButtonText, alertStatus === status.value && styles.selectedStatusButtonText]}>
                        {status.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setShowModal(false)}
                  >
                    <Text style={styles.cancelButtonText}>{t('emergencyAlerts.cancel')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmitResponse}
                  >
                    <Text style={styles.submitButtonText}>{t('emergencyAlerts.submitResponse')}</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.background,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  card: {
    backgroundColor: COLORS.cardBg,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
    width: 250,
    elevation: 4,
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
  },
  cardText: {
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  responseButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: 8,
    alignItems: 'center',
    elevation: 4,
  },
  responseButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  cardScroll: {
    marginBottom: 16,
  },
  mapContainer: {
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
  },
  map: {
    flex: 1,
  },
  input: {
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: 12,
    elevation: 4,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  metricCard: {
    backgroundColor: COLORS.cardBg,
    padding: 16,
    borderRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
  },
  metricText: {
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.darkOverlay,
  },
  modalContainer: {
    width: '85%',
    backgroundColor: COLORS.cardBg,
    padding: 20,
    borderRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  modalText: {
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  statusButton: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    elevation: 4,
  },
  selectedStatusButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  statusButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  selectedStatusButtonText: {
    color: COLORS.white,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  cancelButton: {
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: COLORS.textSecondary,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EmergencyAlerts;