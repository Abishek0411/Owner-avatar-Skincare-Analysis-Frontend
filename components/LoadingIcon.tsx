import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
import Animated, { Easing, useSharedValue, useAnimatedProps, withRepeat, withTiming } from 'react-native-reanimated';

const AnimatedPolyline = Animated.createAnimatedComponent(Polyline);

const LoadingIcon = () => {
  const dashOffset = useSharedValue(192);

  dashOffset.value = withRepeat(
    withTiming(0, {
      duration: 1400,
      easing: Easing.linear,
    }),
    -1,
    false
  );

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: dashOffset.value,
  }));

  return (
    <View style={styles.loadingContainer}>
      <Svg width="64" height="48">
        <Polyline
          points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
          fill="none"
          stroke="#ff4d5033"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <AnimatedPolyline
          points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
          fill="none"
          stroke="#ff4d4f"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="48, 144"
          animatedProps={animatedProps}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingIcon;