"use client";
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MapView, { Marker } from 'react-native-maps';
import { useTranslation } from "react-i18next";

// Sample data for fridges
const fridgeLocations = [
  { id: 1, name: 'Fridge 1', latitude: 37.78825, longitude: -122.4324 },
  { id: 2, name: 'Fridge 2', latitude: 37.78845, longitude: -122.4344 },
  { id: 3, name: 'Fridge 3', latitude: 37.78925, longitude: -122.4354 },
];

// Updated color palette to match FarmersDashboard, ForumsScreen, Layout, and PurchaseDetails
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

const FoodFridges = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [serveFor, setServeFor] = useState('');
  const [expireTime, setExpireTime] = useState('');

  // Stats data for the top cards
  const stats = [
    { label: t('foodFridges.stats.totalFridges'), value: '50' },
    { label: t('foodFridges.stats.mealsDonated'), value: '1,200' },
    { label: t('foodFridges.stats.fridgesNearYou'), value: '10' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>{t('foodFridges.header')}</Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsCard}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statBox}>
            <Text style={styles.cardText}>{stat.value}</Text>
            <Text style={styles.cardLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Find a Fridge Section */}
      <Text style={styles.sectionTitle}>{t('foodFridges.findFridgeSection.title')}</Text>

      {/* Map Section with react-native-maps */}
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
          {fridgeLocations.map((fridge) => (
            <Marker
              key={fridge.id}
              coordinate={{ latitude: fridge.latitude, longitude: fridge.longitude }}
              title={fridge.name}
              description={t('foodFridges.map.fridgeDescription', { fridge: fridge.name })}
            />
          ))}
        </MapView>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={t('foodFridges.findFridgeSection.searchPlaceholder')}
          placeholderTextColor={COLORS.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Donate Food Section */}
      <Text style={styles.sectionTitle}>{t('foodFridges.donateFoodSection.title')}</Text>
      <View style={styles.donateSection}>
        <TextInput
          style={styles.searchInput}
          placeholder={t('foodFridges.donateFoodSection.mealDetailsPlaceholder')}
          placeholderTextColor={COLORS.textSecondary}
        />

        {/* Serve For Picker */}
        <Text style={styles.pickerLabel}>{t('foodFridges.donateFoodSection.serveForLabel')}</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={serveFor}
            style={styles.picker}
            onValueChange={(itemValue) => setServeFor(itemValue)}
          >
            <Picker.Item label={t('foodFridges.donateFoodSection.serveForOptions.select')} value="" />
            <Picker.Item label={t('foodFridges.donateFoodSection.serveForOptions.1')} value="1" />
            <Picker.Item label={t('foodFridges.donateFoodSection.serveForOptions.2')} value="2" />
            <Picker.Item label={t('foodFridges.donateFoodSection.serveForOptions.3')} value="3" />
          </Picker>
        </View>

        {/* Expire Time */}
        <Text style={styles.pickerLabel}>{t('foodFridges.donateFoodSection.expireTimeLabel')}</Text>
        <View style={styles.expireTimeContainer}>
          {[
            { value: 'days', label: t('foodFridges.donateFoodSection.expireTimeOptions.days') },
            { value: 'hrs', label: t('foodFridges.donateFoodSection.expireTimeOptions.hours') },
          ].map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[styles.expireButton, expireTime === option.value && styles.selectedExpireButton]}
              onPress={() => setExpireTime(option.value)}
            >
              <Text style={[styles.expireButtonText, expireTime === option.value && styles.selectedExpireButtonText]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Donate Button */}
        <TouchableOpacity style={styles.donateButton}>
          <Text style={styles.donateButtonText}>{t('foodFridges.donateFoodSection.donateButton')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.background,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 4,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  cardLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginTop: 16,
    marginBottom: 12,
  },
  mapContainer: {
    height: 300,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    elevation: 4,
  },
  donateSection: {
    padding: 16,
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    marginBottom: 24,
    elevation: 4,
  },
  pickerLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginTop: 12,
    marginBottom: 8,
  },
  pickerContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    overflow: 'hidden',
    elevation: 4,
  },
  picker: {
    height: 50,
    color: COLORS.textPrimary,
  },
  expireTimeContainer: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'space-between',
    gap: 12,
  },
  expireButton: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    elevation: 4,
  },
  selectedExpireButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  expireButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  selectedExpireButtonText: {
    color: COLORS.white,
  },
  donateButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    alignItems: 'center',
    elevation: 4,
  },
  donateButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FoodFridges;