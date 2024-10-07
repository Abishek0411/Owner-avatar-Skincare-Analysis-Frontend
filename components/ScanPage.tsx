import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Linking } from 'react-native';

const { width, height } = Dimensions.get('window');

const products = [
  { name: "Neutrogena Acne Face Wash", link: "https://www.amazon.in/dp/B000Q6UZBM" },
  { name: "La Roche-Posay Dark Spot Corrector", link: "https://www.flipkart.com/la-roche-posay-dark-spot-corrector" },
  { name: "Olay Anti-Wrinkle Cream", link: "https://www.flipkart.com/olay-anti-wrinkle" },
  { name: "Biore Charcoal Blackhead Remover", link: "https://www.amazon.in/dp/B01D14KOM8" },
  { name: "Cetaphil Gentle Skin Cleanser", link: "https://www.amazon.in/dp/B01E6XYY7E" },
  { name: "Garnier Bright Complete Vitamin C Serum", link: "https://www.flipkart.com/garnier-vitamin-c-serum" },
  { name: "Himalaya Purifying Neem Face Wash", link: "https://www.amazon.in/dp/B00FVUPBSI" },
  { name: "The Ordinary Niacinamide 10% + Zinc 1%", link: "https://www.flipkart.com/ordinary-niacinamide-zinc-serum" },
  { name: "Mamaearth Bye Bye Blemishes Face Cream", link: "https://www.amazon.in/dp/B076WZ5X9R" },
  { name: "Plum Green Tea Clear Face Mask", link: "https://www.flipkart.com/plum-green-tea-clear-face-mask" },
  { name: "Lotus Herbals Safe Sun UV Screen Matte Gel", link: "https://www.amazon.in/dp/B003XLEP9E" },
  { name: "L'Oréal Paris Revitalift Anti-Wrinkle Serum", link: "https://www.flipkart.com/loreal-paris-revitalift-serum" },
  { name: "WOW Skin Science Aloe Vera Gel", link: "https://www.amazon.in/dp/B078PDST8T" },
  { name: "Kaya Clinic Acne-Free Purifying Cleanser", link: "https://www.flipkart.com/kaya-clinic-acne-free-cleanser" },
];

const getRandomProducts = () => {
  let randomProducts = [];
  const shuffled = products.sort(() => 0.5 - Math.random());
  randomProducts = shuffled.slice(0, 3);
  return randomProducts;
};

// Random value generation
const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generate cascading values for the 4 keys
const generateCascadingValues = () => {
  const keys = ['acnes', 'darkspots', 'wrinkles', 'blackheads'];
  const values = [0, 0, 0, 0];

  // Choose a random key to have the highest value (8-10)
  const highestIndex = getRandomValue(0, 3);
  values[highestIndex] = getRandomValue(8, 10);

  // Assign decreasing values to the other keys
  let decreasingValue = getRandomValue(5, 7);
  for (let i = 0; i < keys.length; i++) {
    if (i !== highestIndex) {
      values[i] = decreasingValue;
      decreasingValue = getRandomValue(1, decreasingValue - 1); // Ensure it decreases further
    }
  }

  return {
    [keys[0]]: values[0],
    [keys[1]]: values[1],
    [keys[2]]: values[2],
    [keys[3]]: values[3],
  };
};

// Determine color based on severity
const getColorForValue = (value) => {
  if (value <= 3) return '#85FC91'; // Green for low severity
  if (value <= 6) return '#FFD700'; // Yellow for medium severity
  return '#FF4545'; // Red for high severity
};

const ScanPage = ({ navigation, route }) => {
  const { message } = route.params;
  const randomProducts = getRandomProducts();

  const handleLinkPress = (link) => {
    Linking.openURL(link).catch(err => console.error('An error occurred', err));
  };

  // State for randomized prediction values
  const [predictions, setPredictions] = useState({
    acnes: 0,
    darkspots: 0,
    wrinkles: 0,
    blackheads: 0,
  });

  // Generate random values for the keys on component mount
  useEffect(() => {
    const result = generateCascadingValues();
    setPredictions(result);
  }, []);

  const handleViewMap = () => {
    const link = 'https://www.google.com/maps/search/dermatologists';
    Linking.openURL(link).catch(err => console.error('An error occurred', err));
  };

  const renderProgressBar = (label, value) => {
    return (
      <View style={styles.progressContainer}>
        <Text style={styles.progressLabel}>{label}: {value}</Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${(value / 10) * 100}%`, backgroundColor: getColorForValue(value) },
            ]}
          />
        </View>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <View style={styles.reportContainer}>
          <Text style={styles.reportText}>REPORT: </Text>
        </View>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={handleViewMap}>
            <Image
              source={{ uri: message }}
              style={{ width: width / 1.9, height: height / 1.9, borderRadius: 10, aspectRatio: 1 }}
              resizeMode="center"
            />
          </TouchableOpacity>
        </View>

        {/* Diagnosis Container */}
        <View style={styles.diagnosisContainer}>
          <Text style={styles.diagnosisText}>Diagnosis</Text>

          {/* Render progress bars */}
          {renderProgressBar('Acnes', predictions.acnes)}
          {renderProgressBar('Dark Spots', predictions.darkspots)}
          {renderProgressBar('Wrinkles', predictions.wrinkles)}
          {renderProgressBar('Blackheads', predictions.blackheads)}
        </View>

        {/* Recommendation Container */}
        <View style={styles.recommendationContainer}>
          <Text style={styles.recommendationTitle}>Recommended Products:</Text>
          {randomProducts.map((product, index) => (
            <TouchableOpacity key={index} onPress={() => handleLinkPress(product.link)}>
              <Text style={styles.productLink}>{product.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Maps Container */}
        <View style={styles.mapBoxContainer}>
          <Text style={styles.consultText}>If you want to consult a dermatologist for further details</Text>
          <Text style={styles.nearbyText}>Nearby Dermatologists</Text>

          <TouchableOpacity style={styles.mapContainer} onPress={handleViewMap}>
            <Image
              style={{
                resizeMode: 'contain',
                height: 200,
              }}
              source={require('../assets/gmaps_logo.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.emptyContainer}></View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    backgroundColor: '#D9D9D9',
  },
  reportContainer: {
    width: "100%",
    marginBottom: 10,
    marginTop: 30,
  },
  reportText: {
    fontWeight: "bold",
    left: 30,
    fontFamily: "inter",
    fontSize: 18,
    color: "black",
  },
  imageContainer: {
    alignSelf: 'center',
    height: 400,
    width: '96%',
    overflow: 'hidden',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 20,
    alignContent: 'center',
    backgroundColor: 'white',
    elevation: 10,
  },
  diagnosisContainer: {
    backgroundColor: "white",
    width: "96%",
    height: 340,
    borderRadius: 17,
    flexDirection: "column",
    elevation: 10,
    alignSelf: "center",
    paddingLeft: 15,
  },
  diagnosisText: {
    fontWeight: 'bold',
    fontFamily: 'inter',
    fontSize: 24,
    marginTop: 20,
    marginLeft: 20,
    color: 'black',
  },
  progressContainer: {
    marginVertical: 10,
  },
  progressLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
  },
  progressBar: {
    width: '90%',
    height: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 10,
  },
  recommendationContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 5,
    elevation: 10,
    alignSelf: 'center',
    width: "96%",
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
  productLink: {
    fontSize: 16,
    color: "blue",
    marginBottom: 5,
  },  
  mapBoxContainer: {
    backgroundColor: "white",
    marginTop: 30,
    width: "96%",
    height: 290,
    borderRadius: 17,
    elevation: 10,
    alignSelf: "center",
  },
  consultText: {
    fontFamily: "inter",
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    width: "93%",
    alignSelf: "center",
    marginTop: 20,
  },
  nearbyText: {
    width: "90%",
    fontFamily: "inter",
    fontSize: 20,
    fontWeight: "bold", 
    color: "black",
    alignSelf: "center",
    marginTop: 20,
  },
  mapContainer: {
    backgroundColor: "#E5E4E2",
    width: 250,
    height: 120,
    borderRadius: 17,
    marginLeft: 20,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewMapText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyContainer: {
    height: 20,
  }
});

export default ScanPage;
