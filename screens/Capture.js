import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import TaskBar from '../components/TaskBar';
import { useNavigation } from '@react-navigation/native';

const Capture = () => {
  const [imageUri, setImageUri] = useState(null);
  const navigation = useNavigation();

  // Function to open the camera
  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === 'granted') {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } else {
      alert('Camera access is required to take photos.');
    }
  };

  const handleAnalysis = () => {
    if (imageUri) {
      navigation.navigate('Results', { imageUri });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.circle} onPress={openCamera}>
        <MaterialIcons name="photo-camera" size={80} color="#ffffff" />
      </TouchableOpacity>

      <Text style={styles.title}>Click camera Icon to capture Image😊</Text>

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={styles.capturedImage}
        />
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.uploadButton, !imageUri && styles.disabledButton]} 
          onPress={handleAnalysis}
          disabled={!imageUri}
        >
          <Text style={styles.buttonText}>Analyze Photo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.resultsButton} 
          onPress={() => navigation.navigate('Results')}
        >
          <Text style={styles.buttonText}>View Results</Text>
        </TouchableOpacity>
      </View>
      
      <TaskBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#f28482',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
  capturedImage: {
    width: 250,
    height: 250,
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  uploadButton: {
    backgroundColor: '#f28482',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  resultsButton: {
    backgroundColor: '#84a59d',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.5,
  }
});

export default Capture;