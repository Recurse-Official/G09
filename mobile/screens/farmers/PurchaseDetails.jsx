import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

const PurchaseDetails = ({ route, navigation }) => {
  const { purchaseType } = route.params;

  const [price, setPrice] = useState('');
  const [cropDetails, setCropDetails] = useState('');
  const [buyer, setBuyer] = useState('');

  const handleSave = () => {
    // Logic to save purchase details
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>
          {purchaseType === 'pending' ? 'Pending Purchase' : 'Completed Purchase'}
        </Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Price</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="cash-outline" size={20} color={COLORS.secondary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={setPrice}
              placeholder="Enter price"
              placeholderTextColor={COLORS.secondary}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Crop Details</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="leaf-outline" size={20} color={COLORS.secondary} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, styles.textArea]}
              value={cropDetails}
              onChangeText={setCropDetails}
              placeholder="Details of the crop"
              placeholderTextColor={COLORS.secondary}
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        {purchaseType === 'pending' && (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Sell To</Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity 
                style={[styles.optionButton, buyer === 'NGO' && styles.selectedOption]}
                onPress={() => setBuyer('NGO')}
              >
                <Ionicons 
                  name="people" 
                  size={24} 
                  color={buyer === 'NGO' ? COLORS.white : COLORS.primary} 
                />
                <Text style={[styles.optionText, buyer === 'NGO' && styles.selectedOptionText]}>
                  NGO
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.optionButton, buyer === 'Foodbank' && styles.selectedOption]}
                onPress={() => setBuyer('Foodbank')}
              >
                <Ionicons 
                  name="restaurant" 
                  size={24} 
                  color={buyer === 'Foodbank' ? COLORS.white : COLORS.primary} 
                />
                <Text style={[styles.optionText, buyer === 'Foodbank' && styles.selectedOptionText]}>
                  Foodbank
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {purchaseType === 'completed' && (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bought By</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="person" size={20} color={COLORS.secondary} style={styles.inputIcon} />
              <Text style={styles.input}>{buyer}</Text>
            </View>
          </View>
        )}

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Ionicons name="save" size={24} color={COLORS.white} style={styles.buttonIcon} />
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  formContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: COLORS.secondary,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.primary,
    padding: 12,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedOption: {
    backgroundColor: COLORS.primary,
  },
  optionText: {
    fontSize: 16,
    color: COLORS.primary,
    marginLeft: 10,
  },
  selectedOptionText: {
    color: COLORS.white,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonIcon: {
    marginRight: 10,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PurchaseDetails;
