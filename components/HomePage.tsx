import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const HomePage = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <Image
            source={require('../assets/skincare_logo.png')}
            style={{height: 400, width: 400, marginBottom: 25}}
          />
      <View style={styles.emptyState}>
        <Text style={styles.subText}>Please Upload or Take Photo of your Face</Text>
      </View>
      <TouchableOpacity style={styles.scanButton} onPress={() => navigation.navigate('Camera')}>
        <Text style={styles.scanButtonText}>+ SCAN</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Ariel',
    fontSize: 35,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
    bottom: 130,
  },
  emptyState: {
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyText: {
    fontSize: 18,
    color: '#808080',
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    color: '#A0A0A0',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  scanButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    height: 55,
    width: 120,
  },
  scanButtonText: {
    color: '#ffffff',
    fontSize: 12,
  },
  recentButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  recentButtonText: {
    color: '#007AFF',
    fontSize: 10,
  },
});

export default HomePage;