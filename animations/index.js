import { Animated } from 'react-native';

export const animateImage = (animation) => {
  Animated.loop(Animated.sequence([
    Animated.timing(animation, {
      toValue: 1.2,
      duration: 250,
      useNativeDriver: true,
    }),
    Animated.delay(50),
    Animated.timing(animation, {
      toValue: 1.0,
      duration: 250,
      useNativeDriver: true,
    }),
  ])).start();
};

export const animateUpgradeButton = (animation) => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1.0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.delay(50),
      Animated.timing(animation, {
        toValue: 0.0,
        duration: 250,
        useNativeDriver: true,
      }),
    ])).start();
}

export const animateLevelIndicator = (animation) => {
  Animated.sequence([
    Animated.timing(animation, {
      toValue: 1.3,
      duration: 100,
      useNativeDriver: true,
    }),
    Animated.delay(50),
    Animated.timing(animation, {
      toValue: 1.0,
      duration: 100,
      useNativeDriver: true,
    }),
  ]).start();
}

export const animateBgOpacity = (animation) => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1.0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.delay(50),
      Animated.timing(animation, {
        toValue: 0.0,
        duration: 250,
        useNativeDriver: true,
      }),
    ])).start();
}