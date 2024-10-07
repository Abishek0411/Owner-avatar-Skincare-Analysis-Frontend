import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';

function EntrancePage({ navigation }:{ navigation: any}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Home'); // replace 'NextPage' with the actual route name of your next page
    }, 1000);

    return () => clearTimeout(timer); // Cleanup the timer if the component is unmounted
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
            source={require('../assets/skincare_logo.png')}
            style={styles.image}
            resizeMode="contain"
          />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centers vertically
    alignItems: 'center',     // Centers horizontally
  },
  image: {
    height: 300,
    width: 300,
  },
});

export default EntrancePage;