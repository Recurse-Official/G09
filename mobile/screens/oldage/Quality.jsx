import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
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

const Quality = () => {
  // State hooks
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Food Quality');
  const [comments, setComments] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  // Dropdown options
  const options = ['Food Quality', 'Quantity', 'Packaging', 'Other Issues'];

  // Function to toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle option selection from dropdown
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  // Request media library permissions
  const requestImagePermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
    }
  };

  // Launch image picker
  const launchImagePickerHandler = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      const imageUri = result.assets[0].uri;
      setSelectedImage(imageUri);
    }
  };

  // Submit feedback
  const handleSubmitFeedback = () => {
    console.log('Submitting feedback:', comments);
    setComments('');
  };

  // Request permissions when component mounts
  useEffect(() => {
    requestImagePermissions();
  }, []);

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
    

      {/* Title and Icon */}
      <View style={styles.header}>
        <Icon name="restaurant" size={24} color={COLORS.textPrimary} />
        <Text style={styles.title}>Food Quality Verification</Text>
      </View>
      <Text style={styles.description}>
        Your feedback helps us improve food redistribution services. Please take a moment to share your experience with the food delivery you received.
      </Text>

      {/* Delivery Confirmation Section */}
      <Text style={styles.sectionTitle}>Delivery Confirmation</Text>
      <View style={styles.container}>
        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.buttonText}>Confirm Delivery</Text>
        </TouchableOpacity>
       
      </View>

      {/* Feedback Form Section */}
      <Text style={styles.sectionTitle}>Feedback Form</Text>
      <View style={styles.container}>
        {/* Dropdown Menu for Issue Selection */}
        <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
          <Text style={styles.dropdownText}>{selectedOption}</Text>
          <Icon name="chevron-down" size={18} color={COLORS.textPrimary} />
        </TouchableOpacity>
        {isOpen && (
          <View style={styles.dropdownOptions}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.dropdownOption}
                onPress={() => handleOptionSelect(option)}
              >
                <Text style={styles.dropdownOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Additional Comments Section */}
      <View style={styles.container}>
        <Text style={styles.sectionSubtitle}>Additional Comments</Text>
        <TextInput
          style={styles.commentInput}
          placeholder="Enter your comments here"
          placeholderTextColor={COLORS.textSecondary}
          multiline={true}
          value={comments}
          onChangeText={setComments}
        />
        <TouchableOpacity style={styles.confirmButton} onPress={handleSubmitFeedback}>
          <Text style={styles.buttonText}>Submit Feedback</Text>
        </TouchableOpacity>
      </View>

      {/* Photo Upload Section */}
      <Text style={styles.sectionTitle}>Photo Upload</Text>
      <Text style={styles.description}>
        You can upload photos to help us visually verify the quality of the food you received. This is optional but highly appreciated.
      </Text>
      <View style={styles.upload}>
        <TouchableOpacity onPress={launchImagePickerHandler} style={styles.uploadButton}>
          {selectedImage ? (
            <View style={styles.uploadImageContainer}>
              <Image source={{ uri: selectedImage }} style={styles.uploadImage} />
            </View>
          ) : (
            <Text style={styles.uploadText}>Upload Image</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Real-Time Reporting Section */}
      <Text style={styles.sectionTitle}>Real-Time Reporting</Text>
      <Text style={styles.description}>
        If you encounter any issues with your food delivery, please report them immediately. An automated alert will be sent to the admin for resolution.
      </Text>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Image source={require('../../assets/92.png')} style={styles.cardImage} />
          <View>
            <Text style={styles.cardTitle}>Average Food Quality</Text>
            <Text style={styles.cardSubtitle}>3.9</Text>
          </View>
        </View>
      </View>
      <View style={[styles.card, { marginBottom: 100 }]}>
        <View style={styles.cardContent}>
          <Image source={require('../../assets/93.png')} style={styles.cardImage} />
          <View>
            <Text style={styles.cardTitle}>Most Common Issue</Text>
            <Text style={styles.cardSubtitle}>Quality, Packaging</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginLeft: 8,
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginTop: 16,
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  container: {
    marginBottom: 16,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
    marginBottom: 12,
  },
  reportButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    elevation: 4,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextSecondary: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  dropdownButton: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    elevation: 4,
  },
  dropdownText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    flex: 1,
  },
  dropdownOptions: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginTop: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
  },
  dropdownOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.textSecondary,
  },
  dropdownOptionText: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  commentInput: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    height: 100,
    textAlignVertical: 'top',
    fontSize: 16,
    color: COLORS.textPrimary,
    elevation: 4,
  },
  upload: {
    marginBottom: 20,
    alignItems: 'center',
  },
  uploadImageContainer: {
    width: 300,
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  uploadButton: {
    width: 300,
    height: 100,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    elevation: 4,
  },
  uploadText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardImage: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.textSecondary,
    marginTop: 4,
  },
});

export default Quality;