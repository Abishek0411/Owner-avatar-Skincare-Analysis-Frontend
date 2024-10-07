import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import LoadingIcon from './LoadingIcon';

const ImagePick = ({ navigation }: { navigation: any }): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);

  const sendImageToServer = async (path: any) => {
    setIsLoading(true); // Start loading indicator
    const formData = new FormData();
    console.log("Path to check whether image exists: ", path);
    formData.append('image', {
      uri: path,
      name: 'selfie.jpg',
      type: 'image/jpg',
    });

    try {
      console.log("Inside Try Block!")
      const response = await fetch('https://popular-scarcely-stallion.ngrok-free.app/image', {
        method: 'POST',
        body: formData,
        headers: {
          "ngrok-skip-browser-warning": "69420",
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Outside the response fetch!")

      const responseText = await response.text();

      try {
        const jsonResponse = JSON.parse(responseText);
        const result = jsonResponse.result;
        setIsLoading(false); // Stop loading indicator
        return result;
      } catch (e) {
        console.error("Response is not JSON:", responseText);
        setIsLoading(false); // Stop loading indicator on error
        Alert.alert('Error', 'Couldnt receive proper response. Sorry for the inconvinience');
      }

    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false); // Stop loading indicator on error
      Alert.alert('Error', 'Failed to send image to server. Sorry for the inconvinience');
    }
  };

  const navigateToScan = (imagePath: any, imageHeight: number, imageWidth: number, result: any) => {
    setIsLoading(false); // Stop loading indicator before navigation
    navigation.navigate('ScanPage', { message: imagePath, height: imageHeight, width: imageWidth, prediction: result })
  };

  const handleChoosePhoto = () => {
    ImagePicker.openPicker({
      cropping: true,
      freeStyleCropEnabled: true,
    }).then(async image => {
      console.log("The Height, Width and the Path of the Image is: ", image.height, image.width, image.path);
      setIsLoading(true); // Start loading indicator
      const result = await sendImageToServer(image.path);
      navigateToScan(image.path, image.height, image.width, result);
    }).catch(error => {
      console.log(error);
      setIsLoading(false); // Stop loading indicator on error
      Alert.alert('Error', 'No Image Chosen!');
    });
  };

  const handleTakePhoto = () => {
    ImagePicker.openCamera({
      cropping: true,
      freeStyleCropEnabled: true,
      useFrontCamera: true,
    }).then(async image => {
      setIsLoading(true); // Start loading indicator
      const result = await sendImageToServer(image.path);
      navigateToScan(image.path, image.height, image.width, result);
    }).catch(error => {
      console.log(error);
      setIsLoading(false); // Stop loading indicator on error
      Alert.alert('Error', 'Failed to open camera');
    });
  };

  // Update navigation options dynamically based on isLoading state
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      // Prevent default behavior if isLoading is true
      if (isLoading) {
        e.preventDefault();
      }
    });

    navigation.setOptions({
      headerBackVisible: !isLoading, // Show header only when isLoading is false
    });

    return unsubscribe;
  }, [navigation, isLoading]);

  return (
    <View style={styles.container}>
      {!isLoading && (
        <>
          <TouchableOpacity style={styles.button} onPress={handleChoosePhoto}>
            <Text style={styles.buttonText}>Upload Photo</Text>
          </TouchableOpacity>
          <View style={{ marginVertical: 10 }} />
          <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>
        </>
      )}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <LoadingIcon />
          <Text style={styles.loadingText}>Getting ready for Tagging...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 31,
    borderRadius: 24,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  loadingContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333333',
  },
});

export default ImagePick;